vc.module("VisasApp.Show", function(Show, vc, Backbone, Marionette, $, _){
  Show.Controller = {
    showVisa: function(id) {
      var loadingView = new vc.Common.Views.Loading({});
      vc.mainRegion.show(loadingView);

      var visa = vc.request("visa:entity", id);
      var visaView;

      if (visa !== undefined) {
        var fetchingVisaEntries = vc.request("visaEntries:entities");
        $.when(fetchingVisaEntries).done(function(visaEntries) {
          if (visaEntries !== undefined) {
            var entries = new vc.Entities.VisaEntriesCollection();
            var filteredData = visaEntries.filter(function(item) {
              return item.get('visa_id') == visa.get("id")
            });
            entries.reset(filteredData)

            visaView = new Show.Visa({
              model: visa,
              collection: entries
            });

            visaView.on("visa:edit", function(visa) {
              vc.trigger("visa:edit", visa.get("id"));
            });

            visaView.on("itemview:visaEntry:delete", function(childView, model) {
              model.destroy();
            });

            vc.mainRegion.show(visaView);
          } else {
            // TODO: show missing
          }
        });

      } else {
        visaView = new Show.MissingVisa();
        vc.mainRegion.show(visaView);
      }
    }
  }
});
