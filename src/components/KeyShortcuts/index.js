import React from 'react';
import PropTypes from 'prop-types';

export class KeyShortcuts extends React.Component {
  static propTypes = {
    shortcuts: PropTypes.arrayOf(PropTypes.shape({
      ctrl: PropTypes.bool,
      meta: PropTypes.bool,
      shift: PropTypes.bool,
      key: PropTypes.string.isRequired,
      callback: PropTypes.func.isRequired,
      preventDefault: PropTypes.bool,
    })),
  };

  componentDidMount() {
    document.body.addEventListener('keydown', this._keydownListener = e => {
      const { ctrlKey, metaKey, shiftKey, key: eKey } = e;
      const { shortcuts = [] } = this.props
      const shortcut = shortcuts.find(({ ctrl, meta, shift, key }) =>
        !!ctrl === !!ctrlKey &&
        !!meta === !!metaKey &&
        !!shift === !!shiftKey &&
        key === eKey);

      if (!shortcut) return;

      const { callback, preventDefault } = shortcut;
      if (preventDefault) {
        e.preventDefault();
      }
      
      callback();
    });
  }

  componentWillUnmount() {
    document.body.addEventListener('keydown', this._keydownListener);
  }

  render() {
    const { children } = this.props;

    return children;
  }
};

export default KeyShortcuts;
