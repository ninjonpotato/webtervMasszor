import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reviewTime'
})
export class ReviewTimePipe implements PipeTransform {

  transform(value: unknown): string {
    return "Írta: "+value;
  }

}
