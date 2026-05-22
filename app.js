const express = require('express')
const path = require('path')
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin');
const app = express()
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname,"public")))
app.use(userRouter)
app.use(adminRouter)
app.listen(3000)