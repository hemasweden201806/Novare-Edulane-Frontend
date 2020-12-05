import React, { useEffect, useRef } from 'react';

export default function Tile(props) {
  // Mom always said life was like a box of props...
  const { videoTrack, audioTrack, isLocalPerson, isLarge, isLoading, onClick } = props;

  const videoEl = useRef(null);
  const audioEl = useRef(null);

  /**
   * When video track changes, update video srcObject
   */
  useEffect(() => {
    videoEl.current && (videoEl.current.srcObject = new MediaStream([videoTrack]));
  }, [videoTrack]);

  /**
   * When audio track changes, update audio srcObject
   */
  useEffect(() => {
    audioEl.current && (audioEl.current.srcObject = new MediaStream([audioTrack]));
  }, [audioTrack]);

  function getLoadingComponent() {
    return isLoading && <p className="loading">Loading...</p>;
  }

  function getVideoComponent() {
    return videoTrack && <video autoPlay muted playsInline ref={videoEl} />;
  }

  function getAudioComponent() {
    return !isLocalPerson && audioTrack && <audio autoPlay playsInline ref={audioEl} />;
  }

  function getClassNames() {
    let classNames = 'tile';
    classNames += isLarge ? ' large' : ' small';
    isLocalPerson && (classNames += ' local');
    return classNames;
  }

  return (
    <div className={getClassNames()} onClick={onClick}>
      <div className="background" />
      {getLoadingComponent()}
      {getVideoComponent()}
      {getAudioComponent()}
    </div>
  );
}
