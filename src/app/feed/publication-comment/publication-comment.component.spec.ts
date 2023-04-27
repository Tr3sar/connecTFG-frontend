import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationCommentComponent } from './publication-comment.component';

describe('PublicationCommentComponent', () => {
  let component: PublicationCommentComponent;
  let fixture: ComponentFixture<PublicationCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicationCommentComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PublicationCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
