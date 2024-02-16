const dotenv=require('dotenv')
const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const cookieparser = require('cookie-parser')
const authRouter = require('./routes/auth')
const adminRouter = require('./routes/admin')
const authentication = require('./middlewares/authentication')

connectDB()
dotenv.config()
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(cookieparser())
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send('Server up and running')
})

// setInterval(function() {
//     console.log("Render ab nhi");
// }, 2*60*1000)

app.use('/auth', authentication, authRouter);
app.use('/admin', authentication, adminRouter);

// console.log(process.env.PORT)

app.listen(process.env.PORT, () => {
    console.log(`Server up and running at port:${process.env.PORT}`)
})