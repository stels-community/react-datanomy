import React, { 
  useRef, 
  useMemo, 
  useReducer, 
  useContext, 
  createContext, 
  ReactNode,
  Context,
  FC,
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

export type TScenarios<TState> = 
  (getState: () => TState, actions: TActions) => TScripts;

export function useDatanomy<TState>(
  initialState: TState, 
  reducers: TReducers<TState>, 
  scenarios?: TScenarios<TState>
): [TState, TActions, TScripts] {
  
  function reducer(
    store: TState, 
    {type, payload}: {type: string, payload: any}
  ): TState {
    return type in reducers ? reducers[type](store, payload) : store;
  };
  
  const [store, dispatch] = useReducer(reducer, initialState);
  
  const actions: TActions = useMemo(() => Object.keys(reducers).reduce(
    (actions: TActions, type) => { 
      actions[type] = (payload: any) => dispatch({type, payload}) 
      return actions
    }, {} as TActions

  // eslint-disable-next-line
  ), []);

  const stored = useRef(store);
  const state = useMemo(() => {
    stored.current = store;
    return stored;
  }, [store]);
  
  // eslint-disable-next-line
  const scripts = !scenarios ? {} : useMemo(() => scenarios(() => state.current, actions), []);
  
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
  
  const context = createContext<TDatanomyContext<TState>>(
    [initialState, {}, {}]
  );

  const { Provider } = context;
  
  const DatanomyProvider: FC<IProviderProps> = ({children}) => {
    const [
      store, actions, scripts
    ] = useDatanomy<TState>(initialState, reducers, scenarios);
    return (
      <Provider value={[store, actions, scripts]}>
          {children}
      </Provider>
    );
  };
  
  function useHook(): TDatanomyContext<TState> {
    return useContext(context);
  }
  
  return [ DatanomyProvider, useHook, context ];
};
