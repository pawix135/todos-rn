import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import { AppContext } from "../context/AppContext";

const filterTodos = (todo1: Todo, todo2: Todo) => {
  if (todo1.done < todo2.done) return -1;
  if (todo1.done > todo2.done) return 1;
  return 0;
};

const sortTodos = (todo1: Todo, todo2: Todo) => {
  if (todo1.created_at < todo2.created_at) return -1;
  if (todo1.created_at > todo2.created_at) return 1;
  return 0;
};

const Home = () => {
  let ctx = useContext(AppContext);

  let sortedTodos = useMemo(
    () =>
      ctx.todos
        .filter((todo) => todo.removed === false)
        .sort(filterTodos)
        .sort(sortTodos),
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
