const express = require('express')
const path = require("path")
const app = express()
const port = 5555

const mongodb = require('mongodb')
const dotenv = require('dotenv')


const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: false }));
dotenv.config()

// Static Files
app.use(express.static('static'));
app.use('/css', express.static(path.join(__dirname, 'static/css')))
app.use('/js', express.static(path.join(__dirname, 'static/js')))
app.use('/img', express.static(path.join(__dirname, 'static/img')))
    // Set View's
app.set('views', './views');
app.set('view engine', 'ejs');
// GET http://localhost:5555/registered
app.get("/registered", function(req, res) {
    res.send("you are registered")
});
// Get registration page
app.get('/registration', (req, res) => {
    res.render('registrationForm')
})

// Get registration page
app.get('', (req, res) => {
    res.render('startPage')
})


//var newUser: User;

app.post('/registration', (req, res) => {
    console.log("helli")
    mongodb.MongoClient.connect(process.env.CONNECTIONLINK, { useUnifiedTopology: true }, async(err, client) => {
        console.log("hello")
        const db = client.db()
        const userdb = db.collection("userdb")
        const firstname = req.body.firstname
        const lastname = req.body.lastname
        const school = req.body.school
        const email = req.body.email
        console.log("helle")
        try {
            const nsertedUser = await userdb.insertOne({ firstname, lastname, school, email })
            newUser = new User(insertedUser.insertedId, firstname, lastname, school, email)
            res.json("User added to databse.")
        } catch (err) {
            console.log(err)
            res.json("Try again later.")
        }
        client.close()
    })

})

app.listen(port)