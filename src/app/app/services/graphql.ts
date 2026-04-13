import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  constructor(private apollo: Apollo) {}

  getHealth(): Observable<string> {
    return from(
      this.apollo.query<{ health: string }>({
        query: gql`
          query HealthCheck {
            health
          }
        `,
        fetchPolicy: 'no-cache'
      })
    ).pipe(
      map((result) => result.data?.health ?? 'No backend response')
    );
  }

  login(username: string, password: string) {
    return from(
      this.apollo.query<{
        login: {
          message: string;
          user: {
            _id: string;
            username: string;
            email: string;
          } | null;
        };
      }>({
        query: gql`
          query Login($username_or_email: String!, $password: String!) {
            login(input: {
              username_or_email: $username_or_email
              password: $password
            }) {
              message
              user {
                _id
                username
                email
              }
            }
          }
        `,
        variables: {
          username_or_email: username,
          password: password
        },
        fetchPolicy: 'no-cache'
      })
    ).pipe(
      map((result) => result.data?.login)
    );
  }

  getAllEmployees(): Observable<any[]> {
    return from(
      this.apollo.query<{
        getAllEmployees: any[];
      }>({
        query: gql`
          query GetAllEmployees {
            getAllEmployees {
              eid
              first_name
              last_name
              email
              designation
              department
              salary
            }
          }
        `,
        fetchPolicy: 'no-cache'
      })
    ).pipe(
      map((result) => result.data?.getAllEmployees ?? [])
    );
  }
}