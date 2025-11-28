describe('Бургер конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });
  afterEach(function () {
    cy.clearAllLocalStorage();
    cy.clearCookies();
  });
  it('should order burger', () => {
    cy.get(`[data-cy=bun-ingredients]`).contains('Добавить').click();
    cy.get(`[data-cy=main-ingredients]`).contains('Добавить').click();
    cy.get(`[data-cy=sauces-ingredients]`).contains('Добавить').click();
    cy.get(`[data-cy=order-sum] button`).click();

    cy.wait('@createOrder');

    cy.get(`[data-cy=order-number]`).contains('12345').should('exist');
    cy.get('[data-cy=modal-close]').click();
    cy.get(`[data-cy=order-number]`).should('not.exist');

    cy.get(`[data-cy=bun-constructor-bun-1]`).should('not.exist');
    cy.get(`[data-cy=bun-constructor-bun-2]`).should('not.exist');
    cy.get(`[data-cy=bun-constructor-ingredients]`)
      .should('not.contain', 'Биокотлета из марсианской Магнолии')
      .should('not.contain', 'Соус Spicy-X');
  });

  it('should add bun', () => {
    cy.get(`[data-cy=bun-ingredients]`).contains('Добавить').click();
    cy.get(`[data-cy=bun-constructor-bun-1]`)
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get(`[data-cy=bun-constructor-bun-1]`)
      .contains('Краторная булка N-200i')
      .should('exist');
  });

  it('should add ingredient', () => {
    cy.get(`[data-cy=main-ingredients]`).contains('Добавить').click();
    cy.get(`[data-cy=sauces-ingredients]`).contains('Добавить').click();
    cy.get(`[data-cy=bun-constructor-ingredients]`)
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
    cy.get(`[data-cy=bun-constructor-ingredients]`)
      .contains('Соус Spicy-X')
      .should('exist');
  });
});

describe('should ingredients modal works correctly', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  it('should open modal', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').should('exist');
  });
  it('should close modal', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modal-close]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });
  it('should close on overlay click', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get(`[data-cy=modal-overlay]`).click('left', { force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
  it('should show right ingredient info in modal', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.contains('Краторная булка N-200i').should('exist');
    cy.contains('420').should('exist');
    cy.contains('80').should('exist');
  });
});

export {};
