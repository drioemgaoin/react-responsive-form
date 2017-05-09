import React from 'react';

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
