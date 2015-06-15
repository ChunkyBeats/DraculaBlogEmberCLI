import Ember from "ember";

var NewCommentController = {
  needs: ['post'],
  actions: {
    save: function() {
      var author = this.get('author');
      var comment = this.get('comment');

      var newComment = this.store.createRecord('comment', {
        author: author,
        comment: comment
      });
      newComment.save();

      var post = this.get('controllers.post.model');
      post.get('comments').pushObject(newComment);
      post.save();

      this.set('author', '');
      this.set('comment', '');

      this.transitionToRoute('post');
    }
  }
};


export default Ember.Controller.extend(NewCommentController);
