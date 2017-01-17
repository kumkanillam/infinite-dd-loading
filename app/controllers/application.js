import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
    appName: 'lazy-loading',
    color: 'blue',
    init() {
        this._super(...arguments);
        this.set('names', ['onoe', 'two', 'three', 'four']);
    },
    doSearch: task(function*(searchStr) {
        console.log('searchStr ', searchStr);
        yield timeout(3000);
        return [1, 2, 3];
    }),
    actions: {
        changeName(name) {
            console.log(' selected name', name);
        },
        searchAsync(searchStr) {
            console.log('searchAsync ', searchStr);
            let value = this.get('doSearch').perform(searchStr);
            return value;
        }
    }
});