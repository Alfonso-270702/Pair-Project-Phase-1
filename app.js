const express = require('express')
const app = express()
const port = 3000
const router = require('./router/index')

app.use(express.urlencoded( { extended: false } ))
app.set('view engine', 'ejs')

app.use(router)

app.listen(port,()=> console.log(`Running on port ${port}`))