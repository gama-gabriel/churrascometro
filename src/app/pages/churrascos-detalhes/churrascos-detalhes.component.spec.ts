import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurrascosDetalhesComponent } from './churrascos-detalhes.component';

describe('ChurrascosDetalhesComponent', () => {
  let component: ChurrascosDetalhesComponent;
  let fixture: ComponentFixture<ChurrascosDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChurrascosDetalhesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChurrascosDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
