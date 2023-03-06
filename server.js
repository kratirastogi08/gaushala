require("app-module-path").addPath(`${__dirname}`)
const express=require("express")
const bodyParser=require("body-parser")
const http=require("http")

const cors=require("cors")
const path=require("path")

require('dotenv').config();
const app=express();
global.appRoot=path.join(__dirname)
app.set('views',path.join(__dirname,'view'))
app.set('view engine','ejs')

app.set(path.join(__dirname))
app.use(express.static(__dirname))
app.use(cors())
app.use(bodyParser.json({limit:"2mb"}))
app.use(bodyParser.urlencoded({extended:true}))
const httpServer=http.createServer(app.handle.bind(app))
                     .listen(process.env.PORT,()=>{
                        console.info(`Server up successfully - port: ${process.env.PORT}`)
                     })
app.use('/api',require('./app/routes/index'))

