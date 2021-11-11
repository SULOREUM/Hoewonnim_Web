const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollections();
    res.send(await posts.find({}).toArray());
});

router.get('/:id', async function(req, res){
    const find_id = parseInt(req.params.id, 10);
    const posts = await loadPostsCollections();
    res.send(await posts.find({id:find_id}).toArray());
});

// Add Posts
router.post('/', async (req, res) => {
    const posts = await loadPostsCollections();
    await posts.insertOne({
        id: req.body.data.id,
        user: req.body.data.user,
        subject: req.body.data.subject,
        regdate: req.body.data.regdate,
        cont: req.body.data.cont,
    });
    res.status(201).send();
});

// Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollections();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadPostsCollections() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://adminSuloreum:qwer1234@hoewonnimcluster.6jzln.mongodb.net/Hoewonnim', {
        useNewUrlParser: true
    })

    return client.db('Hoewonnim').collection('boards');
}

module.exports = router;