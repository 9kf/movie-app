import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import MovieList from "./src/screens/movie-list/MovieList";
import MovieDetail from "./src/screens/movie-detail/MovieDetail";

import { RootStackParamsList } from "./src/shared/types/navigation";
import { appStyles } from "./src/shared/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const MainStack = createStackNavigator<RootStackParamsList>();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={appStyles.container}>
        <StatusBar translucent backgroundColor="#FFF4E9" />
        <NavigationContainer>
          <MainStack.Navigator initialRouteName="movie-list">
            <MainStack.Screen
              name={"movie-list"}
              component={MovieList}
              options={{
                title: "Movies",
              }}
            />
            <MainStack.Screen
              name={"movie-detail"}
              component={MovieDetail}
              options={({ route }) => ({ title: route.params.title })}
            />
          </MainStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
