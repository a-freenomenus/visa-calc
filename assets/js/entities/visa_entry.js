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
        startDate: '12/05/11',
        endDate: '18/05/11'
      },
      {
        id: 2,
        visa_id: 1,
        name: "Visa Entry 2",
        startDate: '22/05/11',
        endDate: '28/05/11'
      },
      {
        id: 3,
        visa_id: 1,
        name: "Visa Entry 3",
        startDate: '12/08/11',
        endDate: '24/08/11'
      },
      {
        id: 4,
        visa_id: 2,
        name: "Visa Entry 4",
        startDate: '12/05/12',
        endDate: '18/05/12'
      },
      {
        id: 5,
        visa_id: 2,
        name: "Visa Entry 5",
        startDate: '22/05/12',
        endDate: '28/05/12'
      },
      {
        id: 6,
        visa_id: 2,
        name: "Visa Entry 6",
        startDate: '12/08/12',
        endDate: '24/08/12'
      },
      {
        id: 7,
        visa_id: 3,
        name: "Visa Entry 7",
        startDate: '12/05/13',
        endDate: '18/05/13'
      },
      {
        id: 8,
        visa_id: 3,
        name: "Visa Entry 8",
        startDate: '22/05/13',
        endDate: '28/05/13'
      },
      {
        id: 9,
        visa_id: 3,
        name: "Visa Entry 9",
        startDate: '12/08/13',
        endDate: '24/08/13'
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
    }
  }

  vc.reqres.setHandler("visaEntries:entities", function(visaId) {
    return API.getVisaEntries(visaId);
  });

  vc.reqres.setHandler("visaEntries:entity", function(visaEntryId) {
    return API.getVisaEntry(visaEntryId);
  });
});

