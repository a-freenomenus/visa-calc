vc.module("VisasApp.New", function(New, vc, Backbone, Marionette, $, _){
  New.Controller = {
    newVisa: function() {
      var loadingView = new vc.Common.Views.Loading({});
      vc.mainRegion.show(loadingView);

      var fetchingVisa = vc.request("visa:newEntity");
      $.when(fetchingVisa).done(function(visa) {
        var visaView;

        if (visa !== undefined) {
          visaView = new New.Visa({
            model: visa
          });

          visaView.on("form:submit", function(data) {
            data.id = visa.get('id')
            vc.visas.create(data)
            vc.trigger("visa:show", visa.get("id"));
            // if (visa.save(data)) {
            //   vc.trigger("visa:show", visa.get("id"));
            // } else {
            //   visaView.triggerMethod("form:data:invalid", visa.validationError);
            // }
          });

          vc.mainRegion.show(visaView);
        }
      });
    },

    newVisaEntry: function(id) {
      var loadingView = new vc.Common.Views.Loading({});
      vc.mainRegion.show(loadingView);

      var fetchingVisaEntry = vc.request("visaEntries:newEntity");
      $.when(fetchingVisaEntry).done(function(visaEntry) {
        var visaEntryView;

        if (visaEntry !== undefined) {
          visaEntry.set("visa_id", id);
          visaEntryView = new New.VisaEntry({
            model: visaEntry
          });

          visaEntryView.on("form:submit", function(data) {
            data.visa_id = visaEntry.get('visa_id')
            data.id = visaEntry.get('id')
            vc.visaEntries.create(data)
            vc.trigger("visa:show", visaEntry.get("visa_id"));
            // if (visaEntry.save(data)) {
            //   vc.trigger("visa:show", visaEntry.get("visa_id"));
            // } else {
            //   visaEntryView.triggerMethod("form:data:invalid", visaEntry.validationError);
            // }
          });

          vc.mainRegion.show(visaEntryView);
        }

      });
    }
  }
});

