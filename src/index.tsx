import React, { 
  useRef, useMemo, useReducer, useContext, 
  createContext, Context, ReactNode, FC,
} from 'react';

type TActions = {
  [action: string]: (...payload: Array<any>) => void;
};

type TScripts = {
  [script: string]: (...payload: Array<any>) => void | Promise<void>;
};

type TDatanomyContext<TState> = [TState, TActions, TScripts];

interface IProviderProps {
  children: ReactNode;
};

export type TReducers<TState> = {
  [action: string]: (store: TState, payload?: any) => TState;
};

export type TScenarios<TState> = {
  [script: string]: (getContext: () => TDatanomyContext<TState>, payload: any) => void | Promise<void>;
}

export function useDatanomy<TState>(
  initialState: TState, 
  reducers: TReducers<TState>, 
  scenarios?: TScenarios<TState>
): [TState, TActions, TScripts] {
  
  const reducer = (
    store: TState, 
    {type, payload}: {type: string, payload: any}
  ): TState => type in reducers ? reducers[type](store, payload) : store;
  
  const [store, dispatch] = useReducer(reducer, initialState);
  
  const actions: TActions = useMemo(() => Object.keys(reducers).reduce(
    (actions: TActions, type) => ( 
      actions[type] = (payload: any) => {dispatch({type, payload})}, 
      actions
    ), {} as TActions
  // eslint-disable-next-line
  ), []);

  const stored = useRef(store);
  const state = useMemo(() => (stored.current = store, stored), [store]);
  
  const scripts: TScripts = !scenarios 
    ? {}
    : useMemo(() => Object.keys(scenarios).reduce(
        (scripts: TScripts, type): TScripts => (
          scripts[type] = (payload: any) => scenarios[type]( 
            () => [state.current, actions, scripts], 
            payload 
          ),
          scripts 
        ), {} as TScripts
      // eslint-disable-next-line
      ), [])
  
  return [store, actions, scripts];
};

export function createDatanomy<TState>(
  initialState: TState, 
  reducers: TReducers<TState>, 
  scenarios?: TScenarios<TState> 
): [
  FC<IProviderProps>,
  () => TDatanomyContext<TState>,
  Context<TDatanomyContext<TState>>
] {  
  const context = createContext<TDatanomyContext<TState>>([initialState, {}, {}]);

  const { Provider } = context;
  
  const DatanomyProvider: FC<IProviderProps> = ({children}) => (
    <Provider value={useDatanomy<TState>(initialState, reducers, scenarios)}>
        {children}
    </Provider>
  );
  
  const useHook: () => TDatanomyContext<TState> = () => useContext(context);
  
  return [ DatanomyProvider, useHook, context ];
};
