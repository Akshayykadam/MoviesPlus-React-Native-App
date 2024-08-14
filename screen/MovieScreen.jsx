import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { styles, theme } from '../theme'
import { LinearGradient } from 'expo-linear-gradient'
import Cast from '../components/Cast'
import MovieList from '../components/MovieList'
import Loading from '../components/Loading'
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/moviesdb'
import Icon from 'react-native-vector-icons/FontAwesome';

let { width, height } = Dimensions.get('window')
const ios = Platform.OS == "ios"
const topMargin = ios ? '' : " mt-4"

const movieName = "Ant-Man and the Wasp: Quantumania"

export default function MovieScreen() {
    const { params: item } = useRoute()
    const [isFavourite, toggleFavourite] = useState(false)
    const [cast, setCast] = useState([])
    const [loading, setLoading] = useState(false)
    const [similarMovies, setSimilarMovies] = useState([])
    const [movie, setMovie] = useState({})
    const navigation = useNavigation()
    useEffect(() => {
        // call the movie details api
        console.log(item.id);
        getMovieDetails(item.id)
        getMovieCredits(item.id)
        getSimilarMovies(item.id)
    }, [item])

    const getMovieDetails = async id => {
        const data = await fetchMovieDetails(id)
        if (data) setMovie(data)
        setLoading(false)
    }

    const getMovieCredits = async id => {
        const data = await fetchMovieCredits(id)
        if (data && data.cast) setCast(data.cast)
        setLoading(false)
    }

    const getSimilarMovies = async id => {
        const data = await fetchSimilarMovies(id)
        if (data && data.results) setSimilarMovies(data.results)
        setLoading(false)
    }

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className="flex-1  bg-black"
        >
            {/* back button and movie poster */}
            <View className="w-full">
                <SafeAreaView className={"absolute z-20 w-full flex-row  justify-between items-center px-4" + topMargin} >
                    <TouchableOpacity className="rounded-xl p-1" onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size={28} strokeWidth={2.5} color={"white"} />

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                        <HeartIcon size={35} color={isFavourite ? theme.like : "white"} />

                    </TouchableOpacity>

                </SafeAreaView>

                {
                    loading ? <Loading /> :
                        (
                            <View>
                                <Image
                                    // source={require('../assets/images/moviePoster2.png')}
                                    source={{ uri: image500(movie?.poster_path) || fallbackMoviePoster }}
                                    style={{ width, height: height * 0.55 }}
                                />
                                <LinearGradient
                                    colors={['transparent', 'rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 1)']}
                                    style={{ width, height: height * 0.40 }}
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 0.5, y: 1 }}
                                    className="absolute bottom-0" />

                            </View>

                        )
                }


            </View>

            {/* movie details */}
            <View
                style={{ marginTop: -(height * 0.09) }} className="space-y-3">
                {/* title */}
                <Text className="text-white text-center text-3xl font-bold tracking-wider">
                    {
                        movie?.title
                    }

                </Text>

                <View style={{ alignItems: 'center', marginVertical: 10 }}>
                    {/* <Text style={{
                        color: '#FFD700', // Gold color for the rating
                        fontSize: 20, // Increase font size
                        fontWeight: 'bold', // Make the text bold
                        paddingHorizontal: 8, // Padding around the text
                        paddingVertical: 4,
                        borderRadius: 5, // Rounded corners
                    }}>
                        {movie?.vote_average?.toFixed(1)} ⭐
                    </Text> */}
                    <StarRating rating={movie?.vote_average || 0} />
                </View>
                {/* status, release , runtime */}
                {
                    movie?.id ? (
                        <Text className="text-neutral-400 font-semibold text-base text-center">
                            {movie?.status} • {movie?.release_date?.split('-')[0] || 'N/A'} • {movie?.runtime} min
                        </Text>

                    ) : null
                }

                {/* genres  */}
                <View className="flex-row justify-center mx-4 space-x-2">
                    {
                        movie?.genres?.map((genre, index) => {
                            let showDot = index + 1 != movie.genres.length;
                            return (
                                <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                                    {genre?.name} {showDot ? "•" : null}
                                </Text>
                            )
                        })
                    }
                </View>



                {/* description */}
                <Text className="text-neutral-400 mx-4 tracking-wide">
                    {
                        movie?.overview
                    }
                </Text>

            </View>


            {/* cast member */}
            {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}

            {/*similar movies  */}
            {similarMovies.length > 0 && <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />}

        </ScrollView>
    )
}

const StarRating = ({ rating }) => {
    const scaledRating = (rating / 10) * 5;  // Convert the rating to a 5-star scale
    const fullStars = Math.floor(scaledRating);  // Number of full stars
    const halfStars = scaledRating % 1 !== 0 ? 1 : 0;
    const emptyStars = Math.max(5 - (fullStars + halfStars), 0);  // Remaining stars are empty

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Full Stars */}
            {Array.from({ length: fullStars }).map((_, index) => (
                <Icon
                    key={`full-${index}`}
                    name="star"
                    size={20}
                    color="#FFD700"
                    style={{ marginRight: 4 }}
                />
            ))}

            {/* Half Star */}
            {halfStars === 1 && (
                <Icon
                    name="star-half"
                    size={20}
                    color="#FFD700"
                    style={{ marginRight: 4 }}
                />
            )}

            {/* Empty Stars */}
            {Array.from({ length: emptyStars }).map((_, index) => (
                <Icon
                    key={`empty-${index}`}
                    name="star-o"
                    size={20}
                    color="#FFD700"
                    style={{ marginRight: 4 }}
                />
            ))}

            {/* Display numeric rating */}
            <Text style={{ color: '#FFD700', marginLeft: 5, fontSize: 18, fontWeight: 'bold' }}>
                {scaledRating.toFixed(1)}
            </Text>

        </View>
    );
};