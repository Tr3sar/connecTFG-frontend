import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationSaveComponent } from './publication-save.component';

describe('PublicationSaveComponent', () => {
  let component: PublicationSaveComponent;
  let fixture: ComponentFixture<PublicationSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicationSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicationSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
