import {
  PROBLEM_FINALIZE,
  PROBLEM_INIT_SUCCESS,
  PROBLEM_SOLUTION_CALCULATED_WRONG,
  PROBLEM_SOLUTION_PROVIDED_SUCCESS,
  PROBLEM_SOLUTION_REFRESH_FAIL,
  PROBLEM_SOLUTION_REFRESH_REQUEST,
  PROBLEM_SOLUTION_REFRESH_SUCCESS
} from "./actions";

export const problem = (
  state = {
    problemJSON: false,
    solution: null
  },
  action
) => {
  switch (action.type) {
    case PROBLEM_INIT_SUCCESS:
      return {
        ...state,
        pathProblem: action.payload
      };
    case PROBLEM_FINALIZE:
      return {
        ...state,
        pathProblem: null,
        solution: null
      };
    case PROBLEM_SOLUTION_REFRESH_REQUEST:
      return {
        ...state,
        solution: {
          ...(state.solution || {}),
          loading: true,
          failed: false,
          checked: false
        }
      };
    case PROBLEM_SOLUTION_PROVIDED_SUCCESS:
      return {
        ...state,
        solution: {
          ...(state.solution || {}),
          provided: action.payload
        }
      };
    case PROBLEM_SOLUTION_REFRESH_SUCCESS:
      return {
        ...state,
        solution: {
          ...(state.solution || {}),
          ...action.payload,
          checked: true,
          loading: false
        }
      };
    case PROBLEM_SOLUTION_CALCULATED_WRONG:
    case PROBLEM_SOLUTION_REFRESH_FAIL:
      return {
        ...state,
        solution: {
          ...(state.solution || {}),
          checked: false,
          loading: false,
          failed: true
        }
      };
    default:
      return state;
  }
};
