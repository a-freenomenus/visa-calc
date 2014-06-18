vc.module("VisasApp.Show", function(Show, vc, Backbone, Marionette, $, _){
  Show.VisaEntry = Marionette.ItemView.extend({
    template: "#visa-entry-view",
    tagName: "tr",

    events: {
      "click .js-delete": "deleteClicked"
    },

    deleteClicked: function(e) {
      e.preventDefault();
      this.trigger("visaEntry:delete", this.model);
    }
  });

  Show.Visa = Marionette.CompositeView.extend({
    template: "#visa-view",
    tagName: "div",
    className: "",
    itemView: Show.VisaEntry,
    itemViewContainer: "#visa-entries tbody",

    onRender: function() {
      if (this.collection.length) {
        this.$el.find('#visa-entries').removeClass('hidden')
      }
    },

    events: {
      "click .js-edit": "editClicked",
      "click .js-new-visa-entry": "newVisaEntry",
      "click .js-list-visas": "listVisas"
    },

    editClicked: function(e) {
      e.preventDefault();
      this.trigger("visa:edit", this.model);
    },

    listVisas: function(e) {
      e.preventDefault();
      vc.trigger("visas:list");
    },

    newVisaEntry: function(e) {
      e.preventDefault();
      vc.trigger("visaEntry:new", this.model.get('id'));
    },

  });

  Show.MissingVisa = Marionette.ItemView.extend({
    template: "#missing-visa-view"
  });

});

