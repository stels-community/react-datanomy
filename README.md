![logo](https://user-images.githubusercontent.com/79456243/145360178-12110388-142d-45e0-9903-95463bb46038.png)
# react-datanomy
### Helper library for organize you state management, using native React.js features

This is most clear way for manage state in React.js, with unnecessary of writing extra excess code, allowing to keep you attention on what you do, instead how

#### Preferencies:

1. Super small: 870 bytes ungzipped!
2. Support both, class and functional components
3. Provide uniform bus, used universally throught all you components tree
4. Without side dependencies - only React enough
5. Have no complex code constructions - very ease to use

## Installation:

```
npm i react-datanomy
```
or
```
yarn add react-datanomy
```

## Usage:

### 1. Create you store module:

```js
// Import createDatanomy from react-datanomy:
import { createDatanomy } from 'react-datanomy'

// Declare you initial state:
const initialState = {
  counter: 0,
  someData: [],
}

// Declare state reducers:
const reducers = {
  increment: (state) => ({ ...state, counter: state.counter + 1 }),
  decrement: (state) => ({ ...state, counter: state.counter - 1 }),
  add: (state, payload) => ({ ...state, counter: state.counter + payload }),
  sub: (state, payload) => ({ ...state, counter: state.counter - payload }),
  reset: (state) => ({ ...state, counter: 0 }),
}

// Optionally declare some complex scenarios:
const scenarios = (getState, actions) => {
  derivedAdd: async (payload) => {
    console.log(getState().counter) // for example 10
    await new Promise((resolve) => {
      setTimeout(() => resolve(acttions.add(payload)), 100)
    })
    console.log(getState().counter) // 10 + payload
  },
}

// Call createDatanomy with above declarations and export it retuns:
export const [ 
  CounterProvider, 
  useCounter,
  CounterContext
] = createDatanomy(initialState, reducers, scenarios)
```

#### Same, using typescript:
```tsx
// Additionally import Treducers and TScenarios types:
import { TReducers, TScenarios, createDatanomy } from 'react-datanomy';
 
// Declare you store interface
interface TCounterStore = {
  counter: number;
  someData: Array<any>;
};

// Type initial state using you store interface
const initialState: TCounterStore = {
  counter: 0,
  someData: [],
};

// Type reducers, using TReducers with store interface as generic argument
const reducers: TReducers<TCounterStore> = {
  increment: (state) => ({ ...state, counter: state.counter + 1 }),
  decrement: (state) => ({ ...state, counter: state.counter - 1 }),
  add: (state, payload) => ({ ...state, counter: state.counter + payload }),
  sub: (state, payload) => ({ ...state, counter: state.counter - payload }),
  reset: (state) => ({ ...state, counter: 0 }),
};

// Type scenarios, using TScenarios with store interface as generic argument
const scenarios: TScenarios<TCounterStore> = (getState, actions) => {
  derivedAdd: async (payload) => {
    console.log(getState().counter) // for example 10
    await new Promise((resolve) => {
      setTimeout(() => resolve(acttions.add(payload)), 100)
    })
    console.log(getState().counter) // 10 + payload
  },
};

export const [ 
  CounterProvider, 
  useCounter,
  CounterContext
// Probide store interface as generic argument to hte createDatanomy
] = createDatanomy<TCounterStore>(initialState, reducers, scenarios)
```

### 2. Import and connect You store provider to the DOM branch
// TODO: Complete readme
```js

```
