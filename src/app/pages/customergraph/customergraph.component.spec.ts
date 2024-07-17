import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomergraphComponent } from './customergraph.component';

describe('CustomergraphComponent', () => {
  let component: CustomergraphComponent;
  let fixture: ComponentFixture<CustomergraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomergraphComponent]
    });
    fixture = TestBed.createComponent(CustomergraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
