import { Component } from '@angular/core';


export interface PeriodicElement {
    name: string;
    position: number;
    furniture: string;
    summa: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: '010AB', furniture: 'стол', summa: '350 000'},
    {position: 2, name: '010AB', furniture: 'стол', summa: '350 000'},
    {position: 3, name: '010AB', furniture: 'стол', summa: '350 000'},
    {position: 4, name: '010AB', furniture: 'стол', summa: '350 000'},
    {position: 5, name: '010AB', furniture: 'стол', summa: '350 000'},
    {position: 6, name: '010AB', furniture: 'стол', summa: '350 000'},
    {position: 7, name: '010AB', furniture: 'стол', summa: '350 000'},
    {position: 8, name: '010AB', furniture: 'стол', summa: '350 000'},
    {position: 9, name: '010AB', furniture: 'стол', summa: '350 000'},
    {position: 10, name: '010AB', furniture: 'стол', summa: '350 000'},
];

@Component({
  selector: 'todo-table',
  templateUrl: './todo-table.component.html'
})
export class TodoTableComponent {
    displayedColumns: string[] = ['position', 'name', 'furniture', 'summa', 'action'];
    dataSource = ELEMENT_DATA;
}
