import React from 'react';
import bem from 'bem-classname';
import classnames from 'classnames';
import {isEqual} from 'lodash';

import FieldComponent from '../FieldComponent';
import {FormMode} from '../constants';

import './list-item.scss';

export default class ListItem extends React.Component {
    onClickBound = this.onClick.bind(this);

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.isSelected !== this.props.isSelected;
    }

    onClick(event) {
        event.preventDefault();

        if (this.props.onClick) {
            this.props.onClick(this.props.value);
        }
    }

    render() {
        const isSelected = this.props.mode === FormMode.Edit && this.props.isSelected;
        const className = classnames(
            'list-item ' + bem(
                'list-item',
                this.props.mode === FormMode.Edit ? 'edit' : 'view',
                [isSelected ? 'selected' : '']
            ),
            this.props.className
        );

        return (
            <li className={className}
                name={this.props.name}
                value={this.props.value}
                onClick={this.props.mode === FormMode.Edit ? this.onClickBound : undefined}>
                {this.props.children}
            </li>
        );
    }
}
