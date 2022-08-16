import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider, Text } from "react-native-paper";
import Home from "./pages/Home";
import { AppContext, appReducer, initialAppState } from "./context/AppContext";
import { useEffect, useReducer, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import Removed from "./pages/Removed";
import Modal from "./components/Modal";

let Tab = createBottomTabNavigator();

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  const [initalLoad, setInitialLoad] = useState<boolean>(true);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

  useEffect(() => {
    if (initalLoad) {
      const initLoad = async () => {
        try {
          setInitialLoad(false);

          let data = await AsyncStorage.getItem("app");

          if (!data) return;

          let json = JSON.parse(data);

          dispatch({
            type: "TODO/SET",
            payload: json,
          });
        } catch (error) {
          console.log(error);
        }
      };
      initLoad();
      return;
    }

    const saveTodo = async () => {
      await AsyncStorage.setItem("app", JSON.stringify(state.todos));
    };

    saveTodo();
  }, [state.todos]);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      <PaperProvider>
        <Modal
          onDismiss={() => setModalVisibility(false)}
          visible={modalVisibility}
        />
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Todo"
            screenOptions={{
              headerLeft: () => (
                <Text
                  style={{ paddingLeft: 10 }}
                  onPress={() => setModalVisibility(true)}
                >
                  Actions
                </Text>
              ),
            }}
          >
            <Tab.Screen
              options={{
                tabBarIcon: ({ color, focused, size }) => (
                  <Ionicons
                    name="list-circle"
                    color={focused ? "blue" : color}
                    size={size}
                  />
                ),
              }}
              name="Todos"
              component={Home}
            />
            <Tab.Screen
              options={{
                tabBarIcon: ({ color, focused, size }) => (
                  <Ionicons
                    name="remove-circle"
                    color={focused ? "blue" : color}
                    size={size}
                  />
                ),
              }}
              name="Removed todos"
              component={Removed}
            />
          </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </PaperProvider>
    </AppContext.Provider>
  );
}
