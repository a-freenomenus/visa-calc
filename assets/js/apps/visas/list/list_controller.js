vc.module("VisasApp.List", function(List, vc, Backbone, Marionette, $, _){
  List.Controller = {
    listVisas: function() {
      var loadingView = new vc.Common.Views.Loading({});
      vc.mainRegion.show(loadingView);

      var fetchingVisas = vc.request("visa:entities");
      $.when(fetchingVisas).done(function(visas) {
        var visasListView;

        if (visas.length) {
          var VisaInfo = vc.Entities.VisaInfo;
          visasListView = new List.Visas({
            model: new VisaInfo(),
            collection: visas
          });

          visasListView.on("itemview:visa:show", function(childView, model) {
            vc.trigger("visa:show", model.get("id"));
          });

          visasListView.on("itemview:visa:edit", function(childView, model) {
            vc.trigger("visa:edit", model.get("id"));
          });

          visasListView.on("itemview:visa:delete", function(childView, model) {
            var entriesToDelete = vc.visaEntries.where({ visa_id: model.get('id') });
            if (entriesToDelete.length) {
              _.each(entriesToDelete, function(entry) {
                entry.destroy();
              });
            }
            model.destroy();
            vc.trigger("visas:list", true);
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

        var visasListLayout = new List.VisasListLayout();
        visasListLayout.render();
        vc.mainRegion.show(visasListLayout);
        visasListLayout.visas.show(visasListView);

        if (vc.visaEntries.length) {
          var visaEntriesListView = new List.VisaEntries({
            collection: vc.visaEntries
          });
          visasListLayout.entries.show(visaEntriesListView);
        }
      });
    }
  }
});

