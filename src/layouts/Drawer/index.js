import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

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

  onViewClick = ({ target }) => {
    const { visible } = this.state;
    if (!visible || this.drawerRef.current.contains(target)) return;
    this.setState({ visible: false });
  }

  render() {
    const { children, drawer, className, directionFrom } = this.props;
    const { visible } = this.state;
    const { onViewClick, toggleDrawer } = this;

    return (
      <div
        className={`layout-drawer ${className}`}
        onClick={onViewClick}>
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
