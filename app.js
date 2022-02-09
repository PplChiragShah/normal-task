const express = require("express")
const app = express()

//
app.use(express.static(__dirname + '/dist/chiragshah-todo-angular'));

// define the first route
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/dist/chiragshah-todo-angular/index.html')
})

// start the server listening for requests
app.listen(process.env.PORT || 8080,
    () => console.log("Server is running..."));