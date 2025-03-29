
import './commands'
import 'cypress-mochawesome-reporter/register';
import "cypress-real-events";
import "cypress-xpath";
import addContext from 'mochawesome/addContext'



Cypress.Screenshot.defaults({
    overwrite: true,
})



// Alternatively you can use CommonJS syntax:
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})