import React from 'react';

import Upload from '../../components/Upload';
import List from './List';

export const FilesRender = ({ uploaded }) => (
  <div>
    <div>
      <label>
        Envoyer un nouveau fichier :
        <Upload
          onUpload={uploaded} />
      </label>
    </div>
    <div>
      <List />
    </div>
  </div>
);

export default FilesRender;
