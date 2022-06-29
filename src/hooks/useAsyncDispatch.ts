import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";

// Support-type для разворачивания промисов

export type Depromisify<T> = T extends Promise<infer R>
    ? R
    : T extends {
          [name: string]: any;
      }
    ? {
          [P in keyof T]: Depromisify<T[P]>;
      }
    : T;

export const useAsyncDispatch = () => {
    const dispatch = useDispatch();

    return useCallback(
        <S extends AnyAction>(action: S) =>
            dispatch(action) as any as Promise<{
                action: Depromisify<S>;
                value: "payload" extends keyof S ? Depromisify<S["payload"]> : never;
            }>,
        [dispatch]
    );
};
