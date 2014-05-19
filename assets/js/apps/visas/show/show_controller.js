vc.module("VisasApp.Show", function(Show, vc, Backbone, Marionette, $, _){
  Show.Controller = {
    showVisa: function(id) {
      var loadingView = new vc.Common.Views.Loading({});
      vc.mainRegion.show(loadingView);

      var fetchingVisa = vc.request("visa:entity", id);
      $.when(fetchingVisa).done(function(visa) {
        var visaView;

        if (visa !== undefined) {

          var fetchingVisaEntries = vc.request("visaEntries:entities", visa.get("id"));
          $.when(fetchingVisaEntries).done(function(visaEntries) {
            if (visaEntries !== undefined) {
              var filteredData = visaEntries.filter(function(item) {
                return item.get('visa_id') == visa.get("id")
              });
              visaEntries.reset(filteredData)

              visaView = new Show.Visa({
                model: visa,
                collection: visaEntries
              });

              visaView.on("visa:edit", function(visa) {
                vc.trigger("visa:edit", visa.get("id"));
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

      });
    }
  }
});
