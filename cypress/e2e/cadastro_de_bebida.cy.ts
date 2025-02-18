describe('Teste E2E - Cadastro de Bebida', () => {

  beforeEach(() => {
    cy.visit('/produtos/bebidas'); 
  });

  it('Deve preencher e enviar o formulário de bebida', () => {
    cy.get('input[formControlName="nome"]').type('Coca-cola');
    cy.get('mat-select[formControlName="tipo"]').click();
    cy.get('mat-option').contains("Não Alcoólica").click();
    cy.get('input[formControlName="preco_unidade"]').type('10');
    cy.get('input[formControlName="consumo_medio_adulto_ml"]').type('500');
    cy.get('input[formControlName="consumo_medio_crianca_ml"]').type('300');
    cy.get('button[type="submit"]').click();
    cy.get('input[formControlName="nome"]').should('contain.value', '');
  })
})
