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
    checkRowData(0,'Name38','Lastname38','email38@test.com','5,800€','10/02/1998');
    checkRowData(1,'Name36','Lastname36','email36@test.com','5,600€','08/12/1995');
    checkRowData(2,'Name34','Lastname34','email34@test.com','5,400€','06/10/1994');
    checkRowData(3,'Name32','Lastname32','email32@test.com','5,200€','04/08/1992');



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

  it('Activates a user',() => {
    //Navigates to inactive page
    cy.get('.p-menuitem-link').eq(2).click();
    cy.get('h2').should('have.text', 'Empleados Inactivos'); 

    //Looks for the activation button from Name38 and clicks it
    cy.get('tr').eq(1).within(() => {
      cy.get('td').eq(5).within(() => {
        cy.get('p-button').eq(1).click();
      });
    });
    //Checks if Name39 is not in the active table
    cy.get('tr').eq(0).get('td').eq(0).should('not.have.text', 'Name39');

    //Navigates to inactive page
    cy.get('.p-menuitem-link').eq(0).click();
    cy.get('h2').should('have.text', 'Empleados Activos');   

    //Checks if Name39 is in the inactive table
    cy.contains('Name39').should('exist');
    
  });

  it('Modify a user from active page',() => {
    //Looks for the inactivation button from Name38 and clicks it
    cy.get('tr').eq(1).within(() => {
      cy.get('td').eq(5).within(() => {
        cy.get('p-button').eq(0).click();
      });
    });

    //Checks if it navigated to modfying page
    cy.contains('Modificar Empleado').should('exist'); 

    //Modifies the user
    fillEmployeeForm('Name38Modified','Lastname38Modified', 'email38Modified@test.com', '1234', '01/01/1001','noChange');
    cy.get('p-button').click();

    //Check if it navigated to active page
    cy.get('h2').should('have.text', 'Empleados Activos');

    //Check changes
    checkRowData(0,'Name38Modified','Lastname38Modified','email38Modified@test.com','1,234€','01/01/1001');

  });

  it('Modify a user from active page and changing user to inactive',() => {
    //Looks for the inactivation button from Name38 and clicks it
    cy.get('tr').eq(1).within(() => {
      cy.get('td').eq(5).within(() => {
        cy.get('p-button').eq(0).click();
      });
    });

    //Checks if it navigated to modfying page
    cy.contains('Modificar Empleado').should('exist'); 

    //Modifies the user
    fillEmployeeForm('Name38Modified','Lastname38Modified', 'email38Modified@test.com', '1234', '01/01/1001','inactive');
    
    cy.get('p-button').click();

    //Check if it navigated to inactive page
    cy.get('h2').should('have.text', 'Empleados Inactivos');

    //Check changes
    checkRowData(1,'Name38Modified','Lastname38Modified','email38Modified@test.com','1,234€','01/01/1001');

  });

  it('Modify a user from inactive page',() => {
    //Navigates to inactive page
    cy.get('.p-menuitem-link').eq(2).click();
    cy.get('h2').should('have.text', 'Empleados Inactivos'); 
  
    //Looks for the inactivation button from Name39 and clicks it
    cy.get('tr').eq(1).within(() => {
      cy.get('td').eq(5).within(() => {
        cy.get('p-button').eq(0).click();
      });
    });
  
    //Checks if it navigated to modfying page
    cy.contains('Modificar Empleado').should('exist'); 
  
    //Modifies the user
    fillEmployeeForm('Name39Modified','Lastname39Modified', 'email39Modified@test.com', '1234', '01/01/1001','noChange');
    cy.get('p-button').click();
  
    //Check if it navigated to inactive page
    cy.get('h2').should('have.text', 'Empleados Inactivos');
  
    //Check changes
    checkRowData(0,'Name39Modified','Lastname39Modified','email39Modified@test.com','1,234€','01/01/1001');
  
  });

  it('Modify a user from inactive page and changing user to inactive',() => {
    //Navigates to inactive page
    cy.get('.p-menuitem-link').eq(2).click();
    cy.get('h2').should('have.text', 'Empleados Inactivos'); 

    //Looks for the inactivation button from Name39 and clicks it
    cy.get('tr').eq(1).within(() => {
      cy.get('td').eq(5).within(() => {
        cy.get('p-button').eq(0).click();
      });
    });

    //Checks if it navigated to modfying page
    cy.contains('Modificar Empleado').should('exist'); 

    //Modifies the user
    fillEmployeeForm('Name39Modified','Lastname39Modified', 'email39Modified@test.com', '1234', '01/01/1001','active');
    
    cy.get('p-button').click();

    //Check if it navigated to active page
    cy.get('h2').should('have.text', 'Empleados Activos');

    //Check changes
    checkRowData(0,'Name39Modified','Lastname39Modified','email39Modified@test.com','1,234€','01/01/1001');

  });

  it('Creates an active user',() => {
    //Navigates to new employee page
    cy.get('.p-menuitem-link').eq(1).click();
    cy.contains('Crear Empleado').should('exist'); 

    //Create the user
    fillEmployeeForm('newName','newLastname', 'newEmail@test.com', '1234', '01/01/1001','active');
    cy.get('p-button').click();

    //Check if it navigated to active page
    cy.get('h2').should('have.text', 'Empleados Activos');

    //Check changes
    checkRowData(0,'newName','newLastname','newEmail@test.com','1,234€','01/01/1001');

  });

  it('Creates an inactive user',() => {
    //Navigates to new employee page
    cy.get('.p-menuitem-link').eq(1).click();
    cy.contains('Crear Empleado').should('exist'); 

    //Create the user
    fillEmployeeForm('newName','newLastname', 'newEmail@test.com', '1234', '01/01/1001','nochange');
    cy.get('p-button').click();

    //Check if it navigated to active page
    cy.get('h2').should('have.text', 'Empleados Inactivos');

    //Check changes
    checkRowData(0,'newName','newLastname','newEmail@test.com','1,234€','01/01/1001');

  });

  it('Shows validation errors',() => {
    //Navigates to new employee page
    cy.get('.p-menuitem-link').eq(1).click();
    cy.contains('Crear Empleado').should('exist'); 

    //Empty fields
    cy.get('p-selectbutton').within(() => {
      cy.contains('Inactivo').click();
    });
    cy.get('input').eq(0).clear();
    cy.get('input').eq(1).clear();
    cy.get('input').eq(2).clear();
    cy.get('input').eq(3).clear();
    cy.get('input').eq(4).clear();
    cy.get('p-button').click();

    //Check if it shows the errors
    cy.contains('El campo nombre es obligatorio').should('exist');
    cy.contains('El campo apellidos es obligatorio').should('exist');
    cy.contains('El campo email es obligatorio').should('exist');
    cy.contains('El campo salario es obligatorio').should('exist');
    cy.contains('La fecha de nacimiento es obligatoria').should('exist');
    cy.contains('Escoja una opción').should('exist');

    //Specific errors
    fillEmployeeForm(' ',' ', 'newEmail', '-4', '01/01/3000','nochange');
    cy.get('p-button').click();

    //Check if it shows the errors
    cy.contains('El email no es válido').should('exist');
    cy.contains('El salario debe ser mayor o igual a 0').should('exist'); 
    cy.contains('La fecha de nacimiento debe ser anterior a hoy').should('exist');
  });
})

