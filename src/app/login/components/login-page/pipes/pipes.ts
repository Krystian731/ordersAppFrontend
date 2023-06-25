import { Pipe, PipeTransform } from '@angular/core';
import { errorsOrder, errorsUser, errorsPassword } from '../../../../shared/errors'

@Pipe({ name: 'getErrorMessUser' })
export class GetErrorMessUser implements PipeTransform {
  private errors = errorsUser;
  transform(errorsList: any): string {
    const firstKey = Object.keys(errorsList)[0];
    return this.errors[firstKey];
  }
}

@Pipe({ name: 'getErrorMessOrder' })
export class GetErrorMessOrder implements PipeTransform {
  private errors = errorsOrder;
  transform(errorsList: any): string {
    const firstKey = Object.keys(errorsList)[0];
    return this.errors[firstKey];
  }
}

@Pipe({ name: 'getErrorMessPassword' })
export class GetErrorMessPassword implements PipeTransform {
  private errors = errorsPassword;
  transform(errorsList: any): string {
    const firstKey = Object.keys(errorsList)[0];
    return this.errors[firstKey];
  }
}

@Pipe({ name: 'getFirstKey' })
export class GetFirstKey implements PipeTransform {

  transform(errorsList: any): string {
    const firstKey = Object.keys(errorsList)[0];
    return firstKey;
  }
}
