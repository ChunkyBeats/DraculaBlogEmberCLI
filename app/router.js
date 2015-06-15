import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route('about');
  this.resource('posts', {path: '/'}, function() {
    this.resource('post', {path: ':post_id'}, function() {
      this.resource('new-comment');
    });
    this.resource('new-post', {path: 'posts/new'});
  });

});
