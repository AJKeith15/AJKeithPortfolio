// require necessary dependencies
const express = require('express')
const data = require('./data.json')

// create projects variable which holds the array of projects from the data JSON file
const {projects} = data

// create an express application
const app = express()

// create route to access items in public folder
app.use('/static', express.static('public'))

// set the view engine to Pug
app.set('view engine', 'pug')

// route to root page
app.get('/', (req, res) => {
    // view set to index.pug and locals include projects array
    res.render('index', {projects})
})

// route to about page
app.get('/about', (req, res) => {
    // view set to about.pug
    res.render('about')
})

// route to projects pages
app.get('/project/:id', (req, res) => {
    // use url request paramater to create id variable
    const {id} = req.params
    // view set to project.pug and locals include projects array and id parameter
    res.render('project', {projects, id})
})

// if route to request not found above, then create error object as below
app.use((req, res, next) => {
    const err = new Error('Page not found')
    // error status set to 404
    err.status = 404
    next(err)
})

// error handler which logs the error to the console and displays a message on the browser page
app.use((err, req, res, next) => {
    res.locals.error = err
    res.status(err.status)
    console.log(err)
    res.send(`Oops, an error was found with your request: ${err.message}`)
})

// set listening port to 3000 and log a message to the console
app.listen(3000, () => {
    console.log('The app is running on localhost: 3000.')
})