import { Component } from '@angular/core';

@Component({
  selector:     'config',
  templateUrl:  './config.component.html',
  styleUrls:    [
                  './config.component.css'
                ]
})
export class ConfigComponent {

  private alphabetLength: number;
  private probabilityType: string;

  constructor() {
    this.alphabetLength = 3;
    this.probabilityType = 'equal';
  }

}
