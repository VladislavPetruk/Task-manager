import { useCallback, useState } from 'react';

export const useToggleState = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const toggleState = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  return [state, toggleState] as const;
};
