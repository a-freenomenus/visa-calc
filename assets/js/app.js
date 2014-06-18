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

  vc.request("visa:entities");
  vc.request("visaEntries:entities");

  if (Backbone.history) {
    Backbone.history.start();

    /* Backbone.history.start({pushState: true}); */


    /* if (this.getCurrentRoute() != "visas") { */
    if (this.getCurrentRoute() === "") {
      vc.trigger("visas:list");
    }
  }
});


