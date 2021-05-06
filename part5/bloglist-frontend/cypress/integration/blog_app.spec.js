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
})
