import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingsComponent } from './borrowings.component';

describe('BorrowingsComponent', () => {
  let component: BorrowingsComponent;
  let fixture: ComponentFixture<BorrowingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrowingsComponent]
    });
    fixture = TestBed.createComponent(BorrowingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
