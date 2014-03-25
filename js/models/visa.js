App.Visa = DS.Model.extend({
  name: DS.attr('string'),
  isCompleted: DS.attr('boolean')
});

App.Visa.FIXTURES = [
  {
    id: 1,
    name: 'Visa 1'
  },
  {
    id: 2,
    name: 'Visa 2'
  },
  {
    id: 3,
    name: 'Visa 3'
  }
];