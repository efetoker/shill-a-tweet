import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShillComponent } from './shill.component';

describe('ShillComponent', () => {
  let component: ShillComponent;
  let fixture: ComponentFixture<ShillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
