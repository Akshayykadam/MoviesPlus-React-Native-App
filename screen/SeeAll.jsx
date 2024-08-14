import { View, Text, TouchableWithoutFeedback, Image, Dimensions, FlatList, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useCallback } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native'
import { image500 } from '../api/moviesdb'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

let { width, height } = Dimensions.get('window')
const ios = Platform.OS == "ios"

export default function SeeAll() {
    const route = useRoute();
    const navigation = useNavigation();
    const { movies } = route.params || { movies: [] };

    const handleClick = useCallback((item) => {
        navigation.navigate("Movie", item);
    }, [navigation]);

    const handleBackPress = () => {
        navigation.goBack();
    };

    const renderItem = ({ item }) => (
        <MovieCard item={item} handleClick={handleClick} />
    );

    const ITEM_HEIGHT = 120; // Adjust based on your MovieCard height
    const getItemLayout = (data, index) => (
        { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
    );

    return (
        <View className="bg-black flex-1">
            <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
                <View>
                    <TouchableOpacity
                        onPress={handleBackPress}
                        style={{ position: 'absolute', top: 16, left: 16 }}
                    >
                        <ChevronLeftIcon size={28} strokeWidth={2.5} color={"white"} />
                    </TouchableOpacity>

                    <Text style={{ color: 'red', fontSize: 20, marginHorizontal: 50, marginBottom: 20, marginTop: 18, textAlign: 'center' }}>
                        All Movies
                    </Text>

                    <FlatList
                        data={movies}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        getItemLayout={getItemLayout}
                        contentContainerStyle={{ paddingVertical: 10 }}
                        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                    />
                </View>
            </SafeAreaView>
        </View>

    );
}

const capitalizeFirstLetter = (text) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};


const MovieCard = ({ item, handleClick }) => {
    return (
        <TouchableOpacity onPress={() => handleClick(item)} style={styles.card}>
            <Image
                source={{ uri: image500(item.poster_path) }}
                style={styles.image}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.title}
                    numberOfLines={1}
                    ellipsizeMode='tail'>
                    {capitalizeFirstLetter(item.title)}
                </Text>

                <View style={{ marginVertical: 5 }}>
                    <StarRating rating={item?.vote_average || 0} />
                </View>

                <Text style={styles.overview} numberOfLines={6} ellipsizeMode='tail'>
                    {/* <Text style={styles.boldText}>Overview:</Text> {item.overview} */}
                    {capitalizeFirstLetter(item.overview)}
                </Text>




            </View>
        </TouchableOpacity>
    );
};

const StarRating = ({ rating }) => {
    const scaledRating = (rating / 10) * 5;  // Convert the rating to a 5-star scale
    const fullStars = Math.floor(scaledRating);  // Number of full stars
    const halfStars = scaledRating % 1 !== 0 ? 1 : 0;
    const emptyStars = Math.max(5 - (fullStars + halfStars), 0);  // Remaining stars are empty

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Full Stars */}
            {Array.from({ length: fullStars }).map((_, index) => (
                <FontAwesomeIcon
                    key={`full-${index}`}
                    name="star"
                    size={15}
                    color="#FFD700"
                    style={{ marginRight: 4 }}
                />
            ))}

            {/* Half Star */}
            {halfStars === 1 && (
                <FontAwesomeIcon
                    name="star-half"
                    size={15}
                    color="#FFD700"
                    style={{ marginRight: 4 }}
                />
            )}

            {/* Empty Stars */}
            {Array.from({ length: emptyStars }).map((_, index) => (
                <FontAwesomeIcon
                    key={`empty-${index}`}
                    name="star-o"
                    size={15}
                    color="#FFD700"
                    style={{ marginRight: 4 }}
                />
            ))}

            {/* Display numeric rating */}
            {/* <Text style={{ color: '#FFD700', marginLeft: 5, fontSize: 14, fontWeight: 'bold' }}>
                {scaledRating.toFixed(1)}
            </Text> */}

        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 7,
        backgroundColor: '#141414',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        height: width * 0.5,
        marginHorizontal: 10
    },
    image: {
        width: width * 0.33,
        height: height * 0.22,
        height: '100%',
        borderRadius: 8,
    },
    infoContainer: {
        flex: 1,
        marginLeft: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#fff',
    },
    overview: {
        fontSize: 14,
        color: '#ccc',
        paddingBottom: 5,
    },
    boldText: {
        fontWeight: 'bold',
    },
});

