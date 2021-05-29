import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuNavComponent } from './submenu-nav.component';

describe('SubmenuNavComponent', () => {
  let component: SubmenuNavComponent;
  let fixture: ComponentFixture<SubmenuNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmenuNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmenuNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
