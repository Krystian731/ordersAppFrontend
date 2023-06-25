import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderCompletionPipe'
})
export class OrderCompletionPipe implements PipeTransform {
  transform(value: boolean | null | undefined): string {
    return value ? 'zrealizowana' : 'niezrealizowane';
  }
}
