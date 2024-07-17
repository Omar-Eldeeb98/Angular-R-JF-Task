import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByTransactionAmount',
})
export class FilterByTransactionAmountPipe implements PipeTransform {
  transform(items: any[], amount: number): any[] {
    if (!items) return [];
    if (!amount && amount !== 0) return items;

    return items.filter((item) => item.amount == amount);
  }
}
