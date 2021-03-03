import { ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Folder } from '../../folder/folder.entity';
import { FolderServices } from '../../folder/folder.service';
import { Pv } from '../pv.entity';

@Resolver(() => Pv)
export class PvFieldResolvers {
  constructor(private folderServices: FolderServices) {}

  @ResolveField(() => Folder)
  folder(@Root() pv: Pv): Promise<Folder> {
    return this.folderServices.FolderById(pv.folderId);
  }
}
