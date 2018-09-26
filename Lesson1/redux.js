function createStore (state, stateChanger) {
  const listeners = []
  const subscribe = listener => listeners.push(listener)
  const getState = () => state
  const dispatch = action => {
    stateChanger(state, action)
    listeners.forEach(listener => listener())
  }
  return { getState, dispatch, subscribe }
}

function stateChanger (state, action) {
  switch (action.type) {
    case 'TEST':
      state.test.text = action.text
      break
    default:
      break
  }
}

// 调用
const store = createStore({test: {text: 'test-content'}}, stateChanger)

store.subscribe(() => render(store.getState()))

store.dispatch({type: 'TEST', text: 'test-change-content'})