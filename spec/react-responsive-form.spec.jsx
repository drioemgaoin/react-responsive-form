import React from 'react/addons';
import ReactResponsiveForm from '../lib/react-responsive-form.jsx';

describe('ReactResponsiveForm', function() {
  var component;

  beforeEach(function() {
    component = React.addons.TestUtils.renderIntoDocument(
      <ReactResponsiveForm/>
    );
  });

  it('should render', function() {
    expect(component.getDOMNode().className).toEqual('react-responsive-form');
  });
});
