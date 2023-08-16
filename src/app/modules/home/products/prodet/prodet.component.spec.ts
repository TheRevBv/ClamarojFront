import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdetComponent } from './prodet.component';

describe('ProdetComponent', () => {
  let component: ProdetComponent;
  let fixture: ComponentFixture<ProdetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
