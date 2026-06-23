/**
 * Skenario pengujian End-to-End Login:
 *
 * - should display login page correctly
 * - should display alert when email and password are wrong
 * - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[id="email"]').should('be.visible');
    cy.get('input[id="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible').contains('Masuk');
  });

  it('should display alert when email and password are wrong', () => {
    cy.get('input[id="email"]').type('wrongemail@test.com');
    cy.get('input[id="password"]').type('wrongpassword');

    cy.on('window:alert', (text) => {
      expect(text).to.contain('email or password is wrong');
    });

    cy.get('button[type="submit"]').click();
  });

  it('should display homepage when email and password are correct', () => {
    cy.get('input[id="email"]').type('testdicoding@gmail.com');
    cy.get('input[id="password"]').type('testdicoding');

    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:5173/');
    cy.get('.header').should('contain', 'Dicoding Forum');
  });
});
