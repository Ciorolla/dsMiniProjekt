//zmienne, stałe

var express = require("express")
var app = express()
var PORT = process.env.PORT || 3000;
var path = require("path")
var formidable = require('formidable');
var bodyParser = require("body-parser");
let idd = 5
let logged = 0
let order = "1"
var users = [
    { id: 1, login: "aaa", password: "aaa", age: 10, student: "on", gender: "M" },
    { id: 2, login: "bbb", password: "bbb", age: 14, student: "", gender: "M" },
    { id: 3, login: "ccc", password: "ccc", age: 20, student: "on", gender: "F" },
    { id: 4, login: "ddd", password: "ddd", age: 11, student: "", gender: "F" }
]


//funkcje na serwerze obsługujące konkretne adresy
//w przeglądarce
app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/main", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/main.html"));
})
app.get("/register", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/register.html"));
})
app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/login.html"));
})
app.get("/admin", function (req, res) {
    if (logged == 1) {
        res.sendFile(path.join(__dirname + "/static/admin2.html"));
    }
    else {
        res.sendFile(path.join(__dirname + "/static/admin1.html"));
    }


})

app.get("/logout", function (req, res) {
    logged = 0
    res.redirect("/admin");
})

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/main.html"));
})

app.get("/show", function (req, res) {
    if (logged == 1) {
        users.sort(function (a, b) {
            return parseInt(a.id) - parseInt(b.id);
        });

        var tableString = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="css/style.css">
            <title>Document</title>

            </head>
            <body>


            <div class="header2">

        <div>

            <a href="/show">show</a>
            <a href="/gender">gender</a>
            <a href="/sort">sort</a>


        </div>

        </div>

            <table>`
        for (i = 0; i < users.length; i++) {

            tableString = tableString + "<tr>"
            for (j = 0; j < 6; j++) {
                tableString = tableString + "<td>"
                if (j == 0) {
                    tableString = tableString + "id: " + users[i].id.toString()
                }
                else if (j == 1) {
                    tableString = tableString + "log: " + users[i].login.toString()
                }
                else if (j == 2) {
                    tableString = tableString + "pass: " + users[i].password.toString()
                }
                else if (j == 3) {
                    tableString = tableString + "age: " + users[i].age.toString()
                }
                else if (j == 4) {
                    if (users[i].student == "on") {
                        tableString = tableString + "student: " + users[i].student.toString()
                    }
                }
                else if (j == 5) {
                    tableString = tableString + "gender: " + users[i].gender.toString()
                }

                tableString = tableString + "</td>"
            }
            tableString = tableString + "</tr>"
        }
        console.log()
        tableString = tableString + `</table></body></html>`


            ;
        res.send(tableString)
    }
    else {
        res.sendFile(path.join(__dirname + "/static/admin1.html"));
    }

})


app.post('/handleRegister', function (req, res) {
    var obj = req.body
    var flag = 0
    console.log(req.body);
    for (i = 0; i <= users.length; i++) {


        if (i == users.length) {
            flag = 1
        }
        else if (users[i].login == obj.login) {

            break
        }


    }
    if (flag == 1) {
        obj.id = idd
        users.push(obj)
        idd = idd + 1
        console.log(users)
        res.send("udało ci się zarejestrować")
    }
    else {
        console.log("równe")
        res.send("nie udało ci się zarejestrować")
    }


});



app.get("/gender", function (req, res) {

    if (logged == 1) {
        users.sort(function (a, b) {
            var textA = a.gender;
            var textB = b.gender;
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });



        var tableString = `
    <!DOCTYPE html>
        <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="css/style.css">
            <title>Document</title>

            </head>
            <body>
            


            <div class="header2">

        <div>

            <a href="/show">show</a>
            <a href="/gender">gender</a>
            <a href="/sort">sort</a>


        </div>

    </div>

            <table>`
        for (i = 0; i < users.length; i++) {

            tableString = tableString + "<tr>"
            for (j = 0; j < 6; j++) {
                tableString = tableString + "<td>"
                if (j == 0) {
                    tableString = tableString + "id: " + users[i].id.toString()
                }
                else if (j == 1) {
                    tableString = tableString + "log: " + users[i].login.toString()
                }
                else if (j == 2) {
                    tableString = tableString + "pass: " + users[i].password.toString()
                }
                else if (j == 3) {
                    tableString = tableString + "age: " + users[i].age.toString()
                }
                else if (j == 4) {
                    if (users[i].student == "on") {
                        tableString = tableString + "student: " + users[i].student.toString()
                    }
                }
                else if (j == 5) {
                    tableString = tableString + "gender: " + users[i].gender.toString()
                }

                tableString = tableString + "</td>"
            }
            tableString = tableString + "</tr>"
        }
        console.log()
        tableString = tableString + `</table></body></html>`


            ;
        res.send(tableString)
    }

    else {
        res.sendFile(path.join(__dirname + "/static/admin1.html"));
    }
})

app.get("/sort", function (req, res) {
    if (logged == 1) {
        //console.log(order)
        if (order.toString() == "1") {
            users.sort(function (a, b) {
                return parseInt(a.age) - parseInt(b.age);
            });

        }
        else if (order.toString() == "2") {
            users.sort(function (a, b) {
                return parseInt(b.age) - parseInt(a.age);
            });

        }
        var tableString = `
    <!DOCTYPE html>
        <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="css/style.css">
            <title>Document</title>

            </head>
            <body>
            

            <div class="header2">

        <div>

            <a href="/show">show</a>
            <a href="/gender">gender</a>
            <a href="/sort">sort</a>


        </div>

    </div>
    <div>
                        <label>sortType</label>
                        <div>
                        <form onchange="this.submit()"method="POST" action="/handleSort" enctype="application/x-wwwform-urlencoded" ><div>
                                <input type="radio" name="orderr" value="1" required><label>ascending</label>
                            </div>
                            <div>
                                <input type="radio" name="orderr" value="2" required><label>descending</label>
                            </div>
                        </div></form>
                    </div>

            <table>`
        for (i = 0; i < users.length; i++) {

            tableString = tableString + "<tr>"
            for (j = 0; j < 6; j++) {
                tableString = tableString + "<td>"
                if (j == 0) {
                    tableString = tableString + "id: " + users[i].id.toString()
                }
                else if (j == 1) {
                    tableString = tableString + "log: " + users[i].login.toString()
                }
                else if (j == 2) {
                    tableString = tableString + "pass: " + users[i].password.toString()
                }
                else if (j == 3) {
                    tableString = tableString + "gender: " + users[i].gender.toString()
                }
                else if (j == 4) {
                    if (users[i].student == "on") {
                        tableString = tableString + "student: " + users[i].student.toString()
                    }
                }
                else if (j == 5) {
                    tableString = tableString + "age: " + users[i].age.toString()
                }

                tableString = tableString + "</td>"
            }
            tableString = tableString + "</tr>"
        }
        console.log()
        tableString = tableString + `</table></body></html>`


            ;
        res.send(tableString)
    }
    else {
        res.sendFile(path.join(__dirname + "/static/admin1.html"));
    }
})


app.post('/handleSort', function (req, res) {
    console.log(req.body)
    order = req.body.orderr
    console.log(order)
    res.redirect("/sort")


});











app.post('/handleRegister', function (req, res) {
    var obj = req.body
    var flag = 0
    console.log(req.body);
    for (i = 0; i <= users.length; i++) {


        if (i == users.length) {
            flag = 1
        }
        else if (users[i].login == obj.login) {

            break
        }


    }
    if (flag == 1) {
        obj.id = idd
        console.log(obj)
        if (obj.student != "on") {
            console.log("wykonane")
            obj.student = " "
            console.log(obj)
        }
        users.push(obj)
        idd = idd + 1
        console.log(users)
        res.send("udało ci się zarejestrować")
    }
    else {
        console.log("równe")
        res.send("nie udało ci się zarejestrować")
    }


});



app.post('/handleLogin', function (req, res) {
    var log = req.body
    var flag = 0
    console.log(req.body);
    for (i = 0; i < users.length; i++) {


        if (log.login == users[i].login && log.password == users[i].password) {
            flag = 1
        }

    }
    if (flag == 1) {
        console.log("udało się")
        logged = 1
        res.redirect("/admin")
    }
    else {
        console.log("nie udało się")
        res.send("nie udało ci się zalogować")
    }


});



app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
//nasłuch na określonym porcie



