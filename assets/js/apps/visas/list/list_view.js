vc.module("VisasApp.List", function(List, vc, Backbone, Marionette, $, _){
  List.Visa = Marionette.ItemView.extend({
    tagName: "tr",
    template: "#visas-list-item",

    events: {
      "click": "showClicked",
      "click .js-delete": "deleteClicked",
      "click .js-show": "editClicked"
    },

    deleteClicked: function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.trigger("visa:delete", this.model);
    },

    showClicked: function(e) {
      e.preventDefault();
      this.trigger("visa:show", this.model);
    },

    editClicked: function(e) {
      e.preventDefault();
      this.trigger("visa:edit", this.model);
    },

    remove: function(e) {
      var self = this;
      this.$el.fadeOut(function() {
        Marionette.ItemView.prototype.remove.call(self);
      });
    }
  });

  List.Visas = Marionette.CompositeView.extend({
    tagName: "div",
    className: "",
    template: "#visas-list",
    itemView: List.Visa,
    itemViewContainer: "tbody",

    events: {
      "click .js-delete-all": "deleteAll"
    },

    deleteAll: function(e) {
      e.preventDefault();
      this.trigger("visas:delete")
    }
  });

  List.MissingVisas = Marionette.ItemView.extend({
    template: "#missing-visas-view"
  });

  List.VisasListLayout = Marionette.Layout.extend({
    template: "#visas-list-layout",

    regions: {
      visas: "#visas-region",
      entries: "#visa-entries-region"
    }
  });

  List.VisaEntry = Marionette.ItemView.extend({
    template: "#visa-entry-view-main",
    tagName: "tr",

    events: {
      "click .js-delete": "deleteClicked"
    },

    deleteClicked: function(e) {
      e.preventDefault();
      this.trigger("visaEntry:delete", this.model);
    }
  });

  List.VisaEntries = Marionette.CompositeView.extend({
    template: "#visa-entries-collection",
    tagName: "div",
    className: "",
    itemView: List.VisaEntry,
    itemViewContainer: "#visa-entries-table tbody"
  });

});

