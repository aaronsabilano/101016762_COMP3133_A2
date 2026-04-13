import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GraphqlService } from './app/services/graphql';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  backendMessage = 'Loading backend message...';

  constructor(private graphqlService: GraphqlService) {}

  ngOnInit(): void {
    this.graphqlService.getHealth().subscribe({
      next: (message) => {
        this.backendMessage = message;
      },
      error: (error) => {
        console.error('GraphQL connection error:', error);
        this.backendMessage = 'Failed to connect to backend';
      },
    });
  }
}