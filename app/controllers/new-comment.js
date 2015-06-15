import Ember from "ember";

var NewCommentController = {
  actions: {
    save: function() {
      var author = this.get('author');
      var body = this.get('comment');
      var newAuthor = this.store.createRecord('author', {
        name: author
      })
      var newComment = this.store.createRecord('comment', {
        author: newAuthor,
        comment: comment
      });
      newComment.save();

      this.set('author', '');
      this.set('comment', '');

      this.transitionToRoute('post');
    }
  }
};


export default Ember.Controller.extend(NewCommentController);
