import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SharedService } from '../../services/sharedService.service';
import { Item, User } from '../../classes/classesGoesHere';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'my-awesome-component',
  templateUrl: './awesome.component.html',
  styleUrls: ['./awesome.component.scss']
})
export class AwesomeComponent implements OnInit, OnDestroy {

  public moduleName: string;
  public someNecessaryId: number;
  public item: Item;
  public hash: string;

  private _subscription: Subscription;
  private _urlParams: Params;
  private _currentUser: User;

  /**
   * If this component is child for some other components, we can use events to notify parents with some info. E.g.:
   */
  @Output() public onWhateverClick: EventEmitter<Object> = new EventEmitter();

  public notifyParent(notification: any): void {
    this.onWhateverClick.emit(notification);
  }

  /**
   * Some method that invokes when user click on button in the template, e.g. 'Create new item'.
   * That code will allow us to go to the 'add' route and meanwhile...
   * ...using shared service we'll remember some stuff like current params and then we can easily grab them from service...
   * ...and put in our url when we'r supposed to go back.
   */
  public createItemOrMoveToExisting(currentItem?: Item): void {
    let linkToMove: string;

    if (currentItem) {
      linkToMove = `/someModule/${this.moduleName}/edit/${currentItem.name}`;
    } else {
      linkToMove = `/someModule/${this.moduleName}/add`;
    }

    this._sharedService.returnToAwesome = true;
    this._sharedService.currentParams = this._urlParams;
    this._router.navigateByUrl(linkToMove)
      .catch((error: any) => console.error(`Can't navigate... ${error}`));
  }

  /**
   * If you wanna write method that must work only in that scope (component) you can just write word private and voila!...
   */
  private _reassembleHash(): void {
    const deepCopy: Item = JSON.parse(JSON.stringify(this.item));
    this.hash = Md5.hashStr(JSON.stringify(deepCopy)) as string;
  }

  constructor(
    private _route: ActivatedRoute,
    private _sharedService: SharedService,
    private _router: Router
  ) {
    /**
     * We can use routing and resolve to grab some data before we activate component and route.
     * Implementations must be in Routes and Resolvers TS files, variables are used as follows:
     * this.moduleName = this._route.snapshot.data.someParamsObject.moduleName;
     * this.someNecessaryId = this._route.snapshot.data.someParamsObject.someNecessaryId;
     */

    /**
     * Here we normally assign all our variables (using DI, Resolvers or whatever)...
     * ...that we declared in the beginning of our component, like:
     * this._currentUser = this._usersService.getUser();
     */
  }

  ngOnInit() {

    /**
     * Some classic usage of Observable, anytime the params changes - we'll know about it instantly.
     */
    this._subscription = this._route.params.subscribe((params: Params) => {
      this._urlParams = params;
    })
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
