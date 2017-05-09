DONT'T USE IT UNTIL VERSON 1.0.0!!

# react responsive form

Get the AMD module located at `react-responsive-form.js` and include it in your project.

Here is a sample integration:

```js
require.config({
  paths: {
    'react': 'vendor/bower_components/react/react',
    'ReactResponsiveForm': 'react-responsive-form'
  }
});

require(['react', 'ReactResponsiveForm'], function(React, ReactResponsiveForm) {

  React.render(React.createElement(ReactResponsiveForm), document.getElementById('widget-container'));

});
```

## Development

* Development server `npm start`.
* Continuously run tests on file changes `npm run watch-test`;
* Run tests: `npm test`;
* Build `npm run build`;
