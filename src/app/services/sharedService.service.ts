import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

/**
 * Small example of shared service that's great solution when we've got unrelated components and wanna pass data between them.
 */
@Injectable()
export class SharedService {

  private _currentParams: Params;
  set currentParams(params: Params) {
    this._currentParams = params;
  }
  get currentParams(): Params {
    return this._currentParams;
  }

  private _returnToAwesome: boolean;
  set returnToAwesome(value: boolean) {
    this._returnToAwesome = value;
  }
  get returnToAwesome(): boolean {
    return this._returnToAwesome;
  }

  constructor() {}
}

