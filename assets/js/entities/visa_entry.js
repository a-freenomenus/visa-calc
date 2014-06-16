vc.module("Entities", function(Entities, vc, Backbone, Marionette, $, _){
  Entities.VisaEntry = Backbone.Model.extend({
    /* urlRoot: "visa-entries", */

    defaults: {
      startDate: "",
      endDate: ""
    },

    initialize: function() {
      this.countDaysTotal();

      this.on('change:startDate', this.countDaysTotal, this);
      this.on('change:endtDate', this.countDaysTotal, this);
    },

    countDaysTotal: function() {
      var startDate = moment(this.get('startDate')),
          endDate   = moment(this.get('endDate')),
          daysDiff = endDate.diff(startDate, 'days');

      this.set({ daysTotal: ++daysDiff });
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

      if ( ! _.isEmpty(errors)) {
        return errors;
      }
    },
  });

  /* Entities.configureStorage(Entities.VisaEntry); */

  Entities.VisaEntriesCollection = Backbone.Collection.extend({
    /* url: "visa-entries", */
    model: Entities.VisaEntry,
    comparator: "id",
    localStorage: new Backbone.LocalStorage('visa-entry'),
  });

  /* Entities.configureStorage(Entities.VisaEntriesCollection); */

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
    getVisaEntries: function(visaId, callback) {
      if (typeof vc.visaEntries === 'undefined') {
        vc.visaEntries = new Entities.VisaEntriesCollection();
      }
      vc.visaEntries.fetch({
        success: function(data) {
          if (typeof callback === 'function') {
            callback(data)
          }
          return data
        },
        error: function(data) {
          return undefined
        }
      });

      // var promise = defer.promise();
      // $.when(promise).done(function(visaEntries) {
      //   if (visaEntries.length === 0) {
      //     var models = initializeVisaEntries();
      //     visaEntries.reset(models);
      //   }
      // });


      /* return defer.promise(); */
    },

    getVisaEntry: function(visaEntryId) {
      return vc.visaEntries.get(visaEntryId);
    },

    deleteEntities: function() {
      var visaEntries = new Entities.VisaEntriesCollection();

      visaEntries.fetch({
        success: function(data) {
          var model;
          while (model = data.first()) {
            model.destroy();
          }
        },
        reset: true
      });

      return true;
    },

    getNewVisaEntryEntity: function() {
      var defer = $.Deferred();
      var visaEntries = vc.visaEntries;
      // get visa id
      var newId = 1;
      if (visaEntries.length) {
        var lastModelId = visaEntries.pop().get('id');
        newId = ++lastModelId;
      }
      // create new visa object
      var visaEntry = new Entities.VisaEntry({id: newId});
      defer.resolve(visaEntry);
      return defer.promise();
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

  vc.reqres.setHandler("visaEntries:newEntity", function() {
    return API.getNewVisaEntryEntity();
  });
});

