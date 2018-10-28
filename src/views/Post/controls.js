export default [{
  type: 'text',
  name: 'slug',
  label: 'Slug',
}, {
  type: 'date',
  name: 'publishedAt',
  label: 'Publié le',
}, {
  type: 'group',
  controls: [{
    type: 'checkbox',
    name: 'isEvent',
    local: true,
    initialValue: '!!form.eventFrom',
    label: 'Évènement ?',
  },{
    type: 'date',
    name: 'eventFrom',
    label: 'du',
    hidden: 'local.isEvent !== true',
  }, {
    type: 'date',
    name: 'eventTo',
    label: 'au',
    hidden: 'local.isEvent !== true',
  }]
}, {
  type: 'image',
  name: 'cover',
  label: 'Couverture',
}];