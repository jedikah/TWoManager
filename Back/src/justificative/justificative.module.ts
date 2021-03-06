import { PvModule } from './../pv/pv.module';
import { JustificativeResolver } from './resolver/index';
import { JustificativeServices } from './justificative.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Justificative } from './justificative.entity';
import { justificativeFieldResolver } from './field-resilvers';

@Module({
  imports: [
    TypeOrmModule.forFeature([Justificative]),
    PvModule
  ],
  providers: [JustificativeServices, ...JustificativeResolver, ...justificativeFieldResolver],
  exports: [],
})
export class JustificativeModule {}
