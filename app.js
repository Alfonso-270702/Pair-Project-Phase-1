const express = require('express')
const app = express()
const port = process.envPORT || 3000;
const router = require('./router/index')
const session = require('express-session');

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');


app.use(session({
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: false,
}))
app.use(router);

app.listen(port, () => console.log(`Running on port ${port}`))