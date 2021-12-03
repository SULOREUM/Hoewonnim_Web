const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var mongoose = require('mongoose');
//mongoose 연결할 때 포트 연결
mongoose.connect(`mongodb+srv://adminSuloreum:qwer1234@hoewonnimcluster.6jzln.mongodb.net/Hoewonnim`).then(() => {
    app.listen(3000, () => console.log('listening to port 3000'));
}).catch(err => console.log(err));

// User data
var UserSchema = new mongoose.Schema({
    password: String, // 비밀번호
    name: String, // 이름
    id: String, // 아이디
});
var Users = mongoose.model('users', UserSchema);

const app = express();
app.use(bodyParser.json());
app.use(cors());

const users = require('./routes/api/users')
const posts = require('./routes/api/posts');
const boards = require('./routes/api/boards');
const mongodb = require("mongodb");


app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/boards',boards);

// SignUp 처리
app.post('/api/SignUp', (req, res) => {
    var new_user = new Users(req.body.data);

    new_user.save((err) => {
        if (err) return res.status(500).json({ message: '저장 실패!' });
        else return res.status(200).json({ message: '저장 성공!', data: new_user });
    });
});

// SignIn 처리
app.post('/api/SignIn', (req, res) => {
    var aUser = Users.findOne({ id: req.body.id, password: req.body.password }, (err, user) => {
        if (err) return res.status(500).json({ message: '에러!' });
        else if (user){
            return res.status(200).json({ "token": user._id.toString() });
        }
        else return res.status(404).json({ message: '유저 없음!' });
    })
});

// Find User
// app.get('/api/Find', (req, res) => {
//     Users.findOne({ id: req.body.id, password: req.body.password }, (err, user) => {
//         if (err) return res.status(500).json({ message: '에러!' });
//         else if (user) return res.status(200).json({  });
//         else return res.status(404).json({ message: '유저 없음!' });
//     });
// });

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