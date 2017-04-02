const DEFAULT_STATE = {
  list: [],
  loading: false,
  error: null,
}

const tracksReducer = (state = DEFAULT_STATE, action: Object) => {
  switch (action.type) {
  case 'REQUEST_TRACKS':
    return {
      ...state,
      ...DEFAULT_STATE,
      loading: true,
    }
  case 'TRACKS_ERROR':
    return {
      ...state,
      ...DEFAULT_STATE,
      error: action.payload,
    }
  case 'RECEIVE_TRACKS':
    return {
      ...state,
      ...DEFAULT_STATE,
      list: action.payload,
    }
  default:
    return { ...state }
  }
}

export default tracksReducer
