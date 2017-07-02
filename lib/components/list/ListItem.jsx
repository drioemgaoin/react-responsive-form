import React from 'react';
import bem from 'bem-classname';
import classnames from 'classnames';
import {find} from 'lodash';

import FieldComponent from '../FieldComponent';

import './list-item.scss';

export default class ListItem extends React.Component {
  render() {
      const isSelected = Array.isArray(this.props.selectedValue)
        ? find(this.props.selectedValue, x => x === this.props.value)
        : this.props.value === this.props.selectedValue;

      const className = classnames(
          'list-item ' + bem('list-item', 'edit', [isSelected ? 'selected' : '']),
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
