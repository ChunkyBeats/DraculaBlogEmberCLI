import DS from 'ember-data';

export default DS.Model.extend({
  author: DS.attr('string'),
  comment: DS.attr('string'),
  author: DS.belongsTo('author'),
  post: DS.belongsTo('post')
});
