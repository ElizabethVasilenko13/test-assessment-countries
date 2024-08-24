import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByPipe',
  standalone: true,
})
export class FilterByPipe<T> implements PipeTransform {
  transform(items: T[], filterField: keyof T, searchTerm: string): T[] {
    if (!items || !searchTerm || !filterField) {
      return items;
    }

    return items.filter(item =>
      (item[filterField] as string).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
