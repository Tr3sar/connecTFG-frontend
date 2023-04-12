import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificatonListComponent } from './notificaton-list.component';

describe('NotificatonListComponent', () => {
  let component: NotificatonListComponent;
  let fixture: ComponentFixture<NotificatonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificatonListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificatonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
