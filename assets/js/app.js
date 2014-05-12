vc = new Marionette.Application();

vc.addRegions({
  mainRegion: "#main-region"
});

vc.navigate = function(route, options) {
  options || (options = {});
  Backbone.history.navigate(route, options);
}

vc.getCurrentRoute = function() {
  return Backbone.history.fragment;
}

vc.on("initialize:after", function() {

  if (Backbone.history) {
    Backbone.history.start();
    /* Backbone.history.start({pushState: true}); */

    if (this.getCurrentRoute() === "") {
      vc.trigger("visas:list");
    }
  }
});


