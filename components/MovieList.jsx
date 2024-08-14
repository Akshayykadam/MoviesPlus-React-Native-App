import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image185 } from '../api/moviesdb';

let { width, height } = Dimensions.get('window');

export default function MovieList({ title, hideSeeAll, data = [] }) { // Default value for data
    const navigation = useNavigation();

    return (
        <View className="mb-8 space-y-4">
            <View className="mx-4 flex-row justify-between items-center">
                <Text className="text-white text-xl">{title}</Text>
                {
                    !hideSeeAll && (
                        <TouchableOpacity onPress={() => navigation.push("SeeAll", { movies: data })}>
                            <Text className="text-lg text-red-600 font-bold">See More</Text>
                        </TouchableOpacity>
                    )
                }
            </View>

            {/* movie row */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {
                    data.length > 0 ? (
                        data.slice(0, 5).map((item, index) => (
                            <TouchableWithoutFeedback key={index} onPress={() => navigation.push("Movie", item)}>
                                <View style={styles.movieTile}>
                                    <Image
                                        source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                                        className="rounded-3xl"
                                        style={{
                                            width: width * 0.33,
                                            height: height * 0.22,
                                        }}
                                    />
                                    <Text className="text-neutral-300 ml-1">
                                        {item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        ))
                    ) : (
                        <Text className="text-neutral-300 ml-1">No movies available</Text>
                    )
                }
                {
                    !hideSeeAll && (
                        <TouchableOpacity
                            onPress={() => navigation.push("SeeAll", { movies: data })}
                            style={[styles.movieTile, styles.seeAllButton]} // Match the size of movie tiles
                        >
                            <Text style={styles.seeAllText}>See More</Text>
                        </TouchableOpacity>
                    )
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    movieTile: {
        marginRight: 16,
        alignItems: 'center',
    },
    seeAllButton: {
        backgroundColor: '#111111',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        width: width * 0.33,
        height: height * 0.22,
        marginRight: 16,
    },
    seeAllText: {
        color: 'red',
        fontSize: 15,
        fontWeight: 'bold',
    },
});
