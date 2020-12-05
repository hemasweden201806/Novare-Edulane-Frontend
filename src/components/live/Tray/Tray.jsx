import React, { useContext, useEffect, useState } from 'react';
import TrayButton, {
  TYPE_MUTE_CAMERA,
  TYPE_MUTE_MIC,
  TYPE_SCREEN,
  TYPE_LEAVE
} from '../TrayButton/TrayButton';
import CallObjectContext from '../../../js/states/CallObjectContext';
import { logDailyEvent } from '../../../js/live/logUtils';
import DailyIframe from '@daily-co/daily-js';

/**
 * Gets [isCameraMuted, isMicMuted, isSharingScreen].
 * Doing this here to avoid re-renders.
 */
function getStreamStates(callObject) {
  let isCameraMuted,
    isMicMuted,
    isSharingScreen = false;
  if (callObject && callObject.participants() && callObject.participants().local) {
    const localParticipant = callObject.participants().local;
    isCameraMuted = !localParticipant.video;
    isMicMuted = !localParticipant.audio;
    isSharingScreen = localParticipant.screen;
  }
  return [isCameraMuted, isMicMuted, isSharingScreen];
}

export default function Tray({ onClickLeaveCall, disabled }) {
  const callObject = useContext(CallObjectContext);
  const [isCameraMuted, setCameraMuted] = useState(false);
  const [isMicMuted, setMicMuted] = useState(false);
  const [isSharingScreen, setSharingScreen] = useState(false);

  function toggleCamera() {
    callObject.setLocalVideo(isCameraMuted);
  }

  function toggleMic() {
    callObject.setLocalAudio(isMicMuted);
  }

  function toggleSharingScreen() {
    isSharingScreen ? callObject.stopScreenShare() : callObject.startScreenShare();
  }

  function leaveCall() {
    onClickLeaveCall && onClickLeaveCall();
  }

  /**
   * Capture changes to your audio/video mute state.
   */
  useEffect(() => {
    if (!callObject) return;

    function handleNewParticipantsState(event) {
      event && logDailyEvent(event);
      const [isCameraMuted, isMicMuted, isSharingScreen] = getStreamStates(callObject);
      setCameraMuted(isCameraMuted);
      setMicMuted(isMicMuted);
      setSharingScreen(isSharingScreen);
    }

    // Use initial state
    handleNewParticipantsState();

    // Listen for changes in state
    callObject.on('participant-updated', handleNewParticipantsState);

    // Stop listening for changes in state
    return function cleanup() {
      callObject.off('participant-updated', handleNewParticipantsState);
    };
  }, [callObject]);

  return (
    <div className="tray">
      <TrayButton
        type={TYPE_MUTE_CAMERA}
        disabled={disabled}
        highlighted={isCameraMuted}
        onClick={toggleCamera}
      />
      <TrayButton
        type={TYPE_MUTE_MIC}
        disabled={disabled}
        highlighted={isMicMuted}
        onClick={toggleMic}
      />
      {DailyIframe.supportedBrowser().supportsScreenShare && (
        <TrayButton
          type={TYPE_SCREEN}
          disabled={disabled}
          highlighted={isSharingScreen}
          onClick={toggleSharingScreen}
        />
      )}
      <TrayButton
        type={TYPE_LEAVE}
        disabled={disabled}
        newButtonGroup={true}
        highlighted={true}
        onClick={leaveCall}
      />
    </div>
  );
}
