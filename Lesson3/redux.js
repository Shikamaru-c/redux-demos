function createStore (reducer) {
  let state = null
  const listeners = []
  const subscribe = listener => listeners.push(listener)
  const getState = () => state
  const dispatch = action => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }
  dispatch({}) // Lesson3 修改，初始化 state
  return { getState, dispatch, subscribe }
}

// Lesson3 修改，将初始化 state，合并到 stateChanger
// Lesson2 修改，返回共享结构的对象
function reducer (state, action) {
  if (!state) {
    return {
      test: {text: 'test-content'} 
    }
  }
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
const store = createStore(reducer)

store.subscribe(() => render(store.getState()))

store.dispatch({type: 'TEST', text: 'test-change-content'})