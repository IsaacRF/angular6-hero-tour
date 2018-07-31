import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

import { Hero } from '../model/hero';
import { HEROES } from '../mocks/mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  /**
   * Basic constructor
   * @param http Http client injection
   * @param messageService Message services injection
   */
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /**
   * Retrieves a list of heroes from a webservice (simulated via the mock heroes)
   */
  getHeroesMock(): Observable<Hero[]> {
    this.log('Fetched heroes');
    return of(HEROES);
  }

  /**
   * GET heroes from server
   */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log(`fetched ${heroes.length} heroes`)),
        catchError(this.handleError('getHeroes', []))
      );
  }

  /**
   * Retrieves a hero info from mock heroes
   * @param id Hero ID
   */
  getHeroMock(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  /**
   * GET: Hero by id from server. Will 404 if id not found
   * @param id Hero ID
   */
  getHero(id: number): Observable<Hero> {
    const URL = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(URL).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /**
   * POST: add a new hero to the server
   * @param hero Hero to add
   */
  addHero(hero: Hero): Observable<Hero> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /**
   * PUT: Update the hero on the server
   * @param hero Hero to update
   */
  updateHero(hero: Hero): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * DELETE: delete the hero from the server
   * @param hero Hero to delete. Can be a Hero object or an id
   */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation name of the operation that failed
   * @param result optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * Log a HeroService message with the MessageService
   * @param message Message to log
   */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
}
