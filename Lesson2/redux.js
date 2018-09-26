function createStore (state, stateChanger) {
  const listeners = []
  const subscribe = listener => listeners.push(listener)
  const getState = () => state
  const dispatch = action => {
    state = stateChanger(state, action)
    listeners.forEach(listener => listener())
  }
  return { getState, dispatch, subscribe }
}

// Lesson2 修改，返回共享结构的对象
function stateChanger (state, action) {
  switch (action.type) {
    case 'TEST':
      return {
        test: {
          text: 'test-change-content'
        }
      } 
    default:
      return state
  }
}

// 调用
const store = createStore({test: {text: 'test-content'}}, stateChanger)

store.subscribe(() => render(store.getState()))

store.dispatch({type: 'TEST', text: 'test-change-content'})