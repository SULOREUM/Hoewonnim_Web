const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const users = require('./routes/api/users')
const posts = require('./routes/api/posts');
const boards = require('./routes/api/boards');

app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/boards',boards);
// // Handle production
// if(process.env.NODE_ENV === 'production') {
//     // Static folder
//     app.use(express.static(__dirname + '/public/'));
//
//     //Handle SPA
//     app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
// }

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));