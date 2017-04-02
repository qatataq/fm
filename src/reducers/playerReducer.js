const DEFAULT_STATE = {
  index: 0,
  playing: true,
  track: null,
  volume: 100,
  prevVolume: 100,
}

const playerReducer = (state = DEFAULT_STATE, action: Object) => {
  switch (action.type) {
  case 'LOAD_TRACK':
    return {
      ...state,
      track: action.payload,
    }
  case 'NEXT_INDEX':
    return {
      ...state,
      index: action.payload,
    }
  case 'UPDATE_PLAYING':
    return {
      ...state,
      playing: action.payload,
    }
  case 'UPDATE_VOLUME':
    return {
      ...state,
      volume: action.payload,
      prevVolume: state.volume,
    }
  default:
    return { ...state }
  }
}

export default playerReducer
