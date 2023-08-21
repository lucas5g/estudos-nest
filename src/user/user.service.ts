import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDto } from "./dto/update-user.dt";

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateUserDto) {
    data.birthAt ? data.birthAt = new Date(data.birthAt) : null
    return this.prisma.user.create({
      data
    })
  }

  async list() {
    return this.prisma.user.findMany()
  }

  async show(id: number) {
    return this.prisma.user.findUnique({
      where: { id }
    })
  }

  async update(id: number, data: UpdateUserDto) {

    await this.exist(id)

    data.birthAt ? data.birthAt = new Date(data.birthAt) : null

    return this.prisma.user.update({
      data,
      where: { id }
    })
  }

  async delete(id: number) {

    await this.exist(id)
    return this.prisma.user.delete
       
  }

  async exist(id: number, table = 'user') {
    const exist = await this.prisma[table].count({
      where: {
        id
      }
    })
    if (!exist) {
      throw new NotFoundException(`O usuário ${id} não existe`)
    }
  }
}