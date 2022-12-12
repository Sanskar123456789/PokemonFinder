const mongoose = require('mongoose');

const pokemonSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    CP:{
        type: String,
        required: true
    }, 
    attack:{
        type: String,
        required: true
    }, 
    defense_type:{
        type: String,
        required: true
    },
    cloud_id:{
        type: String,
        required: true
    }
})

exports.pokemon = mongoose.model('pokemon',pokemonSchema);