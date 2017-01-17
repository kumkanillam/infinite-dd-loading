import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: { searchStr: { refreshModel: true } },
    model(params) {
        console.log(' params', params);
        if (Ember.isPresent(params.searchStr)) {
            //return this.store.
            console.log('params searchStr exists- so do query');
            return this.store.query('technician', { searchStr: params.searchStr });
        }
        return this.store.findAll('technician');
    },
    actions: {
        add(name, email) {
            let record = this.store.createRecord('technician', { name: name, email: email });
            record.save().then((result) => {
                console.log('create success ', result);
            });
        },
        deleteRecord(id) {
            console.log('deleteRecord ', id);
            let record = this.get('store').peekRecord('technician', id);
            console.log(' record', record);
            // this.get('store').destroyRecord(record);
            record.destroyRecord('technician').then(() => {
                console.log(' success ', id);
            })
        }
    }
});