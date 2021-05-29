import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusNavComponent } from './menus-nav.component';

describe('MenusNavComponent', () => {
  let component: MenusNavComponent;
  let fixture: ComponentFixture<MenusNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenusNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
