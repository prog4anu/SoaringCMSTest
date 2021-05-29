import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditsubmenuComponent } from './admin-editsubmenu.component';

describe('AdminEditsubmenuComponent', () => {
  let component: AdminEditsubmenuComponent;
  let fixture: ComponentFixture<AdminEditsubmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditsubmenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditsubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
