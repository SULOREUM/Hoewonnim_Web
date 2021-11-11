const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollections();
    res.send(await posts.find({}).toArray());
});

router.get('/:id', async function(req, res){
    // const find_id = parseInt(req.params.id, 10);
    const find_id = mongodb.ObjectID(req.params.id);
    const posts = await loadPostsCollections();
    res.send(await posts.find({_id:find_id}).toArray());
});

// Add Posts
router.post('/', async (req, res) => {
    const posts = await loadPostsCollections();
    await posts.insertOne({
        title: req.body.data.title,
        content: req.body.data.content,
        tag: req.body.data.tag,
        detailTag: req.body.data.detailTag,
        postNum: req.body.data.postNum,
        likedCount : req.body.data.likedCount,
        likedUsers: req.body.data.likedUsers,
        createdUser: req.body.data.createdUser,
        comments: req.body.data.comments,
        createdAt: new Date()
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

    return client.db('Hoewonnim').collection('posts');
}

module.exports = router;