module.exports = function(app) {
  var express = require('express');
  var postsRouter = express.Router();

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

  postsRouter.get('/', function(req, res) {
    res.send({
      'posts': posts,
      'authors': authors
    });
  });

  postsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  postsRouter.get('/:id', function(req, res) {
    res.send({
      'post': posts.filter(function(post) {
        return post.id === req.params.id
      })[0],
      'authors': authors
    });
  });

  postsRouter.put('/:id', function(req, res) {
    res.send({
      'posts': posts
    });
  });

  postsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/posts', postsRouter);
};
