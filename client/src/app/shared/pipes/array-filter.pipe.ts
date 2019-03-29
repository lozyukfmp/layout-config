import {Pipe, PipeTransform} from '@angular/core';

/**
 * items - initial array of Objects with string values
 * filter - a map with filter keys and filter values
 * returns filtered array
 */
@Pipe({
  name: 'filterArray'
})
export class ArrayFilterPipe implements PipeTransform {
  transform(items: Object[], filter: Object): any {
    if (!Array.isArray(items) || !items || !items.length || !filter) {
      return items;
    }

    let filterKeys = Object.keys(filter);

    return items.filter(item =>
      filterKeys.some((keyName) =>
        filter[keyName] && item[keyName].toLowerCase().includes(filter[keyName].toLowerCase()) || !filter[keyName]
      )
    );
  }
}
