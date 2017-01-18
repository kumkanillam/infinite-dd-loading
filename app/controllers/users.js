import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        add(name, email) {
            console.log('add in controllesr');
            this.send('addUserInRoute', name, email);
        }
    }
});