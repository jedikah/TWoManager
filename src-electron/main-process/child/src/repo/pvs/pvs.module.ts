import { Module } from '@nestjs/common';
import { PvsService } from './pvs.service';
import { PvsResolver } from './pvs.resolver';

@Module({
  providers: [PvsService, PvsResolver],
  exports: [],
})
export class PvModule {}
