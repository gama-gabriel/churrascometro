import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurrascosComponent } from './churrascos.component';

describe('ChurrascosComponent', () => {
  let component: ChurrascosComponent;
  let fixture: ComponentFixture<ChurrascosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChurrascosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChurrascosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
