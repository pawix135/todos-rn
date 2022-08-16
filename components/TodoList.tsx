import { View, FlatList } from "react-native";
import TodoListItem from "./TodoListItem";

interface Props {
  todos: Todo[];
}
const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={todos}
        renderItem={({ item, index }) => (
          <TodoListItem key={index} todo={item} />
        )}
      />
    </View>
  );
};

export default TodoList;
