import { TypeTravServices } from './typetrav.service';
import { UsersModule } from './../user/user.module';
import { ClientModule } from './../client/client.module';
import { FolderModule } from './../folder/folder.module';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeTrav } from './typetrav.entity';
import { typeTravResolver } from './resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeTrav]),
    forwardRef(() => FolderModule), 
    ClientModule,
    UsersModule
  ],
  providers: [TypeTravServices, ...typeTravResolver],
  exports: [TypeTravServices, ...typeTravResolver],
})
export class TypeTravModule {}
