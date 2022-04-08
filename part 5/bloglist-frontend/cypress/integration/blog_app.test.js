describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Luu Duc Tri',
            username: 'triluu03',
            password: 'password'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('username')
        cy.contains('password')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('triluu03')
            cy.get('#password').type('password')
            cy.contains('login').click()

            cy.contains('Luu Duc Tri logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('triluu03')
            cy.get('#password').type('hello')
            cy.contains('login').click()

            cy.get('.error')
                .should('contain', 'wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })
})