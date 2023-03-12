const app = require("express")()

app.use("/cowshed", require('./cowshed'))
app.use("/user",require('./user'))
module.exports = app;