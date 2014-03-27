App.Visa = DS.Model.extend({
  name: DS.attr('string'),
  startDate: DS.attr('date'),
  endDate: DS.attr('date'),
  type: DS.attr('string'),
  isCompleted: DS.attr('boolean')
});

App.Visa.FIXTURES = [
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
    startDate: '10/10/10',
    endDate: '10/10/11',
    type: 'M'
  },
  {
    id: 3,
    name: 'Visa 3',
    startDate: '10/10/10',
    endDate: '10/10/11',
    type: 'M'
  }
];
