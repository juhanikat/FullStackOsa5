describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username:"cypress",
      password:"cypress"
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.visit('http://localhost:3000') // this needs to be repeated or test fails for some reason
      cy.get('#username').type('cypress')
      cy.get('#password').type('cypress')
      cy.contains('Login').click()

      cy.contains('User cypress logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('cypress')
      cy.get('#password').type('nah')
      cy.contains('Login').click()

      cy.contains('invalid username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', { 
        username: 'cypress', password: 'cypress'   
      }).then(response => {  
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))    
        cy.visit('http://localhost:3000')    
      })
    })

    it('A blog can be created', function() {
      cy.contains('Create Blog').click()
      cy.get("#title").type('cypress')
      cy.get("#author").type('is')
      cy.get("#url").type('fun')
      cy.contains("add").click()

      cy.get('.blogsDiv').contains("cypress is")
    })

    describe('when blog is created', function() {
      beforeEach(function() {
        cy.contains('Create Blog').click()
        cy.get("#title").type('cypress')
        cy.get("#author").type('is')
        cy.get("#url").type('fun')
        cy.contains("add").click()
      })

      it('it can be liked', function() {
        cy.contains('View').click()
        cy.contains('Like').click()
        cy.contains('Likes: 1')
      })
      
      it('it can be removed by user who created it', function() {
        cy.contains('View').click({force:true})
        cy.contains('Remove').click({force:true})
        cy.wait(500)
        cy.get('.blogsDiv').contains("cypress is").should('not.exist')
      })

      it('only the user who created the blog sees the Remove button', function() {
        cy.contains('View').click({force:true})
        cy.contains('Remove')
        const user2 = {
          username:"cypress2",
          password:"cypress2"
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user2) 

        cy.request('POST', 'http://localhost:3003/api/login', { 
        username: 'cypress2', password: 'cypress2'   
      }).then(response => {  
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))    
        cy.visit('http://localhost:3000')    
      })
      cy.contains('View').click({force:true})
      cy.contains('Remove').should('not.exist')
      })
    })

    
  })

  
})
