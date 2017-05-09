import React from 'react';
import { forEach } from 'lodash';

export function isEmpty(value){
  return  value === undefined ||
          value === null ||
          (typeof value === "object" && Object.keys(value).length === 0) ||
          (typeof value === "string" && value.trim().length === 0)
};

export function recursivelyMapChildren(children, addedProperties) {
    return React.Children.map(children, child => {
        if (!React.isValidElement(child)) {
            return child;
        }

        return React.cloneElement(child, {
            ...child.props,
            ...addedProperties(child),
            children: recursivelyMapChildren(child.props.children, addedProperties)
        });
    })
};

export function getChildren(children, type) {
  return React.Children.map(children, child => {
      if (child.type === type) {
        return child;
      }

      let result = [];
      if (React.isValidElement(child)) {
        forEach(getChildren(child.props.children, type), (child) => {
          result.push(child);
        });
      }

      return result;
  })
}
