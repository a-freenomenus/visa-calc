vc.module("VisasApp.List", function(List, vc, Backbone, Marionette, $, _){
  List.Visa = Marionette.ItemView.extend({
    tagName: "tr",
    template: "#visas-list-item"
  });

  List.Visas = Marionette.CompositeView.extend({
    tagName: "div",
    className: "",
    template: "#visas-list",
    itemView: List.Visa,
    itemViewContainer: "tbody"
  });
});

