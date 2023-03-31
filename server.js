const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const http = require("http")
const cors = require("cors")
const path = require("path")
require('dotenv').config()
const config=require("./app/config/index")
const { connections } = require('./app/config/database')
//const swagger = require("./swaggerDocs");

app.set('views', path.join(__dirname, '/app/templates'))
app.set('view engine', 'ejs')
//app.use(swagger)
app.use(express.static(__dirname))
app.use(cors())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
   res.setHeader("Access-Control-Allow-Credentials", true);
   next();
})
app.use(bodyParser.json({ limit: "2mb" }))
app.use(bodyParser.urlencoded({ extended: true }))

const httpServer = http.createServer(app.handle.bind(app)).listen(process.env.PORT, () => {
   console.log(`Server up successfully on port ${process.env.PORT}`)
})
app.use('/api', require('./app/routes/index'))

process.on("unhandledRejection", (err) => {
   console.error("possibly unhandled rejection happened");
   console.error(err.message);
});
const closeHandler = () => {
   Object.values(connections).forEach((connection) => {
      connection.close();
   })
   httpServer.close(() => {
     console.info("Server is stopped successfully");
     process.exit(0);  
   })
}

process.on("SIGINT", closeHandler);
process.on("SIGTERM", closeHandler);



