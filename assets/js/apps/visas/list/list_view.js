vc.module("VisasApp.List", function(List, vc, Backbone, Marionette, $, _){
  List.Visa = Marionette.ItemView.extend({
    tagName: "tr",
    template: "#visas-list-item",

    events: {
      "click .js-delete": "deleteClicked",
      "click .js-show": "showClicked"
    },

    deleteClicked: function(e) {
      e.preventDefault();
      this.trigger("visa:delete", this.model);
    },

    showClicked: function(e) {
      e.preventDefault();
      this.trigger("visa:show", this.model);
    },

    remove: function() {
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
});

