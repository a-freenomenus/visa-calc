App.Router.map(function() {

  this.route('about');

  this.resource('visas', { path: '/visas' }, function () {

    // additional child routes

    this.resource('visa', { path: ':visa_id' });
    this.resource('newVisa');


    // this.route('active');
    // this.route('completed');
  });

});

// App.Router.map(function() {
//   // put your routes here
//   this.resource('about');
//   this.resource('visas', function() {
//     this.resource('visa', { path: ':visa_id' });
//   });
//   this.resource('newVisa');
// });

App.IndexRoute = Ember.Route.extend({
  model: function() {
    // return this.modelFor('visas');
  }
});

App.VisasRoute = Ember.Route.extend({
  model: function() {
    // return visas;
    return this.store.find('visa');
  }
});

App.VisaRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('visa', params.visa_id);
  }
});
