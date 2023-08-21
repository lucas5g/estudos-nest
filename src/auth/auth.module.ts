import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";

@Module({
  imports: [JwtModule.register({
    secret: 'd24a0ee084fdab5c0f835aacfcd75852'
  }),
    forwardRef(() => UserModule),
    PrismaModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService]
})

export class AuthModule { }