import { View, Text, Platform, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline"
import { StatusBar } from "expo-status-bar";
import { styles } from "../theme/index"
import TrendingMovies from "../components/TrendingMovies";
import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import { useNavigation } from '@react-navigation/native'
import Loading from "../components/Loading";
import { fetchTrendingMovies, fetchUpcomingMovies, fetchPopularMovies } from "../api/moviesdb";


const ios = Platform.OS == "ios"
const HomeScreen = () => {
    const [trending, setTrending] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [topRated, setTopRated] = useState([])
    const [popular, setPopular] = useState([])
    const [loading, setLoading] = useState(true)

    const navigation = useNavigation()

    //making api call to fetch movies only once
    useEffect(() => {
        getTrendingMovies()
        getUpcomingMovies()
        getTopRatedMovies()
        getPopularMovies()
    }, [])


    //  getting trending movies
    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies()
        // console.log("got trending movies : ",data);.
        if (data && data.results) setTrending(data.results)
        setLoading(false)
    }

    //  getting upcoming movies
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies()
        if (data && data.results) setUpcoming(data.results)
        setLoading(false)
    }

    //  getting top rated movies
    const getTopRatedMovies = async () => {
        const data = await fetchTrendingMovies()
        if (data && data.results) setTopRated(data.results)
        setLoading(false)
    }

    //  getting Popular movies
    const getPopularMovies = async () => {
        const data = await fetchPopularMovies()
        if (data && data.results) setPopular(data.results)
        setLoading(false)
    }

    return (
        <View className="flex-1 bg-black">
            {/* search bar and logo */}
            <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
                <StatusBar style="light" />
                <View className="flex-row justify-between items-center mx-4">
                    {/* <Bars3CenterLeftIcon size={"30"} strokeWidth={1} color="white" /> */}

                    <Text className="text-red-700 text-2xl font-bold">
                        <Text className="text-white text-2xl font-bold">Movies</Text> +
                    </Text>

                    <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                        <MagnifyingGlassIcon size={30} strokeWidth={1} color="white" />
                    </TouchableOpacity>

                </View>

            </SafeAreaView>

            {
                loading ? <Loading /> : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 10 }}>

                        {/* <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                            <SearchField />
                        </TouchableOpacity> */}

                        {/* trending movies corousel */}
                        {trending.length > 0 && <TrendingMovies data={trending} />}

                        {/* Popular movies row */}
                        <MovieList title="Popular" data={popular} />

                        {/* upcoming movies row */}
                        <MovieList title="Upcoming" data={upcoming} />

                        {/* Top rated movies row */}
                        <MovieList title="Top rated" data={topRated} />



                    </ScrollView>
                )
            }
        </View>
    );
}

const SearchField = () => {
    return (
        <View style={{
            marginHorizontal: 16,
            marginBottom: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 999, // Fully rounded
            backgroundColor: '#141414',
            //marginTop: 20,
        }}>
            <TextInput
                placeholder="Search Movie"
                placeholderTextColor={'lightgray'}
                style={{
                    paddingBottom: 4,
                    paddingLeft: 24,
                    flex: 1,
                    fontSize: 16,
                    fontWeight: '600',
                    color: 'white',
                    letterSpacing: 0.5,
                }}
            />
            <TouchableOpacity
                onPress={() => navigation.navigate("Search")}
                style={{
                    borderRadius: 999,
                    padding: 12,
                    margin: 4,
                    backgroundColor: '#b91c1c',
                }}
            >
                <MagnifyingGlassIcon size="20" color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;