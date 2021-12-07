import React, { 
  Component,
  FC,
} from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { 
  createDatanomy, 
  useDatanomy, 
  TReducers, 
  TScenarios 
} from "../src";

configure({ adapter: new Adapter() });

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
const scenarios: TScenarios<TTestStore> = (/* getState, actions */) => ({
  asyncScript: async () => {

    await new Promise(ok => setTimeout(ok, 1000))
  }
})

describe("Datanomy itself", () => {

  it("should correctly change store", () => {

    const Wrapper: FC = () => {
      // TODO: test scripts 
      const [store, actions, /* scripts */] = useDatanomy(initialState, reducers, scenarios)
      return (
        <div data-testid="component" onClick={actions.change1}>{store.data1}</div>
      )
    }

    const component = mount(<Wrapper/>)
    
    expect(component.find('[data-testid="component"]').text()).toBe("0")
    component.find('[data-testid="component"]').simulate("click")
    component.update()
    expect(component.find('[data-testid="component"]').text()).toBe("1")

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
      const [store, actions, /* scripts */] = useTestHook()
      return (
        <div data-testid="hooked-component" onClick={actions.change1}>{store.data1}</div>
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
    
    expect(component.find('[data-testid="hooked-component"]').text()).toBe("0")
    component.find('[data-testid="hooked-component"]').simulate("click")
    component.update()
    expect(component.find('[data-testid="hooked-component"]').text()).toBe("1")

  })

  it("should correctly translate context values and receive its with consummer", () => {

    const [TestProvider, , testContext] = createDatanomy(initialState, reducers, scenarios)
    
    const TestComponent: FC = () => {
      return (
        <testContext.Consumer>
          {/* TODO: test scripts  */}
          {([store, actions, /* scripts */]) => (
            <div data-testid="condumer-component" onClick={actions.change1}>{store.data1}</div>
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
    
    expect(component.find('[data-testid="condumer-component"]').text()).toBe("0")
    component.find('[data-testid="condumer-component"]').simulate("click")
    component.update()
    expect(component.find('[data-testid="condumer-component"]').text()).toBe("1")

  })
  
  it("should correctly translate context values and receive its with contextType", () => {

    const [TestProvider, , testContext] = createDatanomy(initialState, reducers, scenarios)
    
    class TestComponent extends Component {

      static contextType = testContext;
      
      render() {
        
        // TODO: test scripts 
        const [store, actions, /* scripts */] = this.context
        
        return (
          <div data-testid="class-component" onClick={actions.change1}>{store.data1}</div>
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
    
    expect(component.find('[data-testid="class-component"]').text()).toBe("0")
    component.find('[data-testid="class-component"]').simulate("click")
    component.update()
    expect(component.find('[data-testid="class-component"]').text()).toBe("1")

  })
  
})
