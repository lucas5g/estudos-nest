import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/modules/user/user.service";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import * as bcrypt from 'bcrypt'
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class AuthService {

  private issuer = 'login'
  private audience = 'users'

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly mailer: MailerService
  ) { }

  createToken(user: User) {
    const accessToken = this.jwtService.sign({
      id: user.id,
      name: user.name,
      email: user.email
    }, {
      expiresIn: '7 days',
      subject: String(user.id),
      issuer: this.issuer,
      audience: this.audience
    })

    return { accessToken }
  }

  checkToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        audience: 'users',
        issuer: 'login'
      })
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async isValidToken(token: string) {
    try {
      this.checkToken(token)
      return true
    } catch (error) {
      return false
    }
  }

  async login(email: string, password: string) {

    const user = await this.prisma.user.findFirst({
      where: {
        email,
      }
    })

    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException('Email ou senha incorretos.')
    }

    return this.createToken(user)
  }

  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email
      }
    })

    if (!user) {
      throw new UnauthorizedException('E-mail está incorretor.')
    }

    const token = this.jwtService.sign({
      id: user.id
    }, {
      expiresIn: "10 minutes",
      subject: String(user.id),
      issuer: 'forget',
      audience: 'users'
    })

    await this.mailer.sendMail({
      subject: 'Recuperação de senha',
      to: 'joao@mail.com',
      template: 'forget',
      context:{
        name: user.name,
        token
      }
    })

    return true
  }

  async reset(password: string, token: string) {
    
    try{
      const data = this.jwtService.verify(token, {
        issuer: 'forget',
        audience: 'users'
      })


      console.log(data)
      const user = await this.prisma.user.update({
        where: { 
          id: data.id 
        },
        data: {
          password: await bcrypt.hash(password, 12)
        }
      })

      return this.createToken(user)
      
    }catch(error){
      throw new BadRequestException(error)
    }
    



  }

  async register(data: AuthRegisterDto) {
    const user = await this.userService.create(data)
    return this.createToken(user)

  }
}