/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Post("/google")
  createG(@Body() updateUserDto:UpdateUserDto) {
    return this.userService.createG(updateUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  @Get('connexion/:email/:mdp')
  connexion(@Param('email') email: string, @Param('mdp') mdp: string) {
    return this.userService.connexion(email, mdp);
  }
  @Get('decode/:token')
  decode(@Param('token') token: string) {
    return this.userService.verifyToken(token);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
  @Patch('changeState/:id')
  changeState(@Param('id') id: string) {
    return this.userService.changeState(id);
  }
  @Post('sendCode/:email')
  sendCode(@Param('email') email: string) {
    return this.userService.sendCode(email);
  }
  @Patch('modifyE/:email')
  updateE(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.findByemailModify(email, updateUserDto);
  }
  @Post('signToken')
  signToken(@Body() updateUserDto:UpdateUserDto) {
    return this.userService.signToken(updateUserDto);
  }
}
