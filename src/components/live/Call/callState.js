/**
 * The call state.
 * I'll just leave this here:
 * https://docs.daily.co/reference#introduction 📚
 */
const initialCallState = {
  callItems: {
    local: {
      isLoading: true,
      audioTrack: null,
      videoTrack: null
    }
  },
  clickAllowTimeoutFired: false,
  camOrMicError: null,
  fatalError: null
};

// --- Actions for the reducer. ---

const CLICK_ALLOW_TIMEOUT = 'CLICK_ALLOW_TIMEOUT';
const PARTICIPANTS_CHANGE = 'PARTICIPANTS_CHANGE';
const CAM_OR_MIC_ERROR = 'CAM_OR_MIC_ERROR';
const FATAL_ERROR = 'FATAL_ERROR';

// --- The reducer, do you even reduce? --

function callReducer(callState, action) {
  switch (action.type) {
    case CLICK_ALLOW_TIMEOUT:
      return {
        ...callState,
        clickAllowTimeoutFired: true
      };
    case PARTICIPANTS_CHANGE:
      const callItems = getCallItems(action.participants, callState.callItems);
      return {
        ...callState,
        callItems
      };
    case CAM_OR_MIC_ERROR:
      return { ...callState, camOrMicError: action.message };
    case FATAL_ERROR:
      return { ...callState, fatalError: action.message };
    default:
      throw new Error();
  }
}

function getLocalCallItem(callItems) {
  return callItems['local'];
}

function getCallItems(participants, prevCallItems) {
  let callItems = { ...initialCallState.callItems }; // Ensure we *always* have a local participant
  for (const [id, participant] of Object.entries(participants)) {
    // Show a "loading" state before we receive audio/video tracks.
    const hasLoaded = prevCallItems[id] && !prevCallItems[id].isLoading;
    const missingTracks = !(participant.audioTrack || participant.videoTrack);
    callItems[id] = {
      isLoading: !hasLoaded && missingTracks,
      audioTrack: participant.audioTrack,
      videoTrack: participant.videoTrack
    };
    if (participant.screenVideoTrack || participant.screenAudioTrack) {
      callItems[id + '-screen'] = {
        isLoading: false,
        videoTrack: participant.screenVideoTrack,
        audioTrack: participant.screenAudioTrack
      };
    }
  }
  return callItems;
}

// --- Derived data ---

// True if id corresponds to local participant (*not* their screen share)
function isLocal(id) {
  return id === 'local';
}

function isScreenShare(id) {
  return id.endsWith('-screen');
}

function containsScreenShare(callItems) {
  return Object.keys(callItems).some(id => isScreenShare(id));
}

function getMessage(callState) {
  function shouldShowClickAllow() {
    const localCallItem = getLocalCallItem(callState.callItems);
    const hasLoaded = localCallItem && !localCallItem.isLoading;
    return !hasLoaded && callState.clickAllowTimeoutFired;
  }

  let header = null;
  let detail = null;
  let isError = false;
  if (callState.fatalError) {
    header = `Fatal error: ${callState.fatalError}`;
    isError = true;
  } else if (callState.camOrMicError) {
    header = `Camera or mic access error: ${callState.camOrMicError}`;
    detail =
      'See https://help.daily.co/en/articles/2528184-unblock-camera-mic-access-on-a-computer to troubleshoot.';
    isError = true;
  } else if (shouldShowClickAllow()) {
    header = 'Camera is turned off! Click "Allow" and the camera icon to turn on.';
  } else if (Object.keys(callState.callItems).length === 1) {
    header = 'EDU-Lane Classroom';
    detail = 'The classroom is empty. Can you hear the echo, echo, echo...';
  }
  return header || detail ? { header, detail, isError } : null;
}

export {
  initialCallState,
  CLICK_ALLOW_TIMEOUT,
  PARTICIPANTS_CHANGE,
  CAM_OR_MIC_ERROR,
  FATAL_ERROR,
  callReducer,
  isLocal,
  isScreenShare,
  containsScreenShare,
  getMessage
};
