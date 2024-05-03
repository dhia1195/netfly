/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AchatSchema, Achats } from './achats.schema';
import { AchatsController } from './achats.controller';
import { AchatService } from './achats.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Achats.name, schema: AchatSchema}])
      ],
      controllers: [AchatsController],
      providers: [AchatService]

})

export class AchatsModule {}
