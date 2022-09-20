const connection = require('../config/connection')

class Query {
  constructor(connection){
    this.connection = connection;
  }
  addDepartment(department){
    return this.connection.promise().query('INSERT INTO department (department_name) VALUES (?)',department);
  }
  addRole(roleData){
    return this.connection.promise().query('INSERT INTO role (title,salary,department_id) VALUES (?,?,?)',roleData);
  }
  addEmployee(employeeData){
    return this.connection.promise().query('INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)',employeeData);
  }
  updateRole(newRoleData){
    return this.connection.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', newRoleData);
  }
  viewDepartments(){
    return this.connection.promise().query('SELECT * FROM department');
  }
  viewRoles(){
    return this.connection.promise().query(
      `SELECT role.title, role.id, role.salary, department.department_name
       FROM role
       LEFT JOIN department
       On role.department_id = department.id`);
  }
  viewEmployees(){
    return this.connection.promise().query(
      `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name, CONCAT(mngr.first_name,' ',mngr.last_name) AS Manager 
       FROM employee
       LEFT JOIN employee AS mngr
       ON employee.manager_id = mngr.id
       INNER JOIN role
       ON employee.role_id = role.id
       LEFT JOIN department
       ON role.department_id = department.id`);
  }
}

module.exports = new Query(connection);