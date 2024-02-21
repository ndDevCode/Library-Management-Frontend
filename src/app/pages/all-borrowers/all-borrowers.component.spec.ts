import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBorrowersComponent } from './all-borrowers.component';

describe('AllBorrowersComponent', () => {
  let component: AllBorrowersComponent;
  let fixture: ComponentFixture<AllBorrowersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllBorrowersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllBorrowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
