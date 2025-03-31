// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('login', (userCode, password) => {
  cy.session([userCode, password], () => {
      cy.visit('/login')
      cy.get('#button-form-2').click()
      cy.get('.mx-3').click()
      cy.wait(4000)
      cy.get('#usrcde').type(userCode)
      cy.get('#usrpwd').type(password)
      cy.get('.mt-8 > #login-btn-styled').click()
      cy.wait(2000)
  })
})

Cypress.Commands.add('navigateToModule', (menuSelector, submenuSelector) => {
  cy.contains(menuSelector).click()
  cy.wait(2000)
  cy.contains(submenuSelector).click()
  cy.wait(2000) 
})

Cypress.Commands.add("execute", (command) => {
return cy.task("execute", command);
})