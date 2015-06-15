module.exports = function(app) {
  var express = require('express');
  var postsRouter = express.Router(), commentsRouter = express.Router();
  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  var posts = [
  {
    id: 1,
    title: 'Vampires',
    body: 'I am one of the living dead',
    author: 1
  },
  {
    id: 2,
    title: 'This is Draculas Blog',
    body: 'A 15th century man living in the 21st century',
    author: 1
  }
  ];

  var authors = [
  {
    id: 1,
    name: 'Dracula',
    posts: [1, 2]
  }
  ];

  var comments = [
  {
    id: 1,
    comment: 'I love the 21st century',
    author: 1,
    post: 2
  }];

  postsRouter.get('/', function(req, res) {
    res.send({
      'posts': posts,
      'authors': authors
    });
  });

  postsRouter.post('/', function(req, res) {
    console.log(req.body)
    var post = req.body.post;
    post.id = posts.length + 1;
    post.author = 1;
    posts.push(post);
  });

  postsRouter.get('/:id', function(req, res) {
    res.send({
      'post': posts.filter(function(post) {
        return post.id == req.params.id;
      })[0],
      'authors': authors
    });
  });

  postsRouter.put('/:id', function(req, res) {
    var title = req.body.post.title;
    var body = req.body.post.body;
    for(var i = 0; i < posts.length; i++){
      if (req.params.id == posts[i].id) {
        posts[i].title = title;
        posts[i].body = body;
      }
    }
  });

  postsRouter.delete('/:id', function(req, res) {
    for(var i = 0; i < posts.length; i++){
      if (req.params.id == posts[i].id) {
        posts.splice(i, 1);
      }
    }
  });

  commentsRouter.get('/', function(req, res) {
    res.send({
      "comments": comments
    });
  });

  // commentsRouter.post('/', function(req, res) {
  //   res.send({
  //     ''
  //   });
  // });

  app.use('/api/comments', commentsRouter);
  app.use('/api/posts', postsRouter);
};
