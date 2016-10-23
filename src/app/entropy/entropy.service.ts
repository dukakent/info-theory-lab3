import { Injectable } from '@angular/core';
import { Symbol } from '../symbol/symbol.model';

@Injectable()
export class EntropyService {

  public alphabet: Symbol[] = [];
  public sortedAlphabet: Symbol[] = [];
  public probType: string;
  public entropy: number;
  public entropyMax: number;
  public length: number;
  public underloading: number;
  public speed: number;

  private probUpdater = {
    'equal': () => {
      let newP = 1 / this.alphabet.length;
      this.alphabet.forEach((sym, i) => {
        sym.p = newP;
      });
    },

    'rule': () => {
      this.alphabet.forEach((sym, i) => {
        if(i === this.alphabet.length - 1) {
          sym.p = this.alphabet[i - 1].p;
        } else {
          sym.p = Math.pow(0.5, i + 1);
        }
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

  private sort() {
    this.sortedAlphabet = [];
    this.alphabet.forEach((sym) => {
      this.sortedAlphabet.push(sym);
    });

    for (let i = 1; i < this.sortedAlphabet.length; i++) {
      let arr = this.sortedAlphabet;

      if (arr[i].p > arr[i - 1].p) {
        let tmp = arr[i];
        arr[i] = arr[i - 1];
        arr[i - 1] = tmp;
        i = 0;
      }
    }
  }

  private computeEntropy() {
    this.entropy = 0;

    this.alphabet.forEach((sym) => {
      this.entropy -= sym.p * Math.log2(sym.p);
    });
  }

  private computeEntropyMax() {
    this.entropyMax = Math.log2(this.alphabet.length);
  }

  private computeLength() {
    this.length = 0;

    this.alphabet.forEach((sym) => {
      this.length += sym.code.length * sym.p;
    });
  }

  private computeUnderloading() {
    this.underloading = this.entropyMax - this.entropy;
  }

  private computeSpeed() {
    let time = 0;
    this.alphabet.forEach((sym) => {
      time += sym.t * sym.p;
    });

    this.speed = this.entropy / time;
  }

  private resetCode() {
    this.sortedAlphabet.forEach((sym) => {
      sym.code = [];
    });
  }

  private setCode(arr: Symbol[]) {
    let group1 = [];
    let group2 = [];

    let probSumPassed = 0;
    let probSum = 0;

    if (arr.length === 2) {
      arr[0].code.push(1);
      arr[1].code.push(0);
      return;
    }

    arr.forEach((sym) => {
      probSum += sym.p;
    });

    arr.forEach((sym) => {
      probSumPassed += sym.p;

      if(probSumPassed - probSum <= 0) {
        group1.push(sym);
        sym.code.push(1);
      } else {
        group2.push(sym);
        sym.code.push(0);
      }

      probSum -= sym.p;
    });

    if (group1.length > 1) {
      this.setCode(group1);
    }

    if(group2.length > 1) {
      this.setCode(group2);
    }
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

    this.update();
  }

  public update(newType: string = this.probType): void {
    this.probType = newType;
    this.probUpdater[this.probType]();
    this.sort();
    this.resetCode();
    this.setCode(this.sortedAlphabet);
    this.computeEntropy();
    this.computeEntropyMax();
    this.computeUnderloading();
    this.computeSpeed();
    this.computeLength();
  }
}
