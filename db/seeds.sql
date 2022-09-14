INSERT INTO department (department_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Operations");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 70000, 1),
       ("Engineer", 100000, 2),
       ("Financial Analyst",50000, 3),
       ("Operations", 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Makoto", "Naegi", 2, NULL),
       ("Chiaki", "Nanami", 2, 1),
       ("Kyoko", "Kirigiri", 3, 1),
       ("Nagito", "Komaeda", 4, 1);