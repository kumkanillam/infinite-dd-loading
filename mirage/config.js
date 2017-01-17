export default function() {

    // These comments are here to help you get started. Feel free to delete them.

    /*
      Config (with defaults).

      Note: these only affect routes defined *after* them!
    */

    // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
    // this.namespace = '';    // make this `api`, for example, if your API is namespaced
    // this.timing = 400;      // delay for each request, automatically set to 0 during testing

    /*
      Shorthand cheatsheet:

      this.get('/posts');
      this.post('/posts');
      this.get('/posts/:id');
      this.put('/posts/:id'); // or this.patch
      this.del('/posts/:id');

      http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
    */
    // this.get('/technicians', () => {
    //     return {
    //         "data": [{
    //             "type": "technicians",
    //             "id": "1",
    //             "attributes": {
    //                 "name": "foo",
    //                 "email": "foo@email"
    //             }
    //         }]
    //     };
    // });
    // this.get('/technicians', (schema, requst) => {
    //     schema.technicians.all();
    // })
    // this.get('/technicians');
    this.get('/technicians', (db, request) => {
        let result = [];
        if (Object.keys(request.queryParams).length === 0) {
            result = db.technicians.all();
        } else {
            console.log(' else case');
            let searchStr = request.queryParams['searchStr'];
            result = db.technicians.where((technician) => {
                return technician.name.startsWith(searchStr);
            });
        }
        return result;
    });

    this.del('/technicians/:id');
    this.post('/technicians');
}