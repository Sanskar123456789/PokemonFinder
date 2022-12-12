const express = require('express');
const app = express();
require('dotenv/config');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

//cors
app.use(cors());
app.options('*', cors())

//import routers
const pokemon = require('./router/pokemon');

//middleware
app.use(express.json());
app.use(morgan('tiny'));
// app.use('/public/uploads', express.static(__dirname + '/public/uploads'))

//routers
app.use('/api/pokemon',pokemon);

//connecting to database
mongoose.connect(process.env.mongo_connect,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName:"pokemon"
})
.then(()=>{
    console.log("Database Connected");
})
.catch((err)=>{
    console.log(" Database is not conected " + err);
})

// port for listening request 
app.listen(3000,()=>{
    console.log("Server is running http://localhost:3000");
})