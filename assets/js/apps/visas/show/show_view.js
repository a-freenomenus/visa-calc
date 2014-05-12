vc.module("VisasApp.Show", function(Show, vc, Backbone, Marionette, $, _){
  Show.Visa = Marionette.ItemView.extend({
    template: "#visa-view",

    events: {
      "click .js-edit": "editClicked",
    },

    editClicked: function(e) {
      e.preventDefault();
    }
  });

  Show.MissingVisa = Marionette.ItemView.extend({
    template: "#missing-visa-view"
  });

});

