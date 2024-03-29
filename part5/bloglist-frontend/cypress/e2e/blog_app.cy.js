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

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
            title: 'Top 5 preguntas de JavaScript en Stack Overflow',
            author: 'Miguel Ángel Durán',
            url: 'https://midu.dev/top-5-preguntas-javascript-stack-overflow/'
          })
      })
      
      it('user can use like button', function() {
        cy.contains('view').click()
        cy.contains('like').click()

        cy.get('html').should('contain', '1')
      })

      it('the user who created the blog can delete it', function() {
        cy.contains('view').click()
        cy.contains('remove').click()

        cy.get('#blog-list').should('not.contain', 'Top 5 preguntas de JavaScript en Stack Overflow')
      })

      it('only the creator can see the delete button', function () {
        cy.createUser({
          name: 'Miles Davis', 
          username: 'miles',
          password: 'miles99'
        })
        cy.login({ username: 'miles', password: 'miles99' })
        cy.contains('view').click()

        cy.get('#blog-list').should('not.contain', 'remove')
      })

      it('The blogs are ordered from highest to lowest according to the number of likes', function() {
        cy.createBlog({
          title: 'toReversed, toSpliced, toSorted y with. Nuevos métodos de Array en JavaScript explicados',
          author: 'Miguel Ángel Durán',
          url: 'https://midu.dev/to-reversed-to-spliced-to-sorted-with/'
        })
        cy.createBlog({
          title: 'Desactivar reglas de eslint',
          author: 'Miguel Ángel Durán',
          url: 'https://midu.dev/desactivar-reglas-eslint/'
        })
        cy.get('.blog button').eq(2).click()
        cy.contains('like').click()

        cy.get('.blog').eq(0).should('contain', 'Desactivar reglas de eslint')
        cy.get('.blog').eq(0).should('contain', '1')
      })
    })
  })
})