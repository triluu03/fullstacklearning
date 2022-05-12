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

	describe('When logged in', function() {
		beforeEach(function() {
			cy.get('#username').type('triluu03')
			cy.get('#password').type('password')
			cy.contains('login').click()
			cy.contains('Luu Duc Tri logged in')
		})

		it('A blog can be created', function() {
			cy.contains('create new blog').click()
			cy.get('.titleInput').type('A blog added by cypress')
			cy.get('.authorInput').type('Mr.Tester')
			cy.get('.urlInput').type('Not available')
			cy.contains('save').click()

			cy.get('.error')
				.should('contain', 'a new blog "A blog added by cypress" by Mr.Tester added')
		})

		it('Users can like a blog', function() {
			cy.contains('create new blog').click()
			cy.get('.titleInput').type('A blog added by cypress')
			cy.get('.authorInput').type('Mr.Tester')
			cy.get('.urlInput').type('Not available')
			cy.contains('save').click()

			cy.contains('view').click()
			cy.contains('like').click()
			cy.contains('likes: 1')
		})

		it('The creator of the blog can delete it', function() {
			cy.contains('create new blog').click()
			cy.get('.titleInput').type('A blog added by cypress')
			cy.get('.authorInput').type('Mr.Tester')
			cy.get('.urlInput').type('Not available')
			cy.contains('save').click()

			cy.contains('view').click()
			cy.contains('remove').click()
			cy.get('html').should('not.contain', '"A blog added by cypress" by Mr.Tester')
		})
	})
})