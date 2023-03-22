import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoChatComponent } from './grupo-chat.component';

describe('GrupoChatComponent', () => {
  let component: GrupoChatComponent;
  let fixture: ComponentFixture<GrupoChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupoChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupoChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
