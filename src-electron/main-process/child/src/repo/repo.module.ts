import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Resolvers from './resolver';
import Entities from './database/entities';
import Services from './services';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature(Entities)],
  providers: [...Services, ...Resolvers],
  exports: [...Services, ...Resolvers],
})
class RepoModule {}
export default RepoModule;
