import Ember from "ember";

var NewPostController = {
  actions: {
    save: function() {
      var title = this.get('title');
      var body = this.get('body');
      var newAuthor = this.store.createRecord('author', {
        name: 'dracula'
      })
      var newPost = this.store.createRecord('post', {
        title: title,
        body: body,
        author: newAuthor
      });
      newPost.save();

      this.set('title', '');
      this.set('body', '');

      this.transitionToRoute('posts');
    }
  }
};

export default Ember.ObjectController.extend(NewPostController);
