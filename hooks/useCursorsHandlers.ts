import { useContext, useCallback } from 'react';
import { CursorContext } from '@/components/cursor/CursorContext';

interface UseCursorHandlersOptions {
  onMouseEnter?: (event: React.MouseEvent, action: string) => void;
  onMouseLeave?: (event: React.MouseEvent, action: string) => void;
}

const useCursorHandlers = (options: UseCursorHandlersOptions = {}) => {
  const [, setCursor] = useContext(CursorContext);

  const toggleCursor = (action: string, state: boolean) => {
    setCursor((prevCursor) => ({ ...prevCursor, [action]: state }));
  };

  const onMouseEnter = useCallback(
    (event: React.MouseEvent, action: string) => {
      if (options.onMouseEnter) {
        options.onMouseEnter(event, action);
      }
      toggleCursor(action, true);
    },
    [options.onMouseEnter],
  );

  const onMouseLeave = useCallback(
    (event: React.MouseEvent, action: string) => {
      if (options.onMouseLeave) {
        options.onMouseLeave(event, action);
      }
      toggleCursor(action, false);
    },
    [options.onMouseLeave],
  );

  return { onMouseEnter, onMouseLeave, toggleCursor };
};

export default useCursorHandlers;
