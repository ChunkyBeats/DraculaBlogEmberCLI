module.exports = function(app) {
  var express = require('express');
  var postsRouter = express.Router(),
      commentsRouter = express.Router(),
      authorsRouter = express.Router();
  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  var posts = [
  {
    id: 1,
    title: 'Vampires',
    body: 'I am one of the living dead',
    author: 1,
    comments: []
  },
  {
    id: 2,
    title: 'This is Draculas Blog',
    body: 'A 15th century man living in the 21st century',
    author: 1,
    comments: [1]
  }
  ];

  var authors = [
  {
    id: 1,
    name: 'Dracula',
    posts: [1, 2],
    comments: []
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
    // console.log(req.body)
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
      // 'comments': comments
    });
  });

  postsRouter.put('/:id', function(req, res) {
    // console.log(req.body);
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

  commentsRouter.get('/:id', function(req, res) {
    res.send({
      "comment": comments.filter(function(comments) {
        return comments.id == req.params.id;
      })[0]
    });
  });

  commentsRouter.post('/', function(req, res) {
    // res.send({
      console.log(req.body);
      var comment = req.body.comment;
      comment.id = comments.length + 1;
      comment.post = parseInt(comment.post);
      var post = posts.filter(function(post) {
        return post.id == comment.post;
      })[0];
      comments.push(comment);
      post.comments.push(comment.id);
    // });
  });

  authorsRouter.get('/', function(req, res) {
    res.send({
      "authors": authors
    });
  });

  authorsRouter.post('/', function(req, res) {
    // console.log(req.body)
    var author = req.body.author;
    author.id = authors.length + 1;
    author.posts = [];
    author.comments = [];
    authors.push(author);
  });

  app.use('/api/authors', authorsRouter);
  app.use('/api/comments', commentsRouter);
  app.use('/api/posts', postsRouter);
};
