export const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_MOVIES_SUCCESS':
      return {
        loading: false,
        movies: action.payload,
        errorMessage: null
      };
    default:
      return state;
  }
};
