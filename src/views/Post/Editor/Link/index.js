import React from 'react';
import { Popover, PopoverInteractionKind } from '@blueprintjs/core';

import './styles.scss';

export class Link extends React.Component {
  render() {
    const { children, href } = this.props;

    return (
      <Popover
        interactionKind={PopoverInteractionKind.HOVER}
        content={(
          <div
            className="markdown-viewer__link-popover">
            <a
              href={href}
              target="_blank">
              {href}
            </a>
          </div>
        )}>
        <a
          href={href}
          onClick={e => e.preventDefault()}>
          {children}
        </a>
      </Popover>
    );
  }
}

export default Link;
