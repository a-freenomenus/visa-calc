vc.module("VisasApp.Edit", function(Edit, vc, Backbone, Marionette, $, _){
  Edit.Controller = {
    editVisa: function(visaId) {
      console.log('edit visa', visaId)
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
    }
  }
});

