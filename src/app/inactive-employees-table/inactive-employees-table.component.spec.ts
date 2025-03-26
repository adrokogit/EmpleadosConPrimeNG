import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveEmployeesTableComponent } from './inactive-employees-table.component';

describe('InactiveEmployeesTableComponent', () => {
  let component: InactiveEmployeesTableComponent;
  let fixture: ComponentFixture<InactiveEmployeesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InactiveEmployeesTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InactiveEmployeesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
