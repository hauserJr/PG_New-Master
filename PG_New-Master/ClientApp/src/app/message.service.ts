import { Injectable } from '@angular/core';
import { Message } from './message';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class MessageService {
  private messageUrl = 'http://localhost:1974/api/Messages';

  constructor(private http: HttpClient) { }
  getMsgs(): Observable<Message[]> {
    return this.http.get<Message[]>(this.messageUrl).pipe(
      catchError(this.handleError<Message[]>('getMessage'))
    );
  }

  addMsg(msg: Message): Observable<Message> {
    return this.http.post<Message>(this.messageUrl, msg, httpOptions).pipe(
      catchError(this.handleError<Message>('addMsg'))
    );
  }
  delMsg(msg: Message): Observable<Message> {
    const delUrl = `${this.messageUrl}/${msg.id}`;
    return this.http.delete<Message>(delUrl, httpOptions).pipe(
      catchError(this.handleError<Message>('delMsg'))
    );
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
