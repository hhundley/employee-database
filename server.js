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
const roleQuestions = [
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
        type: "input",
        message: "Enter department",
        name: "department_id",
    },
];
const employeeQuestions = [
    {
        type: "input",
        message: "Enter first name",
        name: "first_name",
    },
    {
        type: "input",
        message: "Enter last name",
        name: "last_name",
    },
    {
        type: "input",
        message: "Enter role",
        name: "role_id",
    },
    {
        type: "input",
        message: "Enter manager",
        name: "manager_id",
    },
];

const employeeRoleQuestions = [
    {
        type: "input",
        message: "Enter new role",
        name: "role_id",
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
                addDepartment();
                break
            case "Add a role":
                addRole();
                break
            case "Add an employee":
                addEmployee();
                break
            case "Update an existing employee's role":
                updateRole();
                break
        }
    })
}

function departmentPrompt() {
   
}

function rolePrompt() {
   
}

function employeePrompt() {
   
}

function updateRolePrompt() {
   
}

initPrompt();