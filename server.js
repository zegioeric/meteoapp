//TODO
//...
//mongoose
//bcrypt
//jwt
//register system
//mailcatcher / send token
//lodash

const express = require('express');
const fs = require('fs');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true 
}));

app.use(cors());

const citiesPath = './data/cities.json'
const usersPath = './data/users.json'
const itCitiesData = require('./data/citylist-it.json')

// Helpers
const readFile = (callback, returnJson = false, filePath = citiesPath, encoding = 'utf8') => {
  fs.readFile(filePath, encoding, (err, data) => {
    if (err) {
        throw err;
    }
    callback(returnJson ? JSON.parse(data) : data);
  });
};

const readUserFile = (callback, returnJson = false, filePath = usersPath, encoding = 'utf8') => {
  fs.readFile(filePath, encoding, (err, data) => {
    if (err) {
        throw err;
    }
    callback(returnJson ? JSON.parse(data) : data);
  });
};

// const readCityFile = (callback, returnJson = false, filePath = cityJsonPath, encoding = 'utf8') => {
//   fs.readFile(filePath, encoding, (err, data) => {
//     if (err) {
//         throw err;
//     }
//     callback(returnJson ? JSON.parse(data) : data);
//   });
// };

const writeFile = (fileData, callback, filePath = citiesPath, encoding = 'utf8') => {
  fs.writeFile(filePath, fileData, encoding, (err) => {
    if (err) {
        throw err;
    }
    callback();
  });
};

const create_UUID = () => {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (dt + Math.random()*16)%16 | 0;
    dt = Math.floor(dt/16);
    return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

// Login
app.post('/login', (req, res) => {
  readUserFile(data => {
    let email = req.body.email
    let password = req.body.password
    let user = data[data.findIndex(user => user.email == email)]
    // //bcrypt compare
    if(user && user.password !== password){
      user = null
    } 
    return res.json({
      //use jwt
      token: (user) ? "token_"+user.name : null  
    })
  },
  true);
});

// List cities
app.get('/cities', (req, res) => {
  readFile(data => {
    return res.status(200).json(data)
  }, true);
});

app.get('/jsoncities/:name', function(req, res) {
  const { name } = req.params
  const filtered = itCitiesData.filter(function(city){
    return (city.name.includes(name)) ? city : false;
  })
  return res.status(200).json(filtered)
});

// Get city
app.get('/city/:id', function(req, res) {
  readFile(data => {
    const { id } = req.params
    const cityIndex = data.findIndex(city => city.id === id)
    const city = data[cityIndex]
    return res.status(200).json(city)
  },
  true);
});

// Create
app.post('/city', function(req, res) {
  readFile(data => {
    const city = { 
      id: create_UUID(),
      name: req.body.name,
      lat: req.body.lat,
      lon: req.body.lon,
    }
    data.push(city)

    writeFile(JSON.stringify(data, null, 2), () => {
        return res.status(200).json(city);
    });
  },
  true);
});

// Update
app.put('/city/:id', function(req, res) {
  readFile(data => {
    const id = req.params["id"];
    const cityIndex = data.findIndex(city => city.id === id)
    const city = data[cityIndex]
    city.name = req.body.name
    city.lat = req.body.lat
    city.lon = req.body.lon

    writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).json(city);
    });
  },
  true);
});

// Delete
app.delete('/city/:id', (req, res) => {
  readFile(data => {
    const id = req.params["id"];
    const cityIndex = data.findIndex(city => city.id === id)
    if (cityIndex > -1) {
      data.splice(cityIndex, 1);
    }
    writeFile(JSON.stringify(data, null, 2), () => {
        return res.status(200).json(true);
    });
  },
  true);
});

const server = app.listen(8080, () => {
  console.log('listening on port %s...', server.address().port);
});

