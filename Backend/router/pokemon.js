const {pokemon} = require('../models/pokemon');
const express = require('express');
const router = express.Router();
const cloud = require('../cloudinary');
const multer = require('multer');
const FILE_TYPE_MAP={
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
}

const uploadOptions = multer({ 
    storage   : multer.diskStorage({}),
    fileFilter: (req, file,cb) =>{
        const isValid = FILE_TYPE_MAP[file.mimetype];
        if (isValid) {
            uploadError = null;}
        cb(uploadError, 'public/service');
    }
})

router.get('/all',async  (req, res)=>{

    const pokes = await pokemon.find();

    if(!pokes) {
        res.status(500).json({message: 'no pokemon to find'})
    } 

    res.status(200).send(pokes);
})

router.get('/getOne/:id',async  (req, res)=>{
    const pokes = await pokemon.findById(req.params.id);

    if(!pokes) {
        res.status(500).json({message: 'no pokemon to find'})
    } 

    res.status(200).send(pokes);
})

router.post('/new',uploadOptions.single('image'), async (req, res)=>{

    console.log(req.body, req.file);
    if (!req.file) return res.status(400).send('No image in the request');

    const result = await cloud.v2.uploader.upload(req.file.path);

    let newpoke = new pokemon({
        name :req.body.name,
        image:result.secure_url,
        cloud_id:result.public_id,
        CP:req.body.CP, 
        attack:req.body.attack, 
        defense_type:req.body.defense_type,
    })
    newpoke = await newpoke.save();

    if(!newpoke){
        await cloud.v2.uploader.destroy(result.public_id);
        res.status(400).send('the pokemon cannot be created!')
    }
    else{
        res.send(newpoke);
    }
})

router.put('/update/:id',uploadOptions.single('image'),async  (req, res)=>{
    const Pokemon = await pokemon.findById(req.params.id);
    if(!Pokemon){
        res.status(404).send("No Pokemon found");
    }
    let file = req.file;
    let imagepath;
    let cloudurl;
    if(file){
        await cloud.v2.uploader.destroy(appliances.Cloud_id);
        let result = await cloud.v2.uploader.upload(file.path);
        imagepath = result.secure_url;
        cloudurl =  result.public_id;
    }else{
        imagepath = appliances.Appliances_image;
        cloudurl = appliances.Cloud_id;
    }
    let updatePokemon = await pokemon.findByIdAndUpdate(
            req.params.id,
            {
                name :req.body.name,
                image:imagepath,
                cloud_id:cloudurl,
                CP:req.body.CP, 
                attack:req.body.attack, 
                defense_type:req.body.defense_type,
            },
            {new: true}
        )
    if(!updatePokemon){
        res.status(400).json({message:"Can't update"})
    }

    res.send(updatePokemon);
})

router.delete('/delete/:id',async (req, res)=>{
    pokemon.findByIdAndDelete(req.params.id)
    .then(async (poke) =>{
        if(poke) {
            await cloud.v2.uploader.destroy(poke.cloud_id);
            return res.status(200).json({success: true, message: "the Pokemon is deleted!",data:poke})
        } else {
            return res.status(404).json({success: false , message: "Pokemon not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

module.exports = router;