import DS from 'ember-data';

export default DS.Model.extend({
  comment: DS.attr('string'),
  author: DS.attr('string'),
  post: DS.belongsTo('post', {async: true})
});
