import React from 'react';
import * as localStorage from 'local-storage';

const useStateWithLocalStorage = (localStorageKey: string, initialValue: any) => {
  const [value, setValue] = React.useState(localStorage.get(localStorageKey) || initialValue || '');

  React.useEffect(() => {
    localStorage.set(localStorageKey, value);
  }, [value]);

  return [value, setValue];
};

export default useStateWithLocalStorage;
