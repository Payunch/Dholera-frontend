// HOC directory index
import React from 'react';

export function withadminContext(Component) {
  return function WrappedComponent(props) {
    return <Component {...props} />;
  };
}
