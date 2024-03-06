import { RouteProp } from "@react-navigation/native";
import { Text, View, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamsList } from "../../shared/types/navigation";
import { useSearchMovieById } from "../../features/movies/api";
import { appStyles } from "../../shared/styles";

export interface IMovieDetailProps {
  route: RouteProp<RootStackParamsList, "movie-detail">;
  navigation: StackNavigationProp<RootStackParamsList, "movie-detail">;
}

export default function MovieDetail({ route, navigation }: IMovieDetailProps) {
  const { data: movie, isFetching } = useSearchMovieById(route.params.id);

  if (isFetching) {
    return (
      <View style={appStyles.centerContainer}>
        <Text style={[appStyles.normal, { textAlign: "center" }]}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 16 }}>
      <Image
        source={{ uri: movie?.Poster }}
        style={{
          height: 400,
          width: "100%",
        }}
        resizeMode="cover"
      />
      <View style={[appStyles.horizontalContainer, { marginTop: 8 }]}>
        <Text style={[appStyles.subTitle, { fontSize: 16 }]}>
          {`Year: ${movie?.Year}`}
        </Text>
        <View style={appStyles.filler} />
        <Text style={[appStyles.subTitle, { fontSize: 16 }]}>
          {`Director: ${movie?.Director}`}
        </Text>
      </View>
      <Text style={[appStyles.normal, { marginTop: 16 }]}>{movie?.Plot}</Text>
    </View>
  );
}
