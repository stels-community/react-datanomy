import React, { 
  FC,
  PureComponent,
} from 'react';
import { mount } from 'enzyme';
import { 
  createDatanomy, 
  useDatanomy, 
  TReducers, 
  TScenarios 
} from "../src";

interface TTestStore {
  data1: number;
  data2: number;
}

const initialState: TTestStore = {
  data1: 0,
  data2: 0,
}

const reducers:TReducers<TTestStore> = {
  reset: () => initialState,
  change1: (state) => ({...state, data1: state.data1 + 1}),
  change2: (state) => ({...state, data2: state.data2 + 1}),
}

// TODO: test scenarios
const scenarios: TScenarios<TTestStore> = (getState, actiond) => ({
  asyncScript: async () => {
    await new Promise(ok => setTimeout(ok, 1000))
  }
})

describe("Datanomy itself", () => {

  it("should correctly change store", () => {

    const Wrapper: FC = () => {
      // TODO: test scripts 
      const [store, actions, scripts] = useDatanomy(initialState, reducers, scenarios)
      return (
        <div data-testid="component-data1" onClick={actions.change}>{store.data1}</div>
      )
    }

    const component = mount(<Wrapper/>)
    
    expect(component.find('[data-testid="component"]').text()).toEqual("0")
    component.simulate("click")
    expect(component.find('[data-testid="component"]').text()).toEqual("1")

  })

  it("should return correct Artifacts", () => {

    const [TestProvider, useTestHook, testContext] = createDatanomy(initialState, reducers, scenarios)
    
    expect(TestProvider).toBeInstanceOf(Function)
    expect(useTestHook).toBeInstanceOf(Function)
    expect(testContext).toBeInstanceOf(Object)

  })
})

describe("Datanomy generated logic", () => {

  it("should correctly translate context values and receive its with hook", () => {

    const [TestProvider, useTestHook, ] = createDatanomy(initialState, reducers, scenarios)
    
    const TestComponent: FC = () => {
      // TODO: test scripts 
      const [store, actions, scripts] = useTestHook()
      return (
        <div data-testid="hooked-component" onClick={actions.change}>{store.data1}</div>
      )
    }

    const Wrapper: FC = () => {
      return (
        <TestProvider>
          <TestComponent/>
        </TestProvider>
      )
    }
    
    const component = mount(<Wrapper/>)
    
    expect(component.find('[data-testid="hooked-component"]').text()).toEqual("0")
    component.simulate("click")
    expect(component.find('[data-testid="hooked-component"]').text()).toEqual("1")

  })

  it("should correctly translate context values and receive its with consummer", () => {

    const [TestProvider, , testContext] = createDatanomy(initialState, reducers, scenarios)
    
    const TestComponent: FC = () => {
      return (
        <testContext.Consumer>
          {/* TODO: test scripts  */}
          {([store, actions, scripts]) => (
            <div data-testid="condumer-component" onClick={actions.change}>{store.data1}</div>
          )}
        </testContext.Consumer>
      )
    }
    
    const Wrapper: FC = () => {
      return (
        <TestProvider>
          <TestComponent/>
        </TestProvider>
      )
    }
    
    const component = mount(<Wrapper/>)
    
    expect(component.find('[data-testid="condumer-component"]').text()).toEqual("0")
    component.simulate("click")
    expect(component.find('[data-testid="condumer-component"]').text()).toEqual("1")

  })
  
  it("should correctly translate context values and receive its with contextType", () => {

    const [TestProvider, , testContext] = createDatanomy(initialState, reducers, scenarios)
    
    class TestComponent extends PureComponent {
      static contextType = testContext
      
      remder(){
        
        // TODO: test scripts 
        const [store, actions, scripts] = this.context
        
        return (
          <div data-testid="class-component" onClick={actions.change}>{store.data1}</div>
        )
      }
    }
    
    const Wrapper: FC = () => {
      return (
        <TestProvider>
          <TestComponent/>
        </TestProvider>
      )
    }
    
    const component = mount(<Wrapper/>)
    
    expect(component.find('[data-testid="class-component"]').text()).toEqual("0")
    component.simulate("click")
    expect(component.find('[data-testid="class-component"]').text()).toEqual("1")

  })
  
})
