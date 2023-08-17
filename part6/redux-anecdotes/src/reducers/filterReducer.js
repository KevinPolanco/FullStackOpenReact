const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload
    default:
      return state
  }
}

export const filterChange = filter => {
  const newFilter = filter.toLocaleLowerCase()
  return {
    type: 'SET_FILTER',
    payload: newFilter,
  }
}

export default filterReducer