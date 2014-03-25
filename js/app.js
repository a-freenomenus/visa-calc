App = Ember.Application.create();

App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'visas-emberjs'
});

App.Router.map(function() {
  // put your routes here
  this.resource('about');
  this.resource('visas', function() {
    this.resource('visa', { path: ':visa_id' });
  });
  this.resource('newVisa');
});

App.IndexRoute = Ember.Route.extend({
  // model: function() {
  //   return ['red', 'yellow', 'blue'];
  // }
});

App.VisasRoute = Ember.Route.extend({
  model: function() {
    return visas;
  }
});

App.VisaRoute = Ember.Route.extend({
  model: function(params) {
    return visas.findBy('id', params.visa_id);
  }
});

App.VisaController = Ember.ObjectController.extend({
  isEditing: false,

  edit: function() {
    this.set('isEditing', true);
  },

  doneEditing: function() {
    this.set('isEditing', false);
    this.get('store').commit();
  },

  newVisa: function() {

  }
});

var visas = [{
  id: 1,
  name: 'Visa 1'
}, {
  id: 2,
  name: 'Visa 2'
}];