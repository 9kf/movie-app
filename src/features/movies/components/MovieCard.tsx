import { Text, View, Image } from "react-native";
import { Search } from "../../../shared/types/movies";
import { appStyles } from "../../../shared/styles";

interface IMoviceCardProps extends Search {}

export default function MovieCard({
  Title,
  Poster,
  imdbID,
  Year,
}: IMoviceCardProps) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Image
        source={{ uri: Poster }}
        style={{
          height: 200,
          width: 200,
        }}
        resizeMode="cover"
      />
      <Text style={appStyles.title} numberOfLines={2} ellipsizeMode="tail">
        {Title}
      </Text>
      <Text style={appStyles.subTitle}>{Year}</Text>
    </View>
  );
}
