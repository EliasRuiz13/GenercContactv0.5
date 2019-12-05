import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultPosts = [];
    for (const contact of value) {
      if (contact.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(contact);
      };
      if (contact.apellido.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(contact);
      };
    };
    return resultPosts;
  }

}
