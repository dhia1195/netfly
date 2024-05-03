/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OffreService } from './offre.service';
import { CreateOffreDto } from './dto/create-offre.dto';
import { UpdateOffreDto } from './dto/update-offre.dto';

@Controller('offre')
export class OffreController {
  constructor(private readonly OffreService: OffreService) {}

  @Post()
  create(@Body() createOffreDto: CreateOffreDto) {
    return this.OffreService.create(createOffreDto);
  }

  @Get()
  findAll() {
    return this.OffreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.OffreService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOffreDto: UpdateOffreDto) {
    return this.OffreService.update(id, updateOffreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.OffreService.remove(id);
  }
}
