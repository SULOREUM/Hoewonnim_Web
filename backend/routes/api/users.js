const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

// Get Users
router.get('/', async (req, res) => {
    const users = await loadUsersCollections();
    res.send(await users.find({}).sort({createdAt:-1}).toArray());
});

router.get('/:id', async function(req, res){
    // const find_id = parseInt(req.params.id, 10);
    const find_id = mongodb.ObjectID(req.params.id);
    const users = await loadUsersCollections();
    res.send(await users.find({_id:find_id}).toArray());
});

// Add Users
router.post('/', async (req, res)=> {
    const users = await loadUsersCollections();
    // 이름, 성별, 아이디, 비밀번호, 이메일, 로그인여부, 챌린지, 체중, 선호종목

    await users.insertOne({

        id: req.body.data.id,
        password: req.body.data.password,
        name: req.body.data.name,
        gender: req.body.data.gender,
        phone: req.body.data.phone,
        // mail: req.body.data.mail,
        // login: req.body.data.login,
        // challenge: req.body.data.challenge,
        // weight: req.body.data.weight,
        // preference: req.body.data.preference
    });
    res.status(202).send();
});

router.post('/:id', async (req, res) => {
    const users = await loadUsersCollections();
    users.update(
        {_id: mongodb.ObjectID(req.params.id)},
        {
            $push: {
                id: req.body.data.id,
                password: req.body.data.password,
                name: req.body.data.name,
                gender: req.body.data.gender,
                phone: req.body.data.phone,
                // mail: req.body.data.mail,
                // login: req.body.data.login,
                // challenge: req.body.data.challenge,
                // weight: req.body.data.weight,
                // preference: req.body.data.preference
            }
        }
    );
    res.status(202).send();
});

async function loadUsersCollections() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://lx97:79xl@hoewonnimcluster.6jzln.mongodb.net/Hoewonnim', {
        useNewUrlParser: true
    })
    return client.db('Hoewonnim').collection('users');
}


//
module.exports = router;
