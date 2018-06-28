import { Component, OnInit } from '@angular/core';

import { Hero } from './../model/hero';
import { HeroService } from './../services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getSecondBestsHeroes();
  }

  /**
   * Calls Heroes service to retrieve top 4 heroes from 2nd to 5th
   */
  getSecondBestsHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
