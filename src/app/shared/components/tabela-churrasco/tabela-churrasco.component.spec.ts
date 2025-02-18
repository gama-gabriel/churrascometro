import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaChurrascoComponent } from './tabela-churrasco.component';

describe('TabelaChurrascoComponent', () => {
  let component: TabelaChurrascoComponent;
  let fixture: ComponentFixture<TabelaChurrascoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaChurrascoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabelaChurrascoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
