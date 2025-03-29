describe('Cristel Activity', () => {

  let assertionResults = [] //dito ni-store ang results ng assertion (failed or passed)
  beforeEach(() => {
    cy.login('lstv', 'lstventures')
  })

  it.only('Verify Duplicate Data', () => {

    cy.navigateToModule('Master File', 'Item Classifications')

    cy.get('#add-button-styled').click()

    cy.get('#itmcladsc').type('Food')

    cy.get('#button-form-2').click()

    cy.wait(500)

    cy.get('body').then(($body) => {

      if ($body.text().includes('Duplicate entry! Kindly check your inputs.')) {  // check kung nag show yung
                                                                                  // validation message 
        cy.log('Passed: Prevent to enter duplicate data.')                        
                                                                                // if di nag show, failed
        cy.get('#itm-class-section').screenshot()                               // if nag show, passed                            

        cy.wait(2000)

        cy.get('#button-form-1').click()

        cy.get('#warning-button-2').click()
      
      } else {

        cy.log('Failed: Allow to enter duplicate data.')

      }
    })
  })

  it.only('Verify Used Data Cannot Be Deleted', () => {

    cy.get('tbody tr').eq(0).find('td').eq(1).invoke('text').then((text) => { // kunin yung  text sa first row, second column
      
      if (text === 'Food') {                                                  // check kung equal sa 'Food' yung text

        cy.get('tbody tr').eq(0).within(() => {                               // within the first row, click the delete icon

          cy.get('[data-icon="delete"][aria-hidden="true"]').click()

        })

        cy.get('#del-modal-div').should('be.visible')

        cy.wait(2000)

        cy.get('#button-form-2').click()

        cy.get('body').then(($body) => {

          if ($body.text().includes(`"${text}" is already in use. Unable to delete.`)) {

            cy.log('Passed: Prevent to delete used data.')

            cy.get('#itm-class-section').screenshot()

          } else {
            cy.get('#\\32').invoke('text').then((validationMsg) => {

              cy.log(validationMsg)
            })

            cy.log('Failed: Allow to delete used data.')
            
          }
        })
      }
    })
  })

  it.only('Verify Data in The Item Classifications Table', () => {
    cy.wait(4000)

    let actualItemClass = []

    cy.get('tbody tr td:nth-child(2)').each(($row) => {
      
      actualItemClass.push($row.text().trim()) 

      }).then(() => {

      cy.fixture('item-class-data.json').then((data) => {

        const expectedItemClass = data.map(item => item.itemClass)

        cy.log(`Actual: ${actualItemClass}`)
        cy.log(`Expected: ${expectedItemClass}`)

        if (JSON.stringify(actualItemClass) === JSON.stringify(expectedItemClass)) {

          cy.log('Passed: Data in the Item Classifications Table is correct.')
          assertionResults.push({"data" : "passed"})
          
        } else {

          cy.log('Failed: Data in the Item Classifications Table is incorrect.')
          assertionResults.push({"data" : "failed"})

        }
      })
    })
    cy.wait(4000)

    cy.writeFile('cypress/fixtures/assertion-results.json', assertionResults)

    cy.fixture('assertion-results.json').then((data) => {

      for (let key in data) {

        cy.wrap(data[key].data).should('not.contain', 'failed')

      }
    })
  })
})