import React from 'react';
import { ButtonGroup, Button, Popover, Menu, MenuItem, MenuDivider } from '@blueprintjs/core';

export const SaveButton = ({ label, onClick, onSave, saving, onPublish, onDelete, ...props }) => (
  <ButtonGroup
    {...props}>
    <Button
      text={label}
      onClick={onClick}
    />
    <Popover content={(
      <Menu>
        <MenuItem
          text="Save"
          icon="document"
          onClick={onSave} />
        <MenuItem
          text="Publish"
          icon="document-share"
          onClick={onPublish} />
        <MenuDivider />
        <MenuItem
          text="Delete"
          icon="trash"
          onClick={onDelete} />
    </Menu>
    )}>
      <Button
        text={<i className="fas fa-chevron-down"></i>}
      />
    </Popover>
  </ButtonGroup>
);

export default SaveButton;
