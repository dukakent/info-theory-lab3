import { Component } from '@angular/core';

import { EntropyService } from '../entropy/entropy.service';

@Component({
  selector:     'config',
  templateUrl:  './config.component.html',
  styleUrls:    [
                  './config.component.css'
                ]
})
export class ConfigComponent {

  private entropy: EntropyService;
  private _alphabetLength: number;
  private _probabilityType: string;

  constructor(entropy: EntropyService) {
    this.entropy = entropy;
  }

  ngOnInit() {
    this.probabilityType = 'equal';
    this.alphabetLength = 3;
  }

  get alphabetLength() {
    return this._alphabetLength;
  }

  set alphabetLength(value) {
    this._alphabetLength = value;
    this.entropy.setLength(value);
  }

  get probabilityType() {
    return this._probabilityType;
  }

  set probabilityType(value) {
    this._probabilityType = value;
    this.entropy.update(value);
  }
}
