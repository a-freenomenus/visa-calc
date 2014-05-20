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
            if (visa.save(data)) {
              vc.trigger("visa:show", visa.get("id"));
            } else {
              visaView.triggerMethod("form:data:invalid", visa.validationError);
            }
          });
        }

        vc.mainRegion.show(visaView);
      });
    }
  }
});

