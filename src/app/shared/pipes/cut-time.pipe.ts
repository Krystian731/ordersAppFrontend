import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutTime'
})
export class CutTimePipe implements PipeTransform {

  transform(value: string): string {
    return value.substring(0, 10);
  }
}
