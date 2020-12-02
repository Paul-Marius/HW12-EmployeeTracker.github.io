USE employee_tracker_db;

INSERT INTO department (id, name)
VALUES
(1, "Management"),
(2, "Human Resources"),
(3, "Quality Control"),
(4, "Engineer"),
(5, "Warehouse");

INSERT INTO role (id, title, salary, department_id)
VALUES
-- How can I choose the department id ???!!
(1, "Regional Manager", 90000, 1),
(2, "HR Representative", 75000, 2),
(3, "HR Generalist", 78000, 2),
(4, "Quality Tester",70000, 3),
(5, "Mechanical Engineer", 62000, 4),
(6, "Electrical Engineer", 65000, 4),
(7, "Warehouse Worker", 40000, 5),
(8, "Workhouse Leader", 50000, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
-- How can I choose the role id and manager id ?????!!
(1, "Michael", "Scott", 8, NULL),
(2, "Pam", "Beesly", 1, 1),
(3, "Ros", "Creap", 7, NULL),
(4, "Jim", "Halpert", 5, NULL),
(5, "Tim", "Toast", 6, NULL),
(6, "Toby", "Flenderson", 5, NULL),
(7, "Lina", "Fletcher", 2, NULL),
(8, "Stanley", "Hudson", 3, 1),
(9, "Darryl", "Philbin", 4, NULL),
(10, "David", "Hos", 2, NULL);