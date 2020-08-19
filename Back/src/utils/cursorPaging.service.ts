import { Injectable } from '@nestjs/common';
import { buildPaginator } from 'typeorm-cursor-pagination';
import { ObjectType } from 'typeorm';
import Paginator from 'typeorm-cursor-pagination/lib/Paginator';

// import {} from ''

@Injectable()
export class CursorPagingService {
  firstPage(
    Entity: ObjectType<unknown>,
    limit = 10,
    order: 'ASC' | 'DESC' = 'DESC',
  ): Paginator<unknown> {
    return buildPaginator({
      entity: Entity,
      query: {
        limit,
        order,
      },
    });
  }
}
