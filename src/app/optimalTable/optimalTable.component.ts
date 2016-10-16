import { Component, Input } from '@angular/core';

import { EntropyService } from '../entropy/entropy.service';

@Component({
  selector:     'optimalTable',
  templateUrl:  './optimalTable.component.html',
  styleUrls:    [
                  './optimalTable.component.css'
                ]
})
export class MatrixComponent {

  private entropy: EntropyService;

  constructor (EntropyService: EntropyService) {
    this.entropy = EntropyService;
  }
}
