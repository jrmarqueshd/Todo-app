describe('Test App', () => {
  const contentTask = "Text test 1";

  it('Should visit correctly', () => {
    cy.visit('/')

    cy.contains('h1', "Todo App")
  })

  it('Should insert task correctly', () => {
    cy.contains('li.react-tabs__tab', "To-do (0)")
    cy.contains('li.react-tabs__tab', "Done (0)")
    cy.get('input[placeholder="Insert a task"]').type(`${contentTask}{enter}`)
    cy.contains('li', contentTask)
    cy.contains('li.react-tabs__tab', "To-do (1)")
  });

  it('Should next step task correctly', () => {
    cy.get('.icon-check').click()
    cy.contains('li.react-tabs__tab', "To-do (0)")
    cy.contains('p', "To-do section is empty.")
    cy.contains('li.react-tabs__tab', "Done (1)").click();
    cy.contains('li', contentTask)
  });

  it('Should remove task correctly', () => {
    cy.get('.icon-remove').click()
    cy.contains('p', "Done section is empty.")
  });
})