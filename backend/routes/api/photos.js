const express = require('express');
const mongodb = require('mongodb');
const multer = require('multer');
const mongoose = require('mongoose');

const router = express.Router();

const upload = multer({
    storage:multer.memoryStorage(),
    limits:{fileSize:5*1024*1024},
});

const {Schema} = mongoose;
const ImageSchema = new Schema({
    img : Buffer
})

const Image = mongoose.model('image',ImageSchema);

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollections();
    res.send(await posts.find({}).toArray());
});

// Add Posts
router.post('/', upload.single('image'), async (req, res) => {
    const posts = await loadPostsCollections();
    try {
        const img = req.file.buffer;
        const image = new Image({img});
        await posts.insertOne({
            img:image.img
        })
    }
    catch(e){
        return res.status(500);
    }
});

async function loadPostsCollections() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://adminSuloreum:qwer1234@hoewonnimcluster.6jzln.mongodb.net/Hoewonnim', {
        useNewUrlParser: true
    })

    return client.db('Hoewonnim').collection('photos');

}

module.exports = router;
