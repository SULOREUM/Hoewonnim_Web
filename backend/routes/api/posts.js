const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollections();
    res.send(await posts.find({}).toArray());
});

// Add Posts
router.post('/', async (req, res) => {
    const posts = await loadPostsCollections();
    await posts.insertOne({
        title: req.body.title,
        content: req.body.content,
        tag: req.body.tag,
        detailTag: req.body.detailTag,
        postNum: req.body.postNum,
        likedCount : req.body.likedCount,
        likedUsers: req.body.likedUsers,
        createdUser: req.body.createdUser,
        comments: req.body.comments,
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
    const client = await mongodb.MongoClient.connect('mongodb+srv://siyeon:tldus56923@cluster0.2zspd.mongodb.net/Hoewonnim', {
        useNewUrlParser: true
    })

    return client.db('Hoewonnim').collection('posts');
}

module.exports = router;