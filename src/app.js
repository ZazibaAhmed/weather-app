const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Zaziba Ahmed'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Zaziba Ahmed'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'Test kortesi',
        name: 'Zaziba Ahmed'
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Zaziba Ahmed',
        errorMessage: 'Help article not found'
    });
})

// first param = route
app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'Must provide address',
        });
    }
    geocode(req.query.address, (error, {latitude, longitude, label} = {}) => {
        if(error){
          return res.send({ error: error,});
        }
      
        forecast(latitude, longitude, (error, forecastData) => {
          if(error){
            return res.send({ error: error,});
          }
          res.send({
                address: req.query.address,
                location: label,
                forecast: forecastData,
            })
         
        })
      
    }) 
    
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Zaziba Ahmed',
        errorMessage: 'Page not found'
    });
})


app.listen(3000, () => {
    console.log('Server up on port 3000');
})