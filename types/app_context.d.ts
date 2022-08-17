interface AppState {
  todos: Todo[];
  dispatch?: (value: AppReducerAction) => void;
}

type AppReducerActionType =
  | "TODO/ADD"
  | "TODO/REMOVE"
  | "TODO/DELETE"
  | "TODO/SET"
  | "TODO/DONE";

interface AppReducerAction {
  payload?: any;
  type: AppReducerActionType;
}
