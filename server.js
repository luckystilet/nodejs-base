require('dotenv').config()
const express = require('express')
const chalk = require('chalk') // coloring logs
const morgan = require('morgan')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const postRouter = require('./routes/post-routes')
const contactRouter = require('./routes/contact-routes')
const postApiRoutes = require('./routes/api-post-routes')
const createPath = require('./helpers/create-path')
//
const errorMsg = chalk.whiteBright.bgRed.bold
const successMsg = chalk.whiteBright.bgGreenBright.bold
//
mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => console.log(successMsg('DB connected')))
  .catch(() => console.log(errorMsg('DB connection failed')))
//
const app = express()
app.set('view engine', 'ejs')

app.listen(process.env.PORT, (error) => {
  error ? console.log(errorMsg(error)) : console.log(successMsg(`Listen port ${process.env.PORT}`))
})
// log files and response time
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.urlencoded({extended: false}))
app.use(express.static('styles'))
app.use(methodOverride('_method'))


app.get('/', (req, res) => {
  const title = 'Home'
  res.render(createPath('index'), { title })
})

app.use(postRouter)
app.use(postApiRoutes)
app.use(contactRouter)
app.use((req, res) => {
  const title = 'Error Page'
  res
    .status(404)
    .render(createPath('error'), { title })
})
