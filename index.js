const express = require('express');
const app = express();
global.publicPath= __dirname+'/public';
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false,limit:'50mb'}));

app.use(bodyParser.json());

const fileUpload = require('express-fileupload');
app.use(fileUpload());

require('dotenv').config();

const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/node-rest-api', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('mongodb connected successfully');
}).catch((err)=>{
    console.log(err);
});

require('./helper/extend-node-input-validator');
require('./routes/index')(app);

const http = require('http');
const serevr = http.Server(app);
const port = process.env.PORT||3000;
serevr.listen(port,()=>{
    console.log(`server running on port localhost:${port}`);
});

