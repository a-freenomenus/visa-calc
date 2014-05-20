vc.module("VisasApp", function(VisasApp, vc, Backbone, Marionette, $, _){
  VisasApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "visas": "listVisas",
      "visas/new": "newVisa",
      "visas/:id": "showVisa",
      "visas/:id/edit": "editVisa"
    }
  });

  var API = {
    listVisas: function() {
      VisasApp.List.Controller.listVisas();
    },

    showVisa: function(id) {
      VisasApp.Show.Controller.showVisa(id);
    },

    editVisa: function(id) {
      VisasApp.Edit.Controller.editVisa(id);
    },

    newVisa: function() {
      VisasApp.New.Controller.newVisa();
    }
  }

  vc.on("visas:list", function() {
    vc.navigate("visas");
    API.listVisas();
  });

  vc.on("visa:show", function(id) {
    vc.navigate("visas/" + id);
    API.showVisa(id);
  });

  vc.on("visa:edit", function(id) {
    vc.navigate("visas/" + id + "/edit");
    API.editVisa(id);
  });

  vc.on("visa:new", function() {
    vc.navigate("visas/new");
    API.newVisa();
  });

  vc.addInitializer(function() {
    new VisasApp.Router({
      controller: API
    });
  });
});

