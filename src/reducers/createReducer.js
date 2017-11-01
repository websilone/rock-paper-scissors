const createReducer = (initialState, handlers) => {
  return (state = initialState, action) => {
    const handler = (action && action.type) ? handlers[action.type] : undefined;

    // if no action was provided, return the actual state
    if (!handler) {
      return state;
    }

    state = handler(state, action);

    return state;
  }
}

export default createReducer;
