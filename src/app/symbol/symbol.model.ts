export class Symbol {

  public name: string;
  public p: number;
  public t: number;
  public code: number[];

  constructor(name: string = 'unnamed', p: number = 0, t: number = 0) {
    this.name = name;
    this.p = p;
    this.t = t;
    this.code = [];
  }

}
