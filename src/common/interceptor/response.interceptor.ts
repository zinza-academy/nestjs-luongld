import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagingResponse } from '../type/pagingResponse.class';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof PagingResponse) {
          const paging = {
            count: data.count,
            page: data.page,
            limit: data.limit,
          };
          return {
            data: data.data,
            paging,
          };
        } else return data;
      }),
    );
  }
}
