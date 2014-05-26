vc.module("Entities", function(Entities, vc, Backbone, Marionette, $, _){
  Entities.VisaEntry = Backbone.Model.extend({
    urlRoot: "visa-entries"
  });

  Entities.configureStorage(Entities.VisaEntry);

  Entities.VisaEntriesCollection = Backbone.Collection.extend({
    url: "visa-entries",
    model: Entities.VisaEntry,
    comparator: "id"
  });

  Entities.configureStorage(Entities.VisaEntriesCollection);

  /* Create stub collection and models */
  var initializeVisaEntries = function() {
    var visaEntries = new Entities.VisaEntriesCollection([
      {
        id: 1,
        visa_id: 1,
        name: "Visa Entry 1",
        startDate: '05/12/2011',
        endDate: '05/18/2011'
      },
      {
        id: 2,
        visa_id: 1,
        name: "Visa Entry 2",
        startDate: '05/22/2011',
        endDate: '05/28/2011'
      },
      {
        id: 3,
        visa_id: 1,
        name: "Visa Entry 3",
        startDate: '08/12/2011',
        endDate: '08/24/2011'
      },
      {
        id: 4,
        visa_id: 2,
        name: "Visa Entry 4",
        startDate: '08/12/2012',
        endDate: '08/24/2012'
      },
      {
        id: 5,
        visa_id: 2,
        name: "Visa Entry 5",
        startDate: '05/22/2012',
        endDate: '05/28/2012'
      },
      {
        id: 6,
        visa_id: 2,
        name: "Visa Entry 6",
        startDate: '08/12/2012',
        endDate: '08/24/2012'
      },
      {
        id: 7,
        visa_id: 3,
        name: "Visa Entry 7",
        startDate: '05/12/2012',
        endDate: '05/18/2012'
      },
      {
        id: 8,
        visa_id: 3,
        name: "Visa Entry 8",
        startDate: '05/22/2011',
        endDate: '05/28/2011'
      },
      {
        id: 9,
        visa_id: 3,
        name: "Visa Entry 9",
        startDate: '08/12/2011',
        endDate: '08/24/2011'
      }
    ]);

    visaEntries.forEach(function(visaEntry) {
      visaEntry.save();
    });

    return visaEntries.models;
  }

  var API = {
    getVisaEntries: function(visaId) {
      var visaEntries = new Entities.VisaEntriesCollection();
      var defer = $.Deferred();

      visaEntries.fetch({
        success: function(data) {
          defer.resolve(data)
        }
      });

      var promise = defer.promise();
      $.when(promise).done(function(visaEntries) {
        if (visaEntries.length === 0) {
          var models = initializeVisaEntries();
          visaEntries.reset(models);
        }

      });


      return promise;
    },

    getVisaEntry: function(visaEntryId) {
      console.log('getVisaEntries', visaEntryId)
    },

    deleteEntities: function() {
      var visaEntries = new Entities.VisaEntriesCollection();

      visaEntries.fetch({
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

  vc.reqres.setHandler("visaEntries:entities", function(visaId) {
    return API.getVisaEntries(visaId);
  });

  vc.reqres.setHandler("visaEntries:entity", function(visaEntryId) {
    return API.getVisaEntry(visaEntryId);
  });

  vc.reqres.setHandler("visaEntries:deleteAll", function() {
    return API.deleteEntities();
  });
});

