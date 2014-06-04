vc.module("VisasApp.Edit", function(Edit, vc, Backbone, Marionette, $, _){
  Edit.Controller = {
    editVisa: function(visaId) {
      var loadingView = new vc.Common.Views.Loading({});
      vc.mainRegion.show(loadingView);

      var fetchingVisa = vc.request("visa:entity", visaId);
      $.when(fetchingVisa).done(function(visa) {
        var visaView;

        if (visa !== undefined) {
          visaView = new Edit.Visa({
            model: visa
          });

          visaView.on("form:submit", function(data) {
            if (visa.save(data)) {
              vc.trigger("visa:show", visa.get("id"));
            } else {
              visaView.triggerMethod("form:data:invalid", visa.validationError);
            }
          });

        } else {
          visaView = new vc.VisasApp.Show.MissingVisa();
        }

        vc.mainRegion.show(visaView);
      });
    },

    editVisaEntry: function(entryId) {
      var loadingView = new vc.Common.Views.Loading({});
      vc.mainRegion.show(loadingView);

      var fetchingVisaEntry = vc.request("visaEntries:entity", entryId);
      $.when(fetchingVisaEntry).done(function(visaEntry) {
        var visaEntryView;

        if (visaEntry !== undefined) {
          visaEntryView = new Edit.VisaEntry({
            model: visaEntry
          });

          visaEntryView.on("form:submit", function(data) {
            if (visaEntry.save(data)) {
              vc.trigger("visa:show", visaEntry.get("visa_id"));
            } else {
              visaEntryView.triggerMethod("form:data:invalid", visaEntry.validationError);
            }
          });

        } else {
          visaEntryView = new vc.VisasApp.Show.MissingVisaEntry();
        }

        vc.mainRegion.show(visaEntryView);
      });
    }
  }
});

