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
        $form.find(".help-inline.has-error").each(function() {
          $(this).remove();
        });
        $form.find(".form-group.has-error").each(function() {
          $(this).removeClass("has-error");
        });
      }

      var markErrors = function(value, key) {
        var $controlGroup = $view.find("#visa-" + key).parent();
        var $errorEl = $("<span>", {class: "help-inline error", text: value});
        $controlGroup.append($errorEl).addClass("has-error");
      }

      clearFormErrors();
      _.each(errors, markErrors);
    }
  });

  Edit.VisaEntry = Marionette.ItemView.extend({
    template: "#visa-entry-form-edit",

    events: {
      "click .js-edit-entry-submit": "submitClicked"
    },

    onRender: function() {
      this.$el.find("#visa-entry-startDate").datepicker({})
      this.$el.find("#visa-entry-endDate").datepicker({})
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
        $form.find(".help-inline.has-error").each(function() {
          $(this).remove();
        });
        $form.find(".form-group.has-error").each(function() {
          $(this).removeClass("has-error");
        });
      }

      var markErrors = function(value, key) {
        var $controlGroup = $view.find("#visa-entry-" + key).parent();
        var $errorEl = $("<span>", {class: "help-inline has-error", text: value});
        $controlGroup.append($errorEl).addClass("has-error");
      }

      clearFormErrors();
      _.each(errors, markErrors);
    }

  });

});

