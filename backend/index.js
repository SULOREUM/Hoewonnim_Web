const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var mongoose = require('mongoose');

const dotenv = require('dotenv')
dotenv.config();

//mongoose 연결할 때 포트 연결
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(process.env.PORT, () => console.log('listening to port 3000'));
}).catch(err => console.log(err));

// User data
var UserSchema = new mongoose.Schema({
    password: String, // 비밀번호
    name: String, // 이름
    id: String, // 아이디
    age: Number,
    state: String,
    sex: String,
    // list: String, // 글 데이터 가져오기
    // likedList: Array,
    // user_interest: Array,
    // challenge: Object,
    // challengeList: Array,
    // weight: Array,
    birth: String,
    phone: String,
    mail: String,
    interest: Array,
    challenge: Object,
    weight: Array,
    liked_post: Array,
    profile_image: String
});
var Users = mongoose.model('users', UserSchema);

const app = express();
app.use(bodyParser.json());
app.use(cors());

const users = require('./routes/api/users')
const posts = require('./routes/api/posts');
const photos = require('./routes/api/photos');
const mongodb = require("mongodb");

app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/photos',photos);

// SignUp 처리
app.post('/api/SignUp', (req, res) => {
    let new_user = new Users(req.body.data);

    new_user.save((err) => {
        if (err) return res.status(500).json({ message: '저장 실패!' });
        else return res.status(200).json({ message: '저장 성공!', data: new_user });
    });
});

// SignIn 처리
app.post('/api/SignIn', (req, res) => {
    let aUser = Users.findOne({ id: req.body.id, password: req.body.password }, (err, user) => {
        if (err) return res.status(500).json({ message: '에러!' });
        else if (user){
            return res.status(200).json({ "token": user._id.toString() });
        }
        else return res.status(404).json({ message: '유저 없음!' });
    })
});

// SignUp에서 아이디 중복검사
app.post('/api/CheckId',(req, res)=> {
    let aUser = Users.findOne({id: req.body.id}, (err, user) => {
        if (err) return res.status(500).json({message: '에러!'});
        else if (user){
            return res.status(202).json({ "token": 'existed user' });
        }
        else return res.status(202).json({ "token": 'no user' });
    })
});
// // Handle production
// if(process.env.NODE_ENV === 'production') {
//     // Static folder
//     app.use(express.static(__dirname + '/public/'));
//
//     //Handle SPA
//     app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
// }

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Server started on port ${port}`));