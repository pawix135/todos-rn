import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { AppContext } from "../context/AppContext";
import * as Random from "expo-random";

const TodoInput = () => {
  let [todoText, setTodoText] = useState<string>("");

  let ctx = useContext(AppContext);

  const addTodo = () => {
    if (!todoText.trim() || todoText.trim() === "") return;
    ctx.xd({
      type: "TODO/ADD",
      payload: {
        created_at: new Date(),
        updated_at: new Date(),
        removed: false,
        text: todoText.trim(),
        done: false,
        id: Random.getRandomBytes(5).toString(),
      },
    });
    setTodoText("");
  };

  return (
    <View style={styles.addTodo}>
      <TextInput
        label={"Todo"}
        value={todoText}
        style={{ flex: 1, fontSize: 25 }}
        onChangeText={(text) => setTodoText(text)}
      />
      <Button
        mode="contained"
        style={styles.addTodoButton}
        icon={"bookmark-check"}
        onPress={addTodo}
      >
        Add
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  addTodoButton: {
    position: "absolute",
    right: 5,
    top: "50%",
    transform: [{ translateY: -20 }],
  },
  addTodo: {
    height: 75,
    position: "relative",
    flexDirection: "row",
  },
});

export default TodoInput;
