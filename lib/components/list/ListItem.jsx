import React from 'react';
import bem from 'bem-classname';
import classnames from 'classnames';

import FieldComponent from '../FieldComponent';

import './list-item.scss';

export default class ListItem extends FieldComponent {
  onClickBound = this.onClick.bind(this);

  constructor(props) {
    super(props, { selected: props.selected });
  }

  getLabel() {
      return this.props.children;
  }

  isSelected() {
      return this.state.selected;
  }

  select() {
      this.setState({ selected: true });
  }

  unselect() {
      this.setState({ selected: false });
  }

  onClick(event) {
    event.preventDefault();

    this.setState({ selected: true });

    if (this.props.onClick) {
        this.props.onClick(this);
    }
  }

  render() {
      const className = classnames(
          'list-item ' + bem('list-item', [this.state.selected ? 'selected' : '']),
          this.props.className
      );
      return (
          <li name={this.props.name}
            className={className}
            onClick={this.onClickBound}>
            {this.props.children}
          </li>
      );
  }
}
