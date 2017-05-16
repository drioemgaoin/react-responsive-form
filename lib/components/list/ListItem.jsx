import React from 'react';
import bem from 'bem-classname';
import classnames from 'classnames';

import FieldComponent from '../FieldComponent';

import './list-item.scss';

export default class ListItem extends React.Component {
  render() {
      const className = classnames(
          'list-item ' + bem('list-item', 'edit', [this.props.value === this.props.selectedValue ? 'selected' : '']),
          this.props.className
      );
      return (
          <li name={this.props.name}
            value={this.props.value}
            className={className}
            onClick={this.props.onClick}>
            {this.props.children}
          </li>
      );
  }
}
