import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { from, groupBy, mergeMap, toArray } from 'rxjs';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `   
    <table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Unit</th>
      </tr>
    </thead>
    <tbody>
      <ng-container *ngFor="let group of groupedPeople; let i=index">       
        <tr *ngFor="let person of group.data">
          <td>{{ person.name }}</td>
          <td>{{ person.age }}</td>
          <td>{{ person.unit }}</td>
        </tr>
        <tr class="text-danger"><td>{{i+1}}</td>
        <td > {{ getTotalAge(group.data) }}</td>
        
          <td > {{ getTotalUnits(group.data) }}</td>
        </tr>
      
      </ng-container>
    </tbody>
  </table>
  


  `,
})
export class App {
  name = 'Angular';
  people = [
    { name: 'Sue', age: 25, unit: 2 },
    { name: 'Joe', age: 30, unit: 3 },
    { name: 'Frank', age: 25, unit: 33 },
    { name: 'Sarah', age: 35, unit: 2 },
    { name: 'Rewa', age: 35, unit: 5 },
  ];
  groupedPeople: any[] = [];

  ngOnInit() {
    const source = from(this.people);

    this.groupedPeople = [];
    source
      .pipe(
        groupBy((p: any) => p.age),
        mergeMap((g: any) => g.pipe(toArray()))
      )
      .subscribe((res: any = []) => {
        this.groupedPeople.push({ age: res[0].age, data: res });
      });
  }
  getTotalUnits(data: any[]): number {
    return data.reduce((total, person) => total + person.unit, 0);
  }
  getTotalAge(data: any[]): number {
    return data.reduce((total, person) => total + person.age, 0);
  }
}

bootstrapApplication(App);
