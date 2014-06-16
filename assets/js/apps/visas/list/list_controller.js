vc.module("VisasApp.List", function(List, vc, Backbone, Marionette, $, _){
  List.Controller = {
    listVisas: function() {
      var loadingView = new vc.Common.Views.Loading({});
      vc.mainRegion.show(loadingView);

      vc.request("visa:entities");
      var visas = vc.visas,
          visasListView;

      if (visas.length) {
        visasListView = new List.Visas({
          collection: visas
        });

        visasListView.on("itemview:visa:show", function(childView, model) {
          vc.trigger("visa:show", model.get("id"));
        });

        visasListView.on("itemview:visa:delete", function(childView, model) {
          model.destroy()
          // TODO: Remove Entities
        });

        visasListView.on("visas:delete", function(childView) {
          // Delete Visa Entities
          vc.request("visa:deleteAll");

          // Delete Visa Entries Entities
          vc.request("visaEntries:deleteAll");

          vc.trigger("visas:list", true);
        });
      } else {
        visasListView = new List.MissingVisas();
      }

      vc.mainRegion.show(visasListView);
    }
  }
});

