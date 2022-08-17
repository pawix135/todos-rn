import { useContext, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import { AppContext } from "../context/AppContext";

const filterTodos = (todo1: Todo, todo2: Todo) => {
  if (todo1.done < todo2.done) return -1;
  if (todo1.done > todo2.done) return 1;
  return 0;
};

const Home = () => {
  let ctx = useContext(AppContext);

  let sortedTodos = useMemo(
    () => ctx.todos.filter((todo) => todo.removed === false).sort(filterTodos),
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

export default Home;
