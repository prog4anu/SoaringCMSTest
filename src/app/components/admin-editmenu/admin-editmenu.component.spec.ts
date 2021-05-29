import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditmenuComponent } from './admin-editmenu.component';

describe('AdminEditmenuComponent', () => {
  let component: AdminEditmenuComponent;
  let fixture: ComponentFixture<AdminEditmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditmenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
