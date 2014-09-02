vc.module("Entities", function(Entities, vc, Backbone, Marionette, $, _){
  Entities.VisaInfo = Backbone.Model.extend({
    initialize: function() {
      this.countDaysLeft();
      this.countDueDate();
    },

    countDaysLeft: function() {
      var daysLeft = 90;
      // TODO: Count from selected date
      var PERIOD_DAYS = 180,
          entryDate = moment(); // For today

      var datePeriodStart = moment(entryDate).subtract('days', PERIOD_DAYS);

      if (vc.visaEntries.length == 0) {
        daysLeft = 90;
      } else {
        vc.visaEntries.each(function(e) {
          var start = e.get('startDate'),
              end   = e.get('endDate');

          var daysCount = moment(end).diff( start, 'days' ) + 1;
          var day;
          do {
            daysCount--;
            day = moment(start).add('days', daysCount);
            if ( day.isAfter(datePeriodStart) || day.isSame(datePeriodStart) ) {
              /* console.log('+', day.format("MM DD YYYY")) */
              daysLeft--;
            }
          } while (daysCount > 0)
        });
      }

      this.set({
        daysLeft: daysLeft
      });

      return daysLeft;
    },

    countDueDate: function() {
      // date = today + daysLeft
      var dueDate = moment().add(this.countDaysLeft(), 'days');
      this.set({
        dueDate: dueDate.format("MM DD YYYY")
      });

    }
  });
});
