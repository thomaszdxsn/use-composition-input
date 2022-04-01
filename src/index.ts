import {
  ChangeEventHandler,
  CompositionEventHandler,
  DependencyList,
  useMemo,
  useRef,
} from "react";

interface Callbacks {
  onChange: ChangeEventHandler<HTMLInputElement>;
  onCompositionStart: CompositionEventHandler<HTMLInputElement>;
  onCompositionEnd: CompositionEventHandler<HTMLInputElement>;
}

function useCompositionInput(
  callback: Callbacks["onChange"] & Callbacks["onCompositionEnd"],
  deps: DependencyList
): Callbacks {
  const locked = useRef(false);
  return useMemo(
    () => ({
      onChange: (e) => {
        if (!locked) {
          callback(e);
        }
      },
      onCompositionStart: () => {
        locked.current = true;
      },
      onCompositionEnd: (e) => {
        locked.current = false;
        callback(e);
      },
    }),
    deps
  );
}

export default useCompositionInput;
