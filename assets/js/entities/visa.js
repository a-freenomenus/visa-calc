vc.module("Entities", function(Entities, vc, Backbone, Marionette, $, _){
  Entities.Visa = Backbone.Model.extend({
    urlRoot: "visas",

    defaults: {
      startDate: "",
      endDate: ""
    },

    initialize: function() {
      this.countDaysLeft();
      this.on('change:startDate', this.countDaysLeft, this);
      this.on('change:endtDate', this.countDaysLeft, this);
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

    countDaysLeft: function() {
      this.set({
        daysLeft: 31
      })
    }
  });

  Entities.configureStorage(Entities.Visa);

  Entities.VisaCollection = Backbone.Collection.extend({
    url: "visas",
    model: Entities.Visa,
    comparator: "id"
  });

  Entities.configureStorage(Entities.VisaCollection);

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
        endDate: '10/10/12'
      },
      {
        id: 3,
        name: 'Visa 3',
        startDate: '10/10/2013',
        endDate: '10/10/214'
      }
    ]);

    visas.forEach(function(visa) {
      visa.save();
    });

    return visas.models;
  }

  var API = {
    getVisaEntities: function() {
      var visas = new Entities.VisaCollection();
      var defer = $.Deferred();

      visas.fetch({
        success: function(data) {
          defer.resolve(data);
        }
      });

      var promise = defer.promise();
      $.when(promise).done(function(visas) {
        if (visas.length === 0) {
          var models = initializeVisas();
          visas.reset(models);
        }
      });

      return promise;
    },

    getVisaEntity: function(visaId) {
      var visa = new Entities.Visa({id: visaId});
      var defer = $.Deferred();

      visa.fetch({
        success: function(data) {
          defer.resolve(data);
        },
        error: function(data) {
          defer.resolve(undefined);
        }
      });

      return defer.promise();
    },

    getNewVisaEntity: function() {
      var defer = $.Deferred();
      var fetchingVisas = vc.request("visa:entities");
      $.when(fetchingVisas).done(function(visas) {
        // get visa id
        var newId = 1;
        if (visas.length) {
          var lastModelId = visas.pop().get('id');
          newId = lastModelId++;
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
        }
      });

      return true;
    }
  }

  vc.reqres.setHandler("visa:entities", function() {
    return API.getVisaEntities();
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

