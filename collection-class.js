(function(ctx) {

ctx.CollectionClass = new Class({

  allowRules: ['belongsToUser', 'isLogged'],

  options: {
    schema: null,
    allow: []
  },

  initialize: function(collectionName, options) {
    _.defaults(options, this.options);
    this.options = options;

    this.collectionName = collectionName;
    this.collection = new Mongo.Collection(collectionName);

    if (this.options.schema) {
      this.collection.attachSchema(this.options.schema);
    }

    this._setAllowRules();
    this._subscribe();
    this._publish();
  },

  getCollection: function() {
    return this.collection;
  },

  _setAllowRules: function() {
    var that = this;
    var allowRules = {};
    var allowRulesAvailable = this.allowRules;

    // For each allow action
    _.each(this.options.allow, function(rules, action) {
      var rulesFns = [];

      // For each rule for this action
      _.each(rules, function(rule) {
        // Rule can be a string for a common defined in this class
        if (_.isString(rule)) {
          if (allowRulesAvailable.indexOf(rule) > -1) {
            rulesFns.push(that['_'+rule]);
          }
        // Or rule can be a custom function
        } else if (_.isFunction(rule)) {
          rulesFns.push(rule);
        }
      });

      // For this action, all rules defined must be true
      allowRules[action] = function(userId, row) {
        return _.every(_.map(rulesFns, function(ruleFn) {
          return ruleFn(userId, row);
        }));
      };
    });

    this.collection.allow(allowRules);
  },

  _subscribe: function(arguments) {
    if (Meteor.isClient) {
      Meteor.subscribe(this.collectionName);
    }
  },

  _publish: function() {
    if (Meteor.isServer) {
      var that = this;
      Meteor.publish(this.collectionName, function() {
        if (this.userId) {
          return that.collection.find({userId: this.userId});
        }
      });
    }
  },

  _belongsToUser: function(userId, row) {
    return Meteor.user() && userId === row.userId;
  },

  _isLogged: function(userId, row) {
    return Meteor.user();
  }

});

})(this);
