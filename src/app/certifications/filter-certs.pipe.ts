import { Pipe, PipeTransform } from '@angular/core';
import { Certificate } from './certificate.model';

@Pipe({
  name: 'filterCerts'
})
export class FilterCertsPipe implements PipeTransform {

  transform(value: Certificate[], filterString: string): any {
    if (value) {
      filterString = filterString.toLowerCase();
      if (value.length === 0 || filterString === ''){
        return value;
      }
      const resultArray = [];
      for (const item of value) {
        if (item.name.toLowerCase().startsWith(filterString) ) {
          resultArray.push(item);
        }
      }
      return resultArray;
    }
  }

}
