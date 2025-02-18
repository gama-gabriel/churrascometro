import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurrascosCadastroComponent } from './churrascos-cadastro.component';

describe('ChurrascosCadastroComponent', () => {
  let component: ChurrascosCadastroComponent;
  let fixture: ComponentFixture<ChurrascosCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChurrascosCadastroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChurrascosCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
