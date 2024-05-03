/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: "User",
      schema: UserSchema
    }]),JwtModule.register({ secret: 'aziz' })
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
