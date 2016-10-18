import { Injectable } from '@angular/core';
import { Symbol } from '../symbol/symbol.model';

@Injectable()
export class EntropyService {

  public alphabet: Symbol[] = Array();
  public probType: string;

  private probUpdater = {
    'equal': () => {
      let newP = 1 / this.alphabet.length;
      this.alphabet.forEach((sym, i) => {
        sym.p = newP;
      });
    },

    'rule': () => {
      this.alphabet.forEach((sym, i) => {
        sym.p = Math.pow(0.5, i + 1);
      });
    },

    'random': () => {
      let sum = 0;

      this.alphabet.forEach((sym, i) => {
        sym.p = Math.random();
        sum += sym.p;
      });

      this.alphabet.forEach((sym, i) => {
        sym.p /= sum;
      });
    }
  };

  constructor() {}

  private pushSymbol(): void {
    let number = this.alphabet.length + 1;
    let name = 'x' + number;
    let newSymbol = new Symbol(name, 0, number);
    this.alphabet.push(newSymbol);
  }

  public setLength(kNew): void {
    let kOld = this.alphabet.length;

    if (kNew <= kOld) {
      this.alphabet.length = kNew;
    }

    while(kOld < kNew) {
      this.pushSymbol();
      kOld++;
    }

    this.updateProb();
  }

  public updateProb(newType: string = this.probType): void {
    this.probType = newType;
    this.probUpdater[this.probType]();
  }

}
