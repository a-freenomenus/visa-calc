vc.module("VisasApp.Show", function(Show, vc, Backbone, Marionette, $, _){
  Show.Controller = {
    showVisa: function(id) {
      var loadingView = new vc.Common.Views.Loading({});
      vc.mainRegion.show(loadingView);

      vc.request("visaEntries:entities");
      var visa = vc.request("visa:entity", id);
      var visaView;

      if (visa !== undefined) {
        if (vc.visaEntries !== undefined) {
          var entries = new vc.Entities.VisaEntriesCollection();
          var filteredData = vc.visaEntries.filter(function(item) {
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

      } else {
        visaView = new Show.MissingVisa();
        vc.mainRegion.show(visaView);
      }
    }
  }
});
