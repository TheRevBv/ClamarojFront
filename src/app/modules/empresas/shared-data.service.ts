import { Injectable } from '@angular/core';
import { IReceivedValue } from '@app/models/templete';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private parentValueSource = new BehaviorSubject<IReceivedValue>({
    title: '',
    subtitle: '',
    text: '',
    image: ''
  });

  parentValue$ = this.parentValueSource.asObservable();
  updateParentValue(value: IReceivedValue) {
    this.parentValueSource.next(value);
  }
}
