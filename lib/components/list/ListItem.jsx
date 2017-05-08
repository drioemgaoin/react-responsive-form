import React from 'react';
import bem from 'bem-classname';
import classnames from 'classnames';

import './list-item.scss';

export default class ListItem extends React.Component {
  onClickBound = this.onClick.bind(this);

  constructor(props) {
    super(props);

    this.state = { selected: false };
  }

  getValue() {
      return this.props.value;
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
