vc.module("Entities", function(Entities, vc, Backbone, Marionette, $, _){
  Entities.Visa = Backbone.Model.extend({
    /* urlRoot: "visas", */
    /* localStorage: new Backbone.LocalStorage('visa-calc'), */

    defaults: {
      startDate: "",
      endDate: ""
    },

    initialize: function() {
      this.countDaysTotal();
      this.countDaysLeft();

      this.on('change:startDate', this.countDaysLeft, this);
      this.on('change:endtDate', this.countDaysLeft, this);
      this.on('change:startDate', this.countDaysTotal, this);
      this.on('change:endtDate', this.countDaysTotal, this);
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
      var daysLeft;
      var PERIOD_DAYS = 180;

      this.set({
        daysLeft: 'N/A'
      })
    },

    countDaysTotal: function() {
      // var startDate = moment(this.get('startDate'));
      // var endDate   = moment(this.get('endDate'));
      // var PERIOD_DAYS = 180;

      // var model = this;
      // var fetchingVisaEntries = vc.request("visaEntries:entities", model.get("id"));
      // $.when(fetchingVisaEntries).done(function(visaEntries) {
      //   var daysSum = 0,
      //       entries = [];

      //   visaEntries.each(function(i) {
      //     entries.push({ startDate: i.get('startDate'), endDate: i.get('endDate') })
      //   });

      //   var datePeriodStart = moment().subtract('days', PERIOD_DAYS),
      //       entriesSum = 0,
      //       d,
      //       entry;
      //   /* console.log( datePeriodStart.format("MM DD YYYY") ) */

      //   var i = 0;
      //   for (i in entries) {
      //     entry = entries[i];
      //     d = moment(entry.startDate);
      //     /* while ( !d.isSame(entry.endDate) ) { */
      //     while ( moment(entry.endDate).diff(d, 'days') >= 0 ) {
      //       // console.log( moment(entry.endDate).diff(d, 'days') )
      //       // console.log( d.format('MM DD YYYY'), datePeriodStart.format('MM DD YYYY') )
      //       // console.log(d.isAfter(datePeriodStart), d.isSame(datePeriodStart))
      //       if ( d.isAfter(datePeriodStart) || d.isSame(datePeriodStart) ) {
      //         entriesSum++;
      //         /* console.log('+') */
      //       }
      //       d.add('days', 1);
      //     }
      //   }

      //   /* console.log('sum: ', entriesSum) */
      //   return entriesSum;
      // });

      // this.set({
      //   daysTotal: endDate.diff(startDate, 'days')
      // });
    }
  });

  /* Entities.configureStorage(Entities.Visa); */

  Entities.VisaCollection = Backbone.Collection.extend({
    /* url: "visas", */
    model: Entities.Visa,
    comparator: "id",
    localStorage: new Backbone.LocalStorage('visa'),
  });

  /* Entities.configureStorage(Entities.VisaCollection); */

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
      if (typeof vc.visas === 'undefined') {
        vc.visas = new Entities.VisaCollection();
      }
      vc.visas.fetch({
        success: function(data) {
          if (typeof callback === 'function') {
            callback(data)
          }
          return data
        }
      });
    },

    getVisaEntity: function(visaId) {
      return vc.visas.get(visaId)
    },

    getNewVisaEntity: function() {
      var defer = $.Deferred();
      vc.request("visa:entities", function(data) {
        var visas = data;
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

