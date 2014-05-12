vc.module("VisasApp", function(VisasApp, vc, Backbone, Marionette, $, _){
  VisasApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "visas": "listVisas",
      "visas/:id": "showVisa",
      "visas/:id/edit": "editVisa"
    }
  });

  var API = {
    listVisas: function() {
      VisasApp.List.Controller.listVisas();
    },

    showVisa: function(id) {

    },

    editVisa: function(id) {

    }
  }

  vc.on("visas:list", function() {
    vc.navigate("visas");
    API.listVisas();
  });

  vc.addInitializer(function() {
    new VisasApp.Router({
      controller: API
    });
  });
});

