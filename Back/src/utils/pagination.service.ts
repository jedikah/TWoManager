import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
  private paginateResults<T>({
    after: cursor,
    pageSize,
    results,
    cursorKey,
  }: {
    after: number | null;
    pageSize: number;
    results: Array<T>;
    cursorKey: string;
  }): Array<T> {
    if (pageSize < 1) return [];
    if (!cursor) return results.slice(0, pageSize);

    const cursorIndex = results.findIndex(item => {
      const itemCursor = item[cursorKey] ? item[cursorKey] : null;
      return itemCursor ? cursor === itemCursor : false;
    });

    return cursorIndex >= 0
      ? cursorIndex === results.length - 1
        ? []
        : results.slice(
            cursorIndex + 1,
            Math.min(results.length, cursorIndex + 1 + pageSize),
          )
      : results.slice(0, pageSize);
  }

  pagination<T>(
    list: Array<T>,
    cursorKey: string,
    pageSize = 5,
    after = 0,
  ): { cursor: number; hasMore: boolean; list: Array<T> } {
    if (list.length === 0) return { cursor: 0, hasMore: false, list: [] };

    const result = this.paginateResults<T>({
      after,
      pageSize,
      results: list,
      cursorKey,
    });

    return {
      list: result,
      cursor: result.length ? result[result.length - 1][cursorKey] : 0,
      hasMore: result.length
        ? result[result.length - 1][cursorKey] !==
          list[list.length - 1][cursorKey]
        : false,
    };
  }
}
