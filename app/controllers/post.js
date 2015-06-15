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
    }
  }
};

export default Ember.ObjectController.extend(PostController);
