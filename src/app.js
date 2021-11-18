const path = require('path')
const express = require('express');
const hbs = require('hbs');
const { ADDRGETNETWORKPARAMS } = require('dns');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//define paths for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Arthur'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Arthur'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help page',
        title: 'About Me',
        name: 'Arthur',
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404',
        name: 'Arthur',
        errorMessage: 'Help Article Not Found'
    })
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide  search term'
        })
    } else {
        geocode(req.query.address, (error, {latitude, longitude, location}= {}) => {
            if (error) {
                return res.send({error, message: "geocode not run"})
            }
            forecast(longitude, latitude, (error, forecastData) => {
                if(error) {
                    return res.send({error, message:"forecast not run"})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
    }
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Arthur',
        errorMessage: 'Page could not be found'
    })
})


app.listen(3000, () => {
    console.log('<----- listening to port 3000')
})