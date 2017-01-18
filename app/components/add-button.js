import Ember from 'ember';
const { isNone } = Ember;

function syncDetailsClickHandler() {
    console.log('syncDetailsClickHandler - this', this);
}
export default Ember.Component.extend({
    _bodyClickListener: null,
    didInsertElement() {
        this._super(...arguments);
        this._bodyClickListener = Ember.run.bind(this, this.syncDetailsClickHandler);
        Ember.$(window).on('click', this._bodyClickListener);
    },
    willDestroyElement() {
        //$(window).off('scroll', this.get('syncDetailsClickHandler'));
        this._super(...arguments);
        if (this._bodyClickListener) {
            Ember.$(window).off('click', this._bodyClickListener);
        }
    },
    syncDetailsClickHandler: function(event) {
        var clickedId = this.$(event.target).attr("id");
        console.log(' clickedId ', clickedId);
        var clickedId = this.$(event.target).attr("id");
        var nearestParentElement = this.$(event.target).closest('#AddDiv');
        if (nearestParentElement.length <= 0 && (clickedId === undefined || (clickedId.indexOf('show-div-id') === -1))) {
            $('#AddDiv').hide();
        }
    },
    actions: {
        add() {
            let name = this.get('name');
            let email = this.get('email');
            this.sendAction('addUser', name, email);
        }
    }
});