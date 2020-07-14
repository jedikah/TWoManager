import { RxAttachmentCreator, RxAttachment } from 'rxdb';

declare module 'rxdb' {
  type RxDocument<RxDocumentType = {}, OrmMethods = {}> = RxDocumentBase<
    RxDocumentType,
    OrmMethods
  > &
    RxDocumentType &
    OrmMethods;

  type RxDocumentTypeWithRev<RxDocumentType> = RxDocumentType & {
    _rev: string;
  };

  type AtomicUpdateFunction<RxDocumentType> = (
    doc: RxDocumentType
  ) => RxDocumentType | Promise<RxDocumentType>;

  interface RxDocumentBase<RxDocumentType, OrmMethods = {}> {
    putAttachment(
      creator: RxAttachmentCreator
    ): Promise<RxAttachment<RxDocumentType, OrmMethods> & OrmMethods>;
  }
}
