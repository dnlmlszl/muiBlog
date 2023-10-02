import React from 'react';
import { Outlet } from 'react-router-dom';

const EditLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default EditLayout;
