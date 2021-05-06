describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Ada Lovelace',
      username: 'adalove',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input[name="Username"]').type('adalove')
      cy.get('input[name="Password"]').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Ada Lovelace is logged in')
      cy.get('.notification').should(
        'contain',
        'Hello Ada Lovelace! You have succesfully logged in.'
      )
      cy.get('.notification').should('contain.css', 'color', 'rgb(0, 128, 0)')
    })

    it('fails with wrong credentials', function () {
      cy.get('input[name="Username"]').type('adalove')
      cy.get('input[name="Password"]').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'Wrong username or password.')
      cy.get('.error').should('contain.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('input[name="Username"]').type('adalove')
      cy.get('input[name="Password"]').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Ada Lovelace is logged in')
    })

    it('A blog can be created', function () {
      const blog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
      }

      cy.contains('Add new blog').click()

      cy.get('input[name="Title"]').type(blog.title)
      cy.get('input[name="Author"]').type(blog.author)
      cy.get('input[name="Url"]').type(blog.url)
      cy.contains(/^Add$/).click()
      cy.contains(blog.title)
    })
  })
})
