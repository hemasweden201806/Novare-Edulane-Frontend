import React from 'react';
import Icon, {
  TYPE_MUTE_CAMERA,
  TYPE_MUTE_MIC,
  TYPE_SCREEN,
  TYPE_LEAVE
} from '../Icon/Icon';

// This is important => Click it => https://miro.medium.com/max/852/1*f1Nlx5oKUMfgjhwhMEEXOA.png
export default function TrayButton({
  type,
  disabled,
  highlighted,
  onClick,
  newButtonGroup
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={'tray-button' + (newButtonGroup ? ' new-group' : '')}>
      <Icon type={type} highlighted={highlighted} />
    </button>
  );
}

export { TYPE_MUTE_CAMERA, TYPE_MUTE_MIC, TYPE_SCREEN, TYPE_LEAVE };
