import React from 'react';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import { Button } from '@material-ui/core';

export default function StartButton({ disabled, onClick }) {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      variant="contained"
      color="primary"
      size="large"
      className="join-button"
      startIcon={<RecordVoiceOverIcon />}>
      Join Classroom
    </Button>
  );
}
