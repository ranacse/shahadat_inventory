import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductQuantityComponent } from './update-product-quantity.component';

describe('UpdateProductQuantityComponent', () => {
  let component: UpdateProductQuantityComponent;
  let fixture: ComponentFixture<UpdateProductQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProductQuantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProductQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
