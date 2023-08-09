import {OnInit, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'orderCompletionPipe'
})
export class OrderCompletionPipe implements PipeTransform {
  transform(value: boolean): string {
    if(value)
    {
      document.querySelector('#completion')?.classList.add('green');
      return "zrealizowane";
    }
    else {
      document.querySelector('#completion')?.classList.add('red');
      return "niezrealizowane";
    }
  }
}
