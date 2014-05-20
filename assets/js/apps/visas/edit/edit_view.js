vc.module("VisasApp.Edit", function(Edit, vc, Backbone, Marionette, $, _){
  Edit.Visa = Marionette.ItemView.extend({
    template: "#visa-form",

    events: {
      "click .js-submit": "submitClicked"
    },

    onRender: function() {
      this.$el.find("#visa-startDate").datepicker({})
      this.$el.find("#visa-endDate").datepicker({})
    },

    submitClicked: function(e) {
      e.preventDefault();
      var data = Backbone.Syphon.serialize(this);
      this.trigger("form:submit", data);
    },

    onFormDataInvalid: function(errors) {
      var $view = this.$el;

      var clearFormErrors = function() {
        var $form = $view.find("form");
        $form.find(".help-inline.error").each(function() {
          $(this).remove();
        });
        $form.find(".control-group.error").each(function() {
          $(this).removeClass("error");
        });
      }

      var markErrors = function(value, key) {
        var $controlGroup = $view.find("#visa-" + key).parent();
        var $errorEl = $("<span>", {class: "help-inline error", text: value});
        $controlGroup.append($errorEl).addClass("error");
      }

      clearFormErrors();
      _.each(errors, markErrors);
    }
  });

});

