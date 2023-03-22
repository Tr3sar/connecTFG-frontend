import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoEditComponent } from './grupo-edit.component';

describe('GrupoEditComponent', () => {
  let component: GrupoEditComponent;
  let fixture: ComponentFixture<GrupoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupoEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
