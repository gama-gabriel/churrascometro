import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCarneComponent } from './card-carne.component';

describe('CardCarneComponent', () => {
  let component: CardCarneComponent;
  let fixture: ComponentFixture<CardCarneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCarneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardCarneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
