import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormCadastraCarneComponent } from './form-cadastra-carne.component';
import { of } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PrecoMinimoDirective } from '../../validators/preco-minimo.directive';
import { CarnesService } from '../../services/carnes.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';


class RouterMock {
  navigate = jasmine.createSpy('navigate'); 
}

class CarnesServiceMock {
  cadastrarCarne = jasmine.createSpy('cadastrarCarne').and.returnValue(of({}));

  alterarCarne = jasmine.createSpy('alterarCarne').and.returnValue(of({}));

  pegarCarne = jasmine.createSpy('pegarCarne').and.returnValue(of({
    id: '123',
    nome: 'Picanha',
    tipo: 'bovina',
    preco_kg: 100,
    consumo_medio_adulto_g: 200,
    consumo_medio_crianca_g: 100
  }));
}

describe('FormCadastraCarneComponent', () => {
  let component: FormCadastraCarneComponent; 
  let fixture: ComponentFixture<FormCadastraCarneComponent>; 
  let carnesService: CarnesServiceMock; 
  let router: RouterMock; 

  beforeEach(async () => { 
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormCadastraCarneComponent,
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        CommonModule,
        PrecoMinimoDirective
      ],
      providers: [
        { provide: CarnesService, useClass: CarnesServiceMock }, 
        { provide: Router, useClass: RouterMock } 
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCadastraCarneComponent);
    component = fixture.componentInstance;
    carnesService = TestBed.inject(CarnesService) as any;
    router = TestBed.inject(Router) as any;
    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it('deve carregar uma carne se o ID estiver presente', () => {
    component.id = '123'; 

    component.ngOnInit();

    expect(carnesService.pegarCarne).toHaveBeenCalledWith(component.id);

    expect(component.carne).toEqual({
      id: '123',
      nome: 'Picanha',
      tipo: 'bovina',
      preco_kg: 100,
      consumo_medio_adulto_g: 200,
      consumo_medio_crianca_g: 100
    });
  });

  it('deve chamar cadastraCarne quando o formulário é submetido', () => {
    const form: NgForm = {
      value: {
        nome: 'Maminha',
        tipo: 'bovina',
        preco_kg: 50,
        consumo_medio_adulto_g: 100,
        consumo_medio_crianca_g: 100
      },
      valid: true
    } as NgForm;


    component.onSubmit(form);



    expect(carnesService.cadastrarCarne).toHaveBeenCalledWith(form.value);
  })

  it('deve mudar a descrição do botão de submit caso tenha id presente', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    const compiladoHtml = fixture.nativeElement;

    const botao = compiladoHtml?.querySelector('#submitButton');
    expect(botao).toBeTruthy();
    expect(botao?.textContent.trim()).toBe('Cadastrar nova carne');

    component.id = '123';

    fixture.detectChanges();
    await fixture.whenStable();

    expect(botao?.textContent.trim()).toBe('Editar carne');
  })
});
