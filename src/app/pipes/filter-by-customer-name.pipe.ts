import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCustomerName',
})
export class FilterByCustomerNamePipe implements PipeTransform {
  transform(items: any[], customerName: string): any[] {
    if (!items) return [];
    if (!customerName) return items;

    return items.filter((item) =>
      item.customerName.toLowerCase().includes(customerName.toLowerCase())
    );
  }
}
