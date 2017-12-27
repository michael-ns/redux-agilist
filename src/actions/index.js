let nextTodoId = 0
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})

export const addMember = (card) => ({
  type: 'ADD_MEMBER',
  card
})

export const addPractice = (card) => ({
  type: 'ADD_PRACTICE',
  card
})

export const endTurn = (nextTurn) => ({
  type: 'END_TURN',
  nextTurn
})