/**
 * Fills the employee form with the given parameters
 * @param {String} name
 * @param {String} lastname
 * @param {String} email
 * @param {String} salary
 * @param {String} birthdate
 * @param {'active' | 'inactive' | 'noChange'} active
 */
function fillEmployeeForm(name, lastname, email, salary, birthdate, active){
  cy.get('input').eq(0).clear().type(name);
  cy.get('input').eq(1).clear().type(lastname);
  cy.get('input').eq(2).clear().type(email);
  cy.get('input').eq(3).clear().type(salary);
  cy.get('input').eq(4).clear().type(birthdate);

  switch(active){
    case 'active':
      cy.get('p-selectbutton').within(() => {
        cy.contains('Activo').click();
      });
      break;
    case 'inactive':
      cy.get('p-selectbutton').within(() => {
        cy.contains('Inactivo').click();
      });
      break;
    default:
      break;
  } 
}

/**
 * Checks if the row has the given data
 * @param {Number} row 
 * @param {String} name 
 * @param {String} lastname 
 * @param {String} email 
 * @param {String} salary 
 * @param {String} birthdate 
 */
function checkRowData(row, name, lastname, email, salary, birthdate){
  cy.get('tr').eq(row).get('td').eq(0+row*6).should('have.text', name);
  cy.get('tr').eq(row).get('td').eq(1+row*6).should('have.text', lastname);
  cy.get('tr').eq(row).get('td').eq(2+row*6).should('have.text', email);
  cy.get('tr').eq(row).get('td').eq(3+row*6).should('have.text', salary);
  cy.get('tr').eq(row).get('td').eq(4+row*6).should('have.text', birthdate);
}