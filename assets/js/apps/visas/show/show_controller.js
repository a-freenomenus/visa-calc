vc.module("VisasApp.Show", function(Show, vc, Backbone, Marionette, $, _){
  Show.Controller = {
    showVisa: function(id) {
      var loadingView = new vc.Common.Views.Loading({});
      vc.mainRegion.show(loadingView);

      var fetchingVisa = vc.request("visa:entity", id);
      $.when(fetchingVisa).done(function(visa) {
        var visaView;

        if (visa !== undefined) {
          visaView = new Show.Visa({
            model: visa
          });

          visaView.on("visa:edit", function(visa) {
            vc.trigger("visa:edit", visa.get("id"));
          });
        } else {
          visaView = new Show.MissingVisa();
        }

        vc.mainRegion.show(visaView);
      });
    }
  }
});
