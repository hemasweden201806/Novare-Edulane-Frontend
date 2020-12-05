import React from 'react';
import Uploady from '@rpldy/uploady';
import UploaderButton from './UploaderButton';

function FileUploader({ setUploadResponse }) {
  return (
    <>
      <Uploady
        destination={{
          url: `https://api.cloudinary.com/v1_1/dyge6kiwf/raw/upload`,
          params: { upload_preset: 'filestorage' }
        }}>
        <UploaderButton setUploadResponse={setUploadResponse} />
      </Uploady>
    </>
  );
}

export default FileUploader;
