import { Component } from '@angular/core';

import { EntropyService } from '../entropy/entropy.service';

@Component({
  selector:     'result',
  templateUrl:  './result.component.html',
  styleUrls:    [
                  // './result.component.css'
                ]
})
export class ResultComponent {

  private entropy: EntropyService;

  constructor (entropy: EntropyService) {
    this.entropy = entropy;
  }
}
