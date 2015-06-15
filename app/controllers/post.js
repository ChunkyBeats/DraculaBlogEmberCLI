import Ember from "ember";

var PostController = {
  isEditing: false,
  newPost: function() {
    this.set("isEditing", false);
  }.observes('id'),
  actions: {
    edit: function() {
      this.set("isEditing", true);
    },
    doneEditing: function() {
      this.set("isEditing", false);
      this.get('model').save();
    },
    delete: function() {
      var post = this.get('model');
      post.destroyRecord();
      this.transitionToRoute('posts');
    }
  }
};

export default Ember.ObjectController.extend(PostController);
