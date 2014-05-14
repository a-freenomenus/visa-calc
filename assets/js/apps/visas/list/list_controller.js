vc.module("VisasApp.List", function(List, vc, Backbone, Marionette, $, _){
  List.Controller = {
    listVisas: function() {
      var loadingView = new vc.Common.Views.Loading({});
      vc.mainRegion.show(loadingView);

      var fetchingVisas = vc.request("visa:entities");
      $.when(fetchingVisas).done(function(visas) {
        var visasListView;

        if (visas.length) {
          visasListView = new List.Visas({
            collection: visas
          });

          visasListView.on("itemview:visa:show", function(childView, model) {
            vc.trigger("visa:show", model.get("id"));
          });

          visasListView.on("itemview:visa:delete", function(childView, model) {
            visas.remove(model);
            model.destroy();
          });

          visasListView.on("visas:delete", function(childView) {
            var model;
            while (model = visas.first()) {
              model.destroy();
            }

            vc.trigger("visas:list");
          });
        } else {
          visasListView = new List.MissingVisas();
        }


        vc.mainRegion.show(visasListView);
      });
    }
  }

});

