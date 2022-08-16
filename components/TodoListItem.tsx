import { useContext } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Surface, Text } from "react-native-paper";
import { AppContext } from "../context/AppContext";

interface Props {
  todo: Todo;
}

const TodoListItem: React.FC<Props> = ({ todo }) => {
  let ctx = useContext(AppContext);

  const setTodoDone = () => {
    ctx.dispatch({ type: "TODO/DONE", payload: todo.id });
  };

  const removeTodo = () => {
    ctx.dispatch({ type: "TODO/REMOVE", payload: todo.id });
  };

  const deleteTodo = () => {
    ctx.dispatch({ type: "TODO/DELETE", payload: todo.id });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={todo.removed ? removeTodo : setTodoDone}
      onLongPress={todo.removed ? deleteTodo : removeTodo}
    >
      <Surface style={[styles.surface]}>
        <Text>{todo.text}</Text>
        <Text style={styles.created}>{todo.created_at.toLocaleString()}</Text>
        <Text style={styles.updated}>{todo.updated_at.toLocaleString()}</Text>
        {todo.done && <View style={styles.done}></View>}
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 10,
  },
  created: {
    position: "absolute",
    left: 2,
    bottom: 5,
  },
  updated: {
    position: "absolute",
    right: 2,
    bottom: 5,
  },
  done: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 5,
    backgroundColor: "blue",
  },
  surface: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
});

export default TodoListItem;
