//Setup
const express = require('express');
const app = express();

const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/node-blog")


const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


const postSchema = new mongoose.Schema({ body: String });
const Post = mongoose.model('Post', postSchema);

//Routes
app.get("/", (req, res) => {
   Post.find({}, (err, posts) => {
      res.render('index', { posts: posts})
   });
});

app.post('/addpost', (req, res) => {
    const postData = new Post(req.body);
    postData.save().then( result => {
        res.redirect('/');
    }).catch(err => {
        res.status(400).send("Unable to save data");
    });
    console.log(req.body)
});


//Listen
app.listen(3000, () => {
    console.log('Server listing on 3000');
})