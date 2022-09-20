// Importing necessary classes and setting up variables/constants
const inquirer = require('inquirer');
const consoleTable = require("console.table");
const connection = require('./db/query');

// build question arrays
const initQuestions = [
    {
        type: "list",
        message: "What would you like to do?",
        name: "initSelection",
        choices:[
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an existing employee's role",
        ]
    },
];

const departmentQuestions = [
    {
        type: "input",
        message: "Enter department",
        name: "department_name",
    },
];

// Creating initial function for the app
function initPrompt() {
    inquirer.prompt(initQuestions)
    .then((answers) => {
        switch(answers.initSelection) {
            case "View all departments":
                connection.viewDepartments().then(([rows,fields]) => {
                    console.log(consoleTable.getTable(rows));
                })
                .then(()=> {
                    initPrompt();
                }); 
                break
            case "View all roles":
                connection.viewRoles().then(([rows,fields]) => {
                    console.log(consoleTable.getTable(rows));
                })
                .then(()=> {
                    initPrompt();
                }); 
                break
            case "View all employees":
                connection.viewEmployees().then(([rows,fields]) => {
                    console.log(consoleTable.getTable(rows));
                })
                .then(()=> {
                    initPrompt();
                }); 
                break
            case "Add a department":
                departmentPrompt();
                break
            case "Add a role":
                rolePrompt();
                break
            case "Add an employee":
                employeePrompt();
                break
            case "Update an existing employee's role":
                updateRolePrompt();
                break
        }
    })
}

// functions for adds and updates
function departmentPrompt() {
   inquirer.prompt(departmentQuestions)
   .then((answers) => {
    connection.addDepartment(answers.department_name);
    console.log('department added successfully')
   })
   .then(()=> {
    initPrompt();
}); 
}

function rolePrompt() {
    const departmentChoices = async () => {
        const queryResult = await connection.viewDepartments();
      
        const choices = queryResult[0];
      
        let choiceArray = [];
      
        choices.forEach(element => {
          let inqValues = {
            name: element.department_name,
            value: element.id
          }
          choiceArray.push(inqValues);
        });
      
        return choiceArray;
      }
      
    inquirer.prompt(
        [
            {
                type: "input",
                message: "Enter role title",
                name: "title",
            },
            {
                type: "input",
                message: "Enter salary",
                name: "salary",
            },
            {
                type: "list",
                name: "id",
                message: "Which department does the role belong to?",
                choices: departmentChoices
            },
        ]
    ) 
    .then((answers) => {
        const roleData = [answers.title, answers.salary, answers.id];
        connection.addRole(roleData);
        console.log('role added successfully')
   })
   .then(()=> {
    initPrompt();
    })
}

function employeePrompt() {
    const roleChoices = async () => {
        const queryResult = await connection.viewRoles();
      
        const choices = queryResult[0];
      
        let choiceArray = [];
      
        choices.forEach(element => {
          let inqValues = {
            name: element.title,
            value: element.id
          }
          choiceArray.push(inqValues);
        });
      
        return choiceArray;
      }
      const managerChoices = async () => {
        const queryResult = await connection.viewEmployees();
      
        const choices = queryResult[0];
      
        let choiceArray = [];
      
        choices.forEach(element => {
          let inqValues = {
            name: element.last_name,
            value: element.id
          }
          choiceArray.push(inqValues);
        });
      
        return choiceArray;
      }
      inquirer.prompt(
        [
            {
                type: "input",
                message: "Enter first name of new employee",
                name: "first",
            },
            {
                type: "input",
                message: "Enter last name of new employee",
                name: "last",
            },
            {
                type: "list",
                name: "role",
                message: "What is the new employee's role?",
                choices: roleChoices
            },
            {
                type: "list",
                name: "manager",
                message: "Who is the employee's manager?",
                choices: managerChoices
            },
        ]
    ) 
    .then((answers) => {
        const employeeData = [answers.first, answers.last, answers.role, answers.manager];
        connection.addEmployee(employeeData);
        console.log('employee added successfully')
   })
   .then(()=> {
    initPrompt();
    })
}

function updateRolePrompt() {
    const roleChoices = async () => {
        const queryResult = await connection.viewRoles();
      
        const choices = queryResult[0];
      
        let choiceArray = [];
      
        choices.forEach(element => {
          let inqValues = {
            name: element.title,
            value: element.id
          }
          choiceArray.push(inqValues);
        });
      
        return choiceArray;
      }
      const employeeChoices = async () => {
        const queryResult = await connection.viewEmployees();
      
        const choices = queryResult[0];
      
        let choiceArray = [];
      
        choices.forEach(element => {
          let inqValues = {
            name: element.last_name,
            value: element.id
          }
          choiceArray.push(inqValues);
        });
      
        return choiceArray;
      }
      inquirer.prompt(
        [
           {
                type: "list",
                name: "employee",
                message: "Whose role is changing?",
                choices: employeeChoices
            },
            {
                type: "list",
                name: "role",
                message: "What is their new role?",
                choices: roleChoices
            },
        ]
    ) 
    .then((answers) => {
        const newRoleData = [answers.role, answers.employee];
        connection.updateRole(newRoleData);
        console.log('role updated successfully')
   })
   .then(()=> {
    initPrompt();
    })
}

// initializing the app
initPrompt();
