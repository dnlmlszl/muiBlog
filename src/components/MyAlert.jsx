import { useState } from 'react';
import { Alert } from 'reactstrap';

const MyAlert = ({ text }) => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <Alert color="info" isOpen={visible} toggle={onDismiss}>
      {text}
    </Alert>
  );
};

export default MyAlert;
