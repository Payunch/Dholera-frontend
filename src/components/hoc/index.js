// HOC directory index
import React from 'react';

export function withAdminContext(Component) {
  return function WrappedComponent(props) {
    return <Component {...props} />;
  };
}
