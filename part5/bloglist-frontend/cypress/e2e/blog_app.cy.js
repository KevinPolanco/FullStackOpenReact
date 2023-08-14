describe('Blog app', function() {
  beforeEach(function() {
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'JCol', password: 'John321' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      
      cy.get('#title-input').type('Goodbye, Clean Code')
      cy.get('#author-input').type('Dan Abramov')
      cy.get('#url-input').type('https://overreacted.io/goodbye-clean-code/')
      cy.get('#create-blog-button').click()

     
      cy.get('#blog-list')
      .should('contain', 'Goodbye, Clean Code')
      .should('contain', 'Dan Abramov')        
    })
  })
})