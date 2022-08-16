import { createContext } from "react";

export const initialAppState: AppState = {
  todos: [],
};

export const appReducer = (
  state: AppState,
  action: AppReducerAction
): AppState => {
  let { payload, type } = action;

  switch (type) {
    case "TODO/ADD": {
      return {
        ...state,
        todos: [...state.todos, payload],
      };
    }
    case "TODO/SET": {
      return {
        ...state,
        todos: payload,
      };
    }
    case "TODO/REMOVE": {
      return {
        ...state,
        todos: [
          ...state.todos.map((todo) =>
            todo.id === payload
              ? { ...todo, removed: !todo.removed, updated_at: new Date() }
              : todo
          ),
        ],
      };
    }
    case "TODO/DELETE": {
      return {
        ...state,
        todos: [...state.todos.filter((todo) => todo.id !== payload)],
      };
    }
    case "TODO/DONE": {
      return {
        ...state,
        todos: [
          ...state.todos.map((todo) =>
            todo.id === payload
              ? { ...todo, done: !todo.done, updated_at: new Date() }
              : todo
          ),
        ],
      };
    }
    default: {
      return state;
    }
  }
};

export const AppContext = createContext<AppState>({
  todos: [],
});
