import { Component } from '@angular/core';

@Component({
  selector: 'app-seh-status',
  templateUrl: './seh-status.component.html',
  styleUrls: ['./seh-status.component.scss']
})
export class SehStatusComponent {

  cols = [
    { field: 'month', header: 'Oylar' },
    { field: 'seh1', header: 'з/р' },
    { field: 'seh2', header: 'заг' },
    { field: 'seh3', header: 'шп' },
    { field: 'seh4', header: 'рас' },
    { field: 'seh5', header: 'ров' },
    { field: 'seh6', header: 'теш' },
    { field: 'seh7', header: 'пвс' },
    { field: 'seh8', header: 'сб' },
    { field: 'seh9', header: 'лак' },
    { field: 'seh10', header: 'мяг' },
    { field: 'seh11', header: 'упак' },
  ]

  rows = [
    {
      month: '2023-fevral',
      seh1: {color: 'yellow'},
      seh2: {color: 'emerald'},
      seh3: {color: 'yellow'},
      seh4: {color: 'yellow'},
      seh5: {color: 'emerald'},
      seh6: {color: 'rose'},
      seh7: {color: 'rose'},
      seh8: {color: 'rose'},
      seh9: {color: 'rose'},
      seh10: {color: 'rose'},
      seh11: {color: 'rose'},
    },
    {
      month: '2023-mart',
      seh1: {color: 'lime'},
      seh2: {color: 'lime'},
      seh3: {color: 'rose'},
      seh4: {color: 'green'},
      seh5: {color: 'green'},
      seh6: {color: 'green'},
      seh7: {color: 'green'},
      seh8: {color: 'green'},
      seh9: {color: 'green'},
      seh10: {color: 'green'},
      seh11: {color: 'yellow'},
    },
    {
      month: '2023-aprel',
      seh1: {color: 'yellow'},
      seh2: {color: 'emerald'},
      seh3: {color: 'yellow'},
      seh4: {color: 'yellow'},
      seh5: {color: 'emerald'},
      seh6: {color: 'rose'},
      seh7: {color: 'rose'},
      seh8: {color: 'rose'},
      seh9: {color: 'rose'},
      seh10: {color: 'rose'},
      seh11: {color: 'rose'},
    },
    {
      month: '2023-may',
      seh1: {color: ''},
      seh2: {color: ''},
      seh3: {color: ''},
      seh4: {color: ''},
      seh5: {color: ''},
      seh6: {color: ''},
      seh7: {color: ''},
      seh8: {color: ''},
      seh9: {color: ''},
      seh10: {color: ''},
      seh11: {color: ''},
    }
  ]


}
