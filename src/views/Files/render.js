import React from 'react';

import Upload from '../../components/Upload';

export const FilesRender = ({ uploaded }) => (
  <div>
    <div>
      <label>
        Envoyer un nouveau fichier :
        <Upload
          onUpload={uploaded} />
      </label>
    </div>
  </div>
);

export default FilesRender;
