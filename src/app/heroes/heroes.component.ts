import { Component, OnInit } from '@angular/core';

import { HeroService } from './../services/hero.service';

import { Hero } from '../model/hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  //List of heroes to display
  heroes: Hero[];

  /**
   * Currently selected hero
   * @deprecated No longer required, heroes are now linked via angular routing to hero detail view
   */
  /*selectedHero: Hero;*/

  /**
   * Basic constructor
   * @param heroService Injects the Hero Service singleton
   */
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    //Retrieve heroes list when component is initialized
    this.getHeroes();
  }

  /**
   * Retrieves heroes list from heroes service
   */
  getHeroes(): void {
    //Wait for heroes retrieval, subscribe to observable returned by service
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  /**
   * Event triggered when clicking a hero on the list
   * @deprecated Heroes are now linked via angular routing to hero detail view
   * @param hero Selected hero
   */
  /*onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }*/

  /**
   * Adds a new hero to data service and refreshes UI
   * @param name Name of the new hero
   */
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        //If hero is added correctly to data service, add it to UI list too
        this.heroes.push(hero);
      });
  }
}
