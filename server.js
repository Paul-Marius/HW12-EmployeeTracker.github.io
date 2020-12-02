// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

// Connection Properties
const connectionProperties = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_tracker_db"
}
// Creating Connection
const connection = mysql.createConnection(connectionProperties);

// Establishing Connection to database
connection.connect(function (err) {
    if (err) throw err;
    console.log("\n WELCOME TO EMPLOYEE TRACKER \n");

    // main();
});

// Inquirer prompt and promise
const main = function () {
    inquirer.prompt({
        type: "list",
        name: "mainChoice",
        message: "What would you like to choose?",
        choices: [
            "View all employees",
            "View all employees by role",
            "View all employees by department",
            "Add employee",
            "Add role",
            "Add department",
            "Update employee role",
            "Remove employee"
        ]
    })
        .then(function (answer) {
            console.log(answer);
            // Switch case depending on user option
            switch (answer.mainChoice) {
                case "View all employees":
                    viewAllEmp();
                    break;
                case "View all employees by role":
                    viewAllEmpByRole();
                    break;
                case "View all employees by department":
                    viewAllEmpByDept();
                    break;

                case "Add employee":
                    addEmp();
                    break;
                case "Add role":
                    addRole();
                    break;
                case "Add department":
                    addDept();
                    break;

                case "Update employee role":
                    updateEmpRole();
                    break;
            }

        });
};
main();

// Allows user to view all departments currently in the database
function viewAllEmpByDept() {
    connection.query("SELECT * FROM department", function (err, answer) {
        console.log("\n Departments Retrieved from Database \n");
        console.table(answer);
    });
    main();
}

// Allows user to view all employee roles currently in the database
function viewAllEmpByRole() {
    connection.query("SELECT * FROM role", function (err, answer) {
        console.table(answer);
        console.log("\n Roles Retrieved from Database \n");

    });
    main();
}

// Allows user to view all employees currently in the database
function viewAllEmp() {
    console.log("retrieving employess from database");
    // Query to view all employees
    var allEmpQuery =
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;";
    connection.query(allEmpQuery, function (err, answer) {
        console.table(answer);
        console.log("\n Employees retrieved from Database \n");

    });
    main();
}

// Allows user to add a new employee to database
function addEmp() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter employee first name:",
            name: "firstname"
        },
        {
            type: "input",
            message: "Enter employee last name:",
            name: "lastname"
        }
    ])
        .then(function (answer) {
            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: answer.firstname,
                    last_name: answer.lastname,
                    role_id: null,
                    manager_id: null
                },
                function (err, answer) {
                    if (err) {
                        throw err;
                    }
                    console.table(answer);
                }
            );
            main();
        });
}

// grabs all employees (id, first name, last name) and then allows user to select employee to update role
function updateEmpRole() {
    let allEmp = [];
    connection.query("SELECT * FROM employee", function (err, answer) {
        console.log(answer);

        for (let i = 0; i < answer.length; i++) {
            let employeeString =
                answer[i].id + " " + answer[i].first_name + " " + answer[i].last_name;
            allEmp.push(employeeString);
        }
        console.log(allEmp);

        inquirer.prompt([
            {
                type: "list",
                name: "updateEmpRole",
                message: "Select employee to update role:",
                choices: allEmp
            },
            {
                type: "list",
                message: "Select new role",
                choices: ["manager", "employee"],
                name: "newrole"
            }
        ])
            .then(function (answer) {
                console.log("about to update", answer);

                const idToUpdate = {};
                idToUpdate.employeeId = parseInt(answer.updateEmpRole.split(" ")[0]);
                if (answer.newrole === "manager") {
                    idToUpdate.role_id = 1;
                } else if (answer.newrole === "employee") {
                    idToUpdate.role_id = 2;
                }
                connection.query("UPDATE employee SET role_id = ? WHERE id = ?",
                    [idToUpdate.role_id, idToUpdate.employeeId],
                    function (err, data) {
                        main();
                    }
                );
            });
    });
}

// Allows user to add a new department into the database
function addDept() {
    inquirer.prompt({
        type: "input",
        message: "Enter department name:",
        name: "department"
    })
        .then(function (answer) {
            connection.query("INSERT INTO department SET ?",
                {
                    name: answer.department
                },
                function (err, answer) {
                    if (err) {
                        throw err;
                    }
                }
            ),
                console.table(answer);
                main();
        });
}

// Allows user to add a new role/title
function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter employee title",
            name: "addtitle"
        },
        {
            type: "input",
            message: "Enter employee salary",
            name: "addsalary"
        },
        {
            type: "input",
            message: "Enter employee department id",
            name: "addDepId"
        }
    ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.addtitle,
                    salary: answer.addsalary,
                    department_id: answer.addDepId
                },
                function (err, answer) {
                    if (err) {
                        throw err;
                    }
                    console.table(answer);
                }
            );
            main();
        });
}
