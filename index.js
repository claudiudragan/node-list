const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const list = require('./list.js')

mongoose.connect("mongodb://localhost/intern");
let db = mongoose.connection;
db.once('open', () => {
    console.log("Connected to Mongo.");
});

db.on('error', (err) => {
    console.log(err);
});

let User = require('./models/user');

const app = express();
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    User.find({}, (err, users) => {
        if(err){
            console.log(err);
        }else{
            res.render('index', {users: users});
        }
    });
});

app.get('/newUser', (req, res) => {
    res.render('newUser');
});

app.get('/editUser/:userId', (req, res) => {
    User.findOne({"id" : req.params.userId}, (err, user) => {
        if(err){
            console.log(err);
        }else{
            res.render('editUser', {user: user, id: req.params.userId});
        }
    });
});

app.post('/submitEdit/:userId', (req, res) => {
    update = {
        "name" : req.body.name,
        "username": req.body.username,
        "email" : req.body.email,
        "street" : req.body.street,
        "suite" : req.body.suite,
        "city" : req.body.city,
        "zipcode" : req.body.zipcode,
        "lat" : req.body.lat,
        "lng" : req.body.lng,
        "phone" : req.body.phone,
        "website" : req.body.website,
        "companyName" : req.body.companyName,
        "companyCatchphrase" : req.body.companyCatchphrase,
        "companyBs" : req.body.companyBs
    };

    User.findOneAndUpdate({"id" : req.params.userId}, update, (err) => {
        if(err){
            console.log(err);
        }
    });

    res.redirect('/');
});

app.get('/deleteUser/:userId', (req, res) => {
    User.findOneAndDelete({"id" : req.params.userId}, (err) => {
        if(err){
            console.log(err);
        }
    });

    res.redirect("/");
});

app.post('/addUser', (req, res) => {
    User.countDocuments({}, (err, count)=> {
        let user = new User();
        user.id = count + 1;
        user.name = req.body.name;
        user.username = req.body.username;
        user.email = req.body.email;
        user.city = req.body.city;
        user.street = req.body.street;
        user.suite = req.body.suite;
        user.zipcode = req.body.zipcode;
        user.lat = req.body.lat;
        user.lng = req.body.lng;
        user.phone = req.body.phone;
        user.website = req.body.website;
        user.companyName = req.body.companyName;
        user.companyCatchphrase = req.body.companyCatchphrase;
        user.companyBs = req.body.companyBs;

        user.save( (err) => {
            if(err){
                console.log(err);
                return;
            }
        });
    });

    console.log("Added user.")
    res.redirect('/');
});

app.get('/userDetail/:userId', (req, res) => {
    User.findOne({"id" : req.params.userId}, (err, user) => {
        if(err){
            console.log(err);
            res.redirect('/');
        }else{
            res.render('userDetail', {user : user});
        }
    });
});

app.get('/initDB', (req, res) => {
    for(var i = 0; i < list.users.length; i++){
        let user = new User();
        user.id = list.users[i].id;
        user.name = list.users[i].name;
        user.username = list.users[i].username;
        user.email = list.users[i].email;
        user.city = list.users[i].address.city;
        user.street = list.users[i].address.street;
        user.suite = list.users[i].address.suite;
        user.zipcode = list.users[i].address.zipcode;
        user.lat = list.users[i].address.geo.lat;
        user.lng = list.users[i].address.geo.lng;
        user.phone = list.users[i].phone;
        user.website = list.users[i].website;
        user.companyName = list.users[i].company.name;
        user.companyCatchphrase = list.users[i].company.catchPhrase;
        user.companyBs = list.users[i].company.bs;

        user.save( (err) => {
            if(err){
                console.log(err);
                return;
            }
        });
    }
    console.log("Initialized database.");
    res.redirect('/');
});

app.listen(3000, () =>{
    console.log("Listening on port 3000.");
});