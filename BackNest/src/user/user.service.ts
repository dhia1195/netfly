/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
// import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class UserService {
  private transporter: nodemailer.Transporter;
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: NestJwtService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'aziz1.jellazi@gmail.com',
        pass: 'rrmg bcvp nfbi xiln',
      },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return createdUser.save();
  }
  async createG(updateUserDto: UpdateUserDto): Promise<User> {

    const createdUser = new this.userModel(updateUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      return this.userModel.findByIdAndUpdate(id, {
        ...updateUserDto,
        password: hashedPassword,
      });
    }
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
  async connexion(email: string, mdp: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (user) {
      const comp = await bcrypt.compare(mdp, user.password);
      if (comp) {
        return { message: this.jwtService.sign({ payload: user }) };
      } else {
        return { message: 'mot de passe incorrect' };
      }
    } else {
      return { message: 'email inexistant' };
    }
  }
  async signToken(user:UpdateUserDto):Promise<any> {
    return { message: this.jwtService.sign({ payload: user }) };
  }
  async verifyToken(token: string): Promise<User> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new Error('Token verification failed');
    }
  }
  async changeState(id: string): Promise<User> {
    const u = await this.userModel.findById(id);
    return this.userModel.findByIdAndUpdate(id, { state: !u.state });
  }
  async sendCode(email: string): Promise<any> {
    console.log(email);
    const code = generateRandomCode(8);
    await this.transporter.sendMail({
      to: email,
      subject: 'Test Email',
      text: 'This is a your code ' + code,
    });
    return { message: code };
  }
  async findByemailModify(
    email: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userModel.findOne({ email });
    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
    return this.userModel.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });
  }
}

function generateRandomCode(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomCode = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomCode += characters.charAt(randomIndex);
  }

  return randomCode;
}
