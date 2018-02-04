/**
 * Just a brief examples of classes.
 * Of course in production each one must be in separate file - I just give the short example.
 */
export abstract class SomeCommonStuff {
  /**
  * In the real world here goes fields and then get/set methods for them.
  * For a example, standard name's field:
  */
  protected _name: string;
  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }
}


export class Item extends SomeCommonStuff {
  /* Here goes fields that must belong only to items.*/
}

export class User extends SomeCommonStuff {
  /* ... */
}
