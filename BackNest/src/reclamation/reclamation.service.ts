/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateReclamationDto } from './dto/create-reclamation.dto';
import { UpdateReclamationDto } from './dto/update-reclamation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reclamation } from './entities/reclamation.entity';
import { EmailService } from './email/email.service';
@Injectable()
export class ReclamationService {
  constructor(
    @InjectModel('reclamation')
    private readonly ReclamationModel: Model<Reclamation>,
    private readonly emailService: EmailService,
  ) {}

  async create(
    createReclamationDto: CreateReclamationDto,
  ): Promise<Reclamation> {
    console.log('Reclamation added with success');
    const createdReclamation = new this.ReclamationModel(createReclamationDto);
    const savedReclamation = await createdReclamation.save();

    // Envoyer un e-mail à une autre boîte e-mail
    await this.emailService.sendEmail(
      'dhiamed572@gmail.com',
      'Nouvelle réclamation ajoutée',
      'Une nouvelle réclamation a été ajoutée 😍.',
    );

    return savedReclamation;
  }

  async findAll(): Promise<Reclamation[]> {
    return this.ReclamationModel.find();
  }

  findOne(id: string) {
    return this.ReclamationModel.findById(id);
  }

  update(id: string, updateReclamationDto: UpdateReclamationDto) {
    return this.ReclamationModel.findByIdAndUpdate(id, updateReclamationDto);
  }

  remove(id: string) {
    return this.ReclamationModel.findByIdAndDelete(id);
  }
}
