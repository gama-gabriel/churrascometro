import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCadastraChurrascoComponent } from './form-cadastra-churrasco.component';

describe('FormCadastraChurrascoComponent', () => {
  let component: FormCadastraChurrascoComponent;
  let fixture: ComponentFixture<FormCadastraChurrascoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCadastraChurrascoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCadastraChurrascoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
