import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';
export default Ember.Component.extend({
    searchVal: '',
    searchTask: task(function*() {
        console.log(" started to wait for ", this.get('searchVal'));
        yield timeout(250);
        let searchVal = this.get('searchVal');
        let url = `https://api.github.com/search/repositories?q=${searchVal}`;
        let result = yield this.get('doSearch').perform(url);
        console.log('waiting time over for ', this.get('searchVal'));
        return result;
    }).restartable(),
    doSearch: task(function*(url) {
        try {
            var xhr = Ember.$.getJSON(url);
            return yield xhr.promise();
        } finally {
            xhr.abort();
        }
    }),
    actions: {
        doSearch(value) {
            this.set('searchVal', value);
            this.get('searchTask').perform();
        }
    }
});