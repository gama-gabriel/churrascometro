import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosCadastroComponent } from './produtos-cadastro.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormCadastraBebidaComponent } from '../../shared/components/form-cadastra-bebida/form-cadastra-bebida.component';
import { FormCadastraCarneComponent } from '../../shared/components/form-cadastra-carne/form-cadastra-carne.component';
import { ActivatedRoute } from '@angular/router';

describe('ProdutosCadastroComponent - Teste de Integração', () => {
  let component: ProdutosCadastroComponent;
  let fixture: ComponentFixture<ProdutosCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProdutosCadastroComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        FormCadastraBebidaComponent,
        FormCadastraCarneComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { tipo: 'bebidas'} } }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProdutosCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente FormCadastroBebida dentro do ProdutosCadastro se tipo for bebidas', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const template = fixture.nativeElement;
    const formBebida = template.querySelector('app-form-cadastra-bebida');

    expect(formBebida).toBeTruthy();
  });

  it('deve criar o componente FormCadastroCarne dentro do ProdutosCadastro se tipo for carnes', async () => {
    component.parameterTipo = 'carnes';

    fixture.detectChanges();
    await fixture.whenStable();

    const template = fixture.nativeElement;
    const formCarne = template.querySelector('app-form-cadastra-carne');

    expect(formCarne).toBeTruthy();
  });
});
