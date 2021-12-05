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

const Image = mongoose.model('profile',ImageSchema);


// Get Users
router.get('/', async (req, res) => {
    const users = await loadUsersCollections();
    res.send(await users.find({}).sort({createdAt:-1}).toArray());
});

router.get('/:id', async function(req, res){
    const find_id = mongodb.ObjectID(req.params.id);
    const users = await loadUsersCollections();
    res.send(await users.find({_id:find_id}).toArray());
});

// Add User
// 입력되지 않은 항목(ex. state, ...)주석처리 안하면
// TypeError: Cannot read property 'state' of undefined
// 에러 발생하여 주석처리 함.

//SignUp
router.post('/',upload.single('image'), async (req, res) => {
    const users = await loadUsersCollections();
    await users.insertOne({
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


        // postman post 용 -> 나중에 지울게영
        // id: req.body.id,
        //     password: req.body.password,
        //     name: req.body.name,
        //     age: req.body.age,
        //     state: req.body.state,
        //     sex: req.body.sex,
        //     profile_image: req.body.profile_image,
        //     birth: req.body.birth,
        //     phone: req.body.phone,
        //     mail: req.body.mail,
        //     interest: req.body.interest,
        //     challenge: req.body.challenge,
        //     weight: req.body.weight,
        //     liked_post: req.body.liked_post
    });
    res.status(202).send();
});

//SignIn
// router.post('/', async (req, res) => {
//     const userl = await loadUsersCollections();
//     userl.findOne(
//         {_id: mongodb.ObjectID(req.params.id)},
//         {
//             $set: {
//                 id: req.body.id,
//                 password: req.body.password,
//                 name: req.body.name,
//                 // age: req.body.data.age,
//                 // state: req.body.data.data.state,
//                 sex: req.body.sex,
//                 // profile_image: req.body.data.profile_image,
//                 // birth: req.body.data.birth,
//                 phone: req.body.phone,
//                 // mail: req.body.data.mail,
//                 // interest: req.body.data.interest,
//                 // challenge: req.body.data.challenge,
//                 // weight: req.body.data.weight,
//                 // liked_post: req.body.data.liked_post
//             }
//         }
//     );
//     res.status(202).send();
// });

// 입력되지 않은 항목(ex. state, ...)주석처리 안하면
// TypeError: Cannot read property 'state' of undefined
// 에러 발생하여 주석처리 함.
router.post('/:id',upload.single('image'), async (req, res) => {
    const user = await loadUsersCollections();
    if (req.body.id == undefined){
        const user = await loadUsersCollections();
        const img = req.file.buffer;
        const image = new Image({img});
        user.updateOne(
            {_id: mongodb.ObjectID(req.params.id)},
            {
                $set: {
                    profile_image: image.img
                }
            }
        );
    }
    else {
        user.updateOne(
            {_id: mongodb.ObjectID(req.params.id)},
            {
                $set: {
                    id: req.body.id,
                    password: req.body.password,
                    name: req.body.name,
                    age: req.body.age,
                    state: req.body.state,
                    sex: req.body.sex,
                    profile_image: req.body.profile_image,
                    birth: req.body.birth,
                    phone: req.body.phone,
                    mail: req.body.mail,
                    interest: req.body.interest,
                    challenge: req.body.challenge,
                    weight: req.body.weight,
                    liked_post: req.body.liked_post
                }
            }
        );
    }
    res.status(202).send();

});

// Delete User
router.delete('/:id', async (req, res) => {
    const users = await loadUsersCollections();
    await users.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadUsersCollections() {
    const client = await mongodb.MongoClient.connect('***REMOVED***', {
        useNewUrlParser: true
    })

    return client.db('Hoewonnim').collection('users');
}

module.exports = router;
