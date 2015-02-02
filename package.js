Package.describe({
  name: 'purepattern:collection-class',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Collection wrapper to create & publish & subscribe with rules an schema',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/nachoab/meteor-collection-class',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.use('purepattern:classjs@0.0.1');
  api.use('aldeed:collection2@2.3.1');
  api.addFiles('collection-class.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('purepattern:collection-class');
  api.addFiles('collection-class-tests.js');
});
