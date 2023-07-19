import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private _sidebarVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  sidebarVisible$ = this._sidebarVisible.asObservable();

  constructor() { }

  toggleSidebarVisibility(): void {
    this._sidebarVisible.next(!this._sidebarVisible.value);
  }
}
