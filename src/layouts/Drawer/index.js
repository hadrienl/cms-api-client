import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

export class Drawer extends React.Component {
  static propTypes = {
    drawer: PropTypes.element.isRequired,
    directionFrom: PropTypes.oneOf(['left', 'right']),
  };

  static defaultProps = {
    directionFrom: 'right',
  };

  state = {
    visible: false,
  };

  drawerRef = React.createRef();

  toggleDrawer = e => {
    e.stopPropagation();
    this.setState({ visible: !this.state.visible })
  };

  componentDidMount() {
    document.body.addEventListener('click', this._clickListener = e => {
      const { target } = e;
      const { visible } = this.state;
      if (!visible || this.drawerRef.current.contains(target)) return;
      this.setState({ visible: false });
    });
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this._clickListener);
  }

  render() {
    const { children, drawer, className, directionFrom, ...props } = this.props;
    const { visible } = this.state;
    const { toggleDrawer } = this;

    return (
      <div
        {...props}
        className={`layout-drawer ${className}`}>
        {children({ toggleDrawer })}
        <div
          ref={this.drawerRef}
          className={`layout-drawer__panel layout-drawer__panel--${directionFrom} ${visible ? 'visible' : 'hidden'}`}>
          {drawer}
        </div>
      </div>
    );
  }
};

export default Drawer;
