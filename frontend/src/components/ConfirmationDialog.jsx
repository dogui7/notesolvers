import React from 'react'

export default function ConfirmationDialog(props) {
  return (
    <div>
      <p>{props.message}</p>
      <button onClick={props.onConfirm}>Confirm</button>
      <button onClick={props.onCancel}>Cancel</button>
    </div>
  );
}