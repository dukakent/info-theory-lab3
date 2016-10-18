import { Component, Input } from '@angular/core';

import { EntropyService } from '../entropy/entropy.service';

@Component({
  selector:     'optimal-table',
  templateUrl:  './optimalTable.component.html',
  styleUrls:    [
                  //'./optimalTable.component.css'
                ]
})
export class OptimalTableComponent {

  private entropy: EntropyService;

  constructor (entropy: EntropyService) {
    this.entropy = entropy;
  }
}
