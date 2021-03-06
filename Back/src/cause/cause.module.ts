import { PvModule } from './../pv/pv.module';
import { CauseServices } from './cause.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cause } from './cause.entity';
import { CauseResolver } from './resolver';
import { causeFieldResolver } from './field-resilvers';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cause]),
    PvModule
  ],
  providers: [CauseServices, ...CauseResolver, ...causeFieldResolver],
  exports: [],
})
export class CauseModule {}
