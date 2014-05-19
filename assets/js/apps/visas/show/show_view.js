vc.module("VisasApp.Show", function(Show, vc, Backbone, Marionette, $, _){
  Show.VisaEntry = Marionette.ItemView.extend({
    template: "#visa-entry-view",
    tagName: "tr"
  });

  Show.Visa = Marionette.CompositeView.extend({
    template: "#visa-view",
    tagName: "div",
    className: "",
    itemView: Show.VisaEntry,
    itemViewContainer: "#visa-entries tbody",

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

