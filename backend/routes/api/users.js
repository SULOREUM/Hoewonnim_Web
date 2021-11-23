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
router.post('/', async (req, res) => {
    const users = await loadUsersCollections();
    // 이름, 성별, 아이디, 비밀번호, 이메일, 로그인여부, 챌린지, 체중, 선호종목
//
// db.users.insert([
//     {"name": "jinkyung", "sex": "female", "id": "lx97", "password": "lx97", "mail": "lxsz987@gmail.com", "login":0, "challenge": "diet", "weight": "55", "preference": "health"}
// ]);
    await users.insertOne({
        name: req.body.data.name,
        sex: req.body.data.sex,
        id: req.body.data.id,
        password: req.body.data.password,
        mail: req.body.data.mail,
        login: req.body.data.login,
        challenge: req.body.data.challenge,
        weight: req.body.data.weight,
        preference: req.body.data.preference
    });
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
