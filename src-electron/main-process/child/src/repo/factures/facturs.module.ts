import { Module } from '@nestjs/common';
import { FacturesResolver } from './factures.resolver';
import { FacturesService } from './factures.service';

@Module({
  providers: [FacturesResolver, FacturesService],
  exports: [],
})
export class FacturesModule {}
