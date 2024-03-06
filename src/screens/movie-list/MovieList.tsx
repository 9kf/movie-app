import { useState } from "react";
import { Text, View, TouchableOpacity, Pressable } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamsList } from "../../shared/types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";

import MovieCard from "../../features/movies/components/MovieCard";
import { SearchInput } from "../../shared/components";

import { useSearchMovies } from "../../features/movies/api";
import { appStyles } from "../../shared/styles";

export interface IMovieListProps {
  route: RouteProp<RootStackParamsList, "movie-list">;
  navigation: StackNavigationProp<RootStackParamsList, "movie-list">;
}

export default function MovieList({ route, navigation }: IMovieListProps) {
  const [searchText, setSearchText] = useState<string | undefined>(undefined);

  const {
    data,
    error,
    isFetching,
    isFetchingNextPage,
    status,
    fetchNextPage,
    refetch,
  } = useSearchMovies(searchText);

  const handleSearch = (newSearchString: string) => {
    if (newSearchString === "") {
      setSearchText(undefined);
      return;
    }

    setSearchText(newSearchString);
  };

  if (status === "error") {
    return (
      <View style={appStyles.container}>
        <SearchInput
          searchValue={searchText}
          onChangeSearchTextCallback={handleSearch}
        />
        <View style={appStyles.centerContainer}>
          <Text style={[appStyles.normal, { textAlign: "center" }]}>
            Error occured. Please Try Again
          </Text>
          <Text style={[appStyles.subTitle, { textAlign: "center" }]}>
            {error.message}
          </Text>
        </View>
      </View>
    );
  }

  if (status === "pending") {
    return (
      <View style={appStyles.container}>
        <SearchInput
          searchValue={searchText}
          onChangeSearchTextCallback={handleSearch}
        />
        <View style={appStyles.centerContainer}>
          <Text style={[appStyles.normal, { textAlign: "center" }]}>
            Loading...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={appStyles.container}>
      <SearchInput
        searchValue={searchText}
        onChangeSearchTextCallback={handleSearch}
      />
      {data.movies.length > 0 ? (
        <FlashList
          data={data?.movies}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 16, paddingRight: 16 }}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() =>
                navigation.navigate("movie-detail", {
                  id: item?.imdbID!,
                  title: item?.Title!,
                })
              }
              style={[
                index % 2 ? { paddingLeft: 20 } : { paddingRight: 20 },
                { flex: 1 },
              ]}
            >
              <MovieCard {...item!} />
            </Pressable>
          )}
          estimatedItemSize={200}
          // onEndReached={() => !isFetching && fetchNextPage()}
          onRefresh={refetch}
          refreshing={isFetching || isFetchingNextPage}
          ListFooterComponent={
            <TouchableOpacity
              style={appStyles.buttonDefault}
              onPress={() => fetchNextPage()}
            >
              <Text style={[appStyles.normal, { textAlign: "center" }]}>
                Load More
              </Text>
            </TouchableOpacity>
          }
        />
      ) : (
        <View style={appStyles.centerContainer}>
          <Text style={[appStyles.normal, { textAlign: "center" }]}>
            No Data Found
          </Text>
        </View>
      )}
    </View>
  );
}
