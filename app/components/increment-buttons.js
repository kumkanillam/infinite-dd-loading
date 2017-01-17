import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

function sendPress() {
    console.log('sendPress', this);
    this.sendAction('press');
}

function sendRelease() {
    console.log('sendRelease ', this);
    this.sendAction('release');
}
export default Ember.Component.extend({
    count: 0,
    incrementBy: task(function*(inc) {
        let speed = 400;
        while (true) {
            yield timeout(speed);
            this.set('count', this.get('count') + inc);
            speed = Math.max(50, speed * 0.8);
            console.log('spee', speed);
        }
    }),

    // mouseDown: sendPress,
    // mouseUp: sendRelease,
    // mouseLeace: sendRelease
});