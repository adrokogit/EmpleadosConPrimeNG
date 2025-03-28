/// <reference types="cypress" />
/**
 * @file employeeE2ETests.cy.js
 * @author Adrián Fernández Álvarez
 * @description This file tests the Employees app using Cypress
 * @version 1.0.0
 * @since 28/03/2025
 */

describe('Testing e2e for Employees app', () => {
  beforeEach(() => {
    cy.visit('localhost:4200/');
  })

  it('Shows de menubar', () => {
    cy.get('.p-menuitem-link').should('have.length', 3);
    cy.get('.p-menuitem-link').eq(0).should('have.text', 'Activos');
    cy.get('.p-menuitem-link').eq(1).should('have.text', 'Nuevo');
    cy.get('.p-menuitem-link').eq(2).should('have.text', 'Inactivos');


  })

  it('Shows h2 from first page', () => {
    cy.get('h2').should('have.text', 'Empleados Activos');
  })

  it('Shows table headers', () => {
    cy.get('th').eq(0).should('have.text', 'Nombre');
    cy.get('th').eq(1).should('have.text', 'Apellidos')
    cy.get('th').eq(2).should('have.text', 'Email')
    cy.get('th').eq(3).should('have.text', 'Salario')
    cy.get('th').eq(4).should('have.text', 'Fecha de Nacimiento')
  })

  it('Shows table rows', () => {
    cy.get('tr').eq(0).get('td').eq(0).should('have.text', 'Name38');
    cy.get('tr').eq(0).get('td').eq(1).should('have.text', 'Lastname38');
    cy.get('tr').eq(0).get('td').eq(2).should('have.text', 'email38@test.com');
    cy.get('tr').eq(0).get('td').eq(3).should('have.text', '5,800€');
    cy.get('tr').eq(0).get('td').eq(4).should('have.text', '10/02/1998');

    cy.get('tr').eq(1).within(() => {
      cy.get('td').eq(5).within(() => {
        cy.get('p-button').should('have.length', 2);
      });
    });
  })


  it('Navigates to inactive page by menubar',() => {
    cy.get('.p-menuitem-link').eq(2).click();
    cy.get('h2').should('have.text', 'Empleados Inactivos');   
  });


  it('Navigates to creation page by menubar',() => {
    cy.get('.p-menuitem-link').eq(1).click();
    cy.contains('Crear Empleado').should('exist'); 
  });


  it('Inactivates a user',() => {
    //Looks for the inactivation button from Name38 and clicks it
    cy.get('tr').eq(1).within(() => {
      cy.get('td').eq(5).within(() => {
        cy.get('p-button').eq(1).click();
      });
    });
    //Checks if Name38 is not in the active table
    cy.get('tr').eq(0).get('td').eq(0).should('not.have.text', 'Name38');

    //Navigates to inactive page
    cy.get('.p-menuitem-link').eq(2).click();
    cy.get('h2').should('have.text', 'Empleados Inactivos');   

    //Checks if Name38 is in the inactive table
    cy.contains('Name38').should('exist');
    
  });

})
