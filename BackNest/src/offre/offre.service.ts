/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateOffreDto } from './dto/create-offre.dto';
import { Model } from 'mongoose';
import { Offre } from './entities/offre.entity';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateOffreDto } from './dto/update-offre.dto';
import { EmailService } from 'src/reclamation/email/email.service';

@Injectable()
export class OffreService { constructor(
    @InjectModel('offre')
    private readonly OffreModel: Model<Offre>,
    private readonly emailService: EmailService,

  ) {}

  async create(
    createOffreDto: CreateOffreDto,
  ): Promise<Offre> {
    console.log("offre added with success");
    const createdOffre = new this.OffreModel(createOffreDto);
    // Envoyer un e-mail à une autre boîte e-mail
    await this.emailService.sendEmail(
      'dhiamed572@gmail.com',
      'Nouvelle offre ajoutée',
      'Une nouvelle offre a été créée 😍.',
    );
    return createdOffre.save();
  }

  async findAll(): Promise<Offre[]> {
    return this.OffreModel.find();
  }

  findOne(id: string) {
    return this.OffreModel.findById(id);
  }

  update(id: string, updateOffreDto: UpdateOffreDto) {
    return this.OffreModel.findByIdAndUpdate(id, updateOffreDto);
  }

  remove(id: string) {
    return this.OffreModel.findByIdAndDelete(id);
  }
}
