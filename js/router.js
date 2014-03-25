App.Router.map(function() {

  this.resource('visas', { path: '/' }, function () {
    
    // additional child routes    
    // this.route('active');
    // this.route('completed');
  });

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
    // return visas;
    return this.store.find('visa');
  }
});

App.VisaRoute = Ember.Route.extend({
  model: function(params) {
    // return visas.findBy('id', params.visa_id);
  }
});
