import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterControl'
})
export class FilterControlPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 2) return value;
    const resultPosts = [];
    for (const control of value) {
      if (control.updated_at.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(control);
      };
    };
    return resultPosts;
  }
}
