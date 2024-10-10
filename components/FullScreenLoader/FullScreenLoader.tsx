import React from 'react';

import { Loader } from '../ui/loader';

export const FullScreenLoader = () => {
  return (
    <div className="grid h-screen w-screen place-content-center">
      <Loader size={40} />
    </div>
  );
};
