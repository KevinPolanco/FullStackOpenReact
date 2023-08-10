describe('Blog app', function() {
  beforeEach(function() {
    console.log(Cypress.env('BACKEND'))
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'John Coltrane',
      username: 'JCol',
      password: 'John321'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')

    cy.get('html').should('not.contain', 'logout')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('JCol')
      cy.get('#password').type('John321')
      cy.get('#login-button').click()

      cy.contains('John Coltrane logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Coltrane')
      cy.get('#password').type('John222')
      cy.get('#login-button').click()

      cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    })
  })
})