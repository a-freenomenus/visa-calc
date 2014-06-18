vc.module("Entities", function(Entities, vc, Backbone, Marionette, $, _){
  Entities.Visa = Backbone.Model.extend({
    defaults: {
      startDate: "",
      endDate: ""
    },

    initialize: function() {
      this.countDaysTotal();

      this.on('change', this.countDaysTotal, this);
    },

    validate: function(attrs, options) {
      var errors = {};

      if (! attrs.name) {
        errors.name = "can't be blank";
      }

      if (! attrs.startDate) {
        errors.startDate = "can't be blank";
      }

      if (! attrs.endDate) {
        errors.endDate = "can't be blank";
      }

      // if (! attrs.lastName) {
      //   errors.lastName = "can't be blank";
      // } else {
      //   if (attrs.lastName.length < 2) {
      //     errors.lastName = "is too short";
      //   }
      // }

      if ( ! _.isEmpty(errors)) {
        return errors;
      }
    },

    countDaysTotal: function() {
      var startDate = moment(this.get('startDate'));
      var endDate   = moment(this.get('endDate'));
      var daysTotal = endDate.diff(startDate, 'days') + 1;

      this.set({
        daysTotal: daysTotal
      });
    }
  });

  Entities.VisaCollection = Backbone.Collection.extend({
    model: Entities.Visa,
    comparator: "id",
    localStorage: new Backbone.LocalStorage('visa'),
  });

  /* Create stub collection and models */
  var initializeVisas = function() {
    var visas = new Entities.VisaCollection([
      {
        id: 1,
        name: 'Visa 1',
        startDate: '10/10/2010',
        endDate: '10/10/2011'
      },
      {
        id: 2,
        name: 'Visa 2',
        startDate: '10/10/2011',
        endDate: '10/10/2012'
      },
      {
        id: 3,
        name: 'Visa 3',
        startDate: '10/10/2013',
        endDate: '10/10/2014'
      }
    ]);

    visas.forEach(function(visa) {
      visa.save();
    });

    return visas.models;
  }

  var API = {
    getVisaEntities: function(callback) {
      var defer = $.Deferred();
      if (typeof vc.visas === 'undefined') {
        vc.visas = new Entities.VisaCollection();
      }
      vc.visas.fetch({
        success: function(data) {
          defer.resolve(data)
        }
      });
      return defer.promise()
    },

    getVisaEntity: function(visaId) {
      return vc.visas.get(visaId)
    },

    getNewVisaEntity: function() {
      var defer = $.Deferred();
      var fetchingVisas = vc.request("visa:entities");
      $.when(fetchingVisas).done(function(visas) {
        // get visa id
        var newId = 1;
        if (visas.length) {
          var lastModelId = visas.pop().get('id');
          newId = ++lastModelId;
        }
        // create new visa object
        var visa = new Entities.Visa({id: newId});
        defer.resolve(visa);
      });
      return defer.promise();
    },

    deleteEntities: function() {
      var visas = new Entities.VisaCollection();

      visas.fetch({
        success: function(data) {
          var model;
          while (model = data.first()) {
            model.destroy();
          }
        },
        reset: true
      });

      return true;
    }
  }

  vc.reqres.setHandler("visa:entities", function(callback) {
    return API.getVisaEntities(callback);
  });

  vc.reqres.setHandler("visa:entity", function(id) {
    return API.getVisaEntity(id);
  });

  vc.reqres.setHandler("visa:newEntity", function() {
    return API.getNewVisaEntity();
  });

  vc.reqres.setHandler("visa:deleteAll", function() {
    return API.deleteEntities();
  });
});

