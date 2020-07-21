import { Module } from '@nestjs/common';
import { ConvocationsService } from './convocations.service';
import { ConvocationsResolver } from './convocations.resolver';

@Module({
  providers: [ConvocationsService, ConvocationsResolver],
  exports: [],
})
export class ConvocationsModule {}
