import { useState } from 'react';

const useActive = (val = false) => {
  const [active, setActive] = useState(val);
  const activate = active => {
    setActive(true);
  };

  const deactive = () => {
    setActive(false);
  };
  return [active, activate, deactive];
};

export default useActive;
