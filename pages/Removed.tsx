import { useContext, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import { AppContext } from "../context/AppContext";

const Removed = () => {
  let ctx = useContext(AppContext);

  let sortedTodos = useMemo(
    () => ctx.todos.filter((todo) => todo.removed === true),
    [ctx.todos]
  );

  return (
    <View style={styles.container}>
      <TodoInput />
      <TodoList todos={sortedTodos} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Removed;
