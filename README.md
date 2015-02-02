Collection class creates a collection with an optional schema, publish it on the server using some optional rules, and subscribes to it on the client.


Instalation

meteor add purepattern:collection-class

Example:

TvsCC = new CollectionClass('tvs', {
  schema: TvSchema,
  allow: {
    insert: ['belongsToUser'],
    update: ['belongsToUser'],
    remove: ['belongsToUser']
  }
});

Tvs = TvsCC.getCollection();

Multiple allow rules can be defined.

  allow: {
    insert: ['belongsToUser', function(userId, myCollectionObj) {}, otherrules...]
  }
