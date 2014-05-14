vc.module("Entities", function(Entities, vc, Backbone, Marionette, $, _){
  Entities.Visa = Backbone.RelationalModel.extend({
    urlRoot: "visas",

    relations: [{
      type: "HasMany",
      key: "entries",
      relatedModel: "vc.Entities.VisaEntry",
      collectionType: "vc.Entities.VisaEntriesCollection",
      reverseRelation: {
        key: "visaId"
      }
    }],

    initialize: function() {
      this.countDaysLeft();
      this.on('change:startDate', this.countDaysLeft, this);
      this.on('change:endtDate', this.countDaysLeft, this);
    },

    validate: function(attrs, options) {
      var errors = {};

      // if (! attrs.firstName) {
      //   errors.firstName = "can't be blank";
      // }

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


  var initializeVisas = function() {
    var visas = new Entities.VisaCollection([
      {
        id: 1,
        name: 'Visa 1',
        startDate: '10/10/10',
        endDate: '10/10/11',
        type: 'M'
      },
      {
        id: 2,
        name: 'Visa 2',
        startDate: '10/10/11',
        endDate: '10/10/12',
        type: 'M'
      },
      {
        id: 3,
        name: 'Visa 3',
        startDate: '10/10/13',
        endDate: '10/10/14',
        type: 'M'
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

      setTimeout(function() {
        visas.fetch({
          success: function(data) {
            defer.resolve(data);
          }
        });
      }, 1000);

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

      setTimeout(function() {
        visa.fetch({
          success: function(data) {
            defer.resolve(data);
          },
          error: function(data) {
            defer.resolve(undefined);
          }
        });
      }, 1000);


      return defer.promise();
    }
  }

  vc.reqres.setHandler("visa:entities", function() {
    return API.getVisaEntities();
  });

  vc.reqres.setHandler("visa:entity", function(id) {
    return API.getVisaEntity(id);
  });
});

