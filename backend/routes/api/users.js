const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Users
router.get('/', async (req, res) => {
    const posts = await loadPostsCollections();
    res.send(await posts.find({}).sort({createdAt:-1}).toArray());
});

router.get('/:id', async function(req, res){
    // const find_id = parseInt(req.params.id, 10);
    const find_id = mongodb.ObjectID(req.params.id);
    const posts = await loadPostsCollections();
    res.send(await posts.find({_id:find_id}).toArray());
});

// Add User
router.post('/', async (req, res) => {
    const posts = await loadPostsCollections();
    await posts.insertOne({
        id: req.body.id,
        password: req.body.data.password,
        name: req.body.data.name,
        age: req.body.data.age,
        state: req.body.data.data.state,
        sex: req.body.data.sex,
        profile_image: req.body.data.profile_image,
        birth: req.body.data.birth,
        phone: req.body.data.phone,
        mail: req.body.data.mail,
        interest: req.body.data.interest,
        challenge: req.body.data.challenge,
        weight: req.body.data.weight,
        liked_post: req.body.data.liked_post
    });
    res.status(201).send();
});

router.post('/:id', async (req, res) => {
    const post = await loadPostsCollections();
    post.update(
        {_id: mongodb.ObjectID(req.params.id)},
        {
            $set: {
                id: req.body.id,
                password: req.body.data.password,
                name: req.body.data.name,
                age: req.body.data.age,
                state: req.body.data.data.state,
                sex: req.body.data.sex,
                profile_image: req.body.data.profile_image,
                birth: req.body.data.birth,
                phone: req.body.data.phone,
                mail: req.body.data.mail,
                interest: req.body.data.interest,
                challenge: req.body.data.challenge,
                weight: req.body.data.weight,
                liked_post: req.body.data.liked_post
            }
        }
    );
    res.status(201).send();
});

// Delete User
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollections();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadPostsCollections() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://adminSuloreum:qwer1234@hoewonnimcluster.6jzln.mongodb.net/Hoewonnim', {
        useNewUrlParser: true
    })

    return client.db('Hoewonnim').collection('users');
}

module.exports = router;
