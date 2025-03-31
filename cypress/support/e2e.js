import './commands'

Cypress.Screenshot.defaults({
    overwrite: true,
})



// Alternatively you can use CommonJS syntax:
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})