import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddsubmenuComponent } from './admin-addsubmenu.component';

describe('AdminAddsubmenuComponent', () => {
  let component: AdminAddsubmenuComponent;
  let fixture: ComponentFixture<AdminAddsubmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddsubmenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddsubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
