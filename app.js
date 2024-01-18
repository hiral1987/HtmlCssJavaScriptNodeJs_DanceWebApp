const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

main().catch(err => console.log(err));

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
});

contactSchema.methods.getInfo = function () {
    return `Name: ${this.name}, Phone: ${this.phone}, email: ${this.email}, address: ${this.address}, desc: ${this.desc}`
}

const ContactModel = mongoose.model('contact', contactSchema);

async function main() {
    console.log('Connecting to db..........');
    await mongoose.connect('mongodb://localhost/contactData');
    console.log('Connected to db..........');
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

    // const myDevice = new DeviceInfo({
    //     name: "Redmi Note 12",
    //     price: 25000,
    //     rating: 2.2,
    //     qty: 25,
    //     sold: 3
    // });
    // console.log(myDevice.getInfo());

    // let document = await myDevice.save();
    // console.log('Data saved to db..........');
    // console.log(document);

    // To get all document from db & collections : items
    // const devices = await DeviceInfo.find();
    // const devices = await DeviceInfo.find({ name: 'Redmi Note 12' });
    // console.log(devices);

}

const app = express();
const port = 88;


// For serving static files
app.use('/static', express.static('static'));
app.use(express.urlencoded());


// Set the template engine pug
app.set('view engine', 'pug');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
    const params = {'title': 'This is a title', 'content': 'This is content'};
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res) => {
    const params = {'title': 'This is a title', 'content': 'This is content'};
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res) => {
    // const params = {'title': 'This is a title', 'content': 'This is content'};
    var myData = new ContactModel(req.body);
    myData.save().then(() => {
        res.send('thank you.. We will contact you.');
    }).catch(() => {
        res.status(400).send('Something went wrong. Please try agin later.');
    });
    // res.status(200).render('contact.pug');
});

app.listen(port, () => {
    console.log(`application started successfully on port ${port}`);
});