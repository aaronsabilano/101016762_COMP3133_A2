import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphqlService } from '../../app/services/graphql';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {
  employees: any[] = [];
  message = 'Loading employees...';

  constructor(private graphqlService: GraphqlService) {}

ngOnInit(): void {
  console.log('EmployeeList ngOnInit fired');

  this.graphqlService.getAllEmployees().subscribe({
    next: (employees: any[]) => {
      console.log('Employees received:', employees);

      this.employees = employees;

      if (this.employees.length === 0) {
        this.message = 'No employees found';
      } else {
        this.message = '';
      }
    },
    error: (err: any) => {
      console.error('Employee fetch error:', err);
      this.message = 'Failed to load employees';
    }
  });
}
}