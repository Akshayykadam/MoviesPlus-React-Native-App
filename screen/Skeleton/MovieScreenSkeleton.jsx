import React from 'react';
import { View, ScrollView, Dimensions, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

let { width, height } = Dimensions.get('window');

const MovieScreenSkeleton = () => {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} style={styles.container}>
      {/* Back button and heart icon placeholders */}
      <SkeletonPlaceholder
        backgroundColor="#333"
        highlightColor="#444"
      >
        <View style={styles.topRow}>
          <View style={styles.backButton} />
          <View style={styles.heartIcon} />
        </View>
      </SkeletonPlaceholder>

      {/* Movie Poster Skeleton */}
      <SkeletonPlaceholder
        backgroundColor="#333"
        highlightColor="#444"
      >
        <View style={styles.poster} />
      </SkeletonPlaceholder>

      {/* Movie Details Skeleton */}
      <SkeletonPlaceholder
        backgroundColor="#333"
        highlightColor="#444"
      >
        <View style={styles.movieDetails}>
          <View style={styles.title} />
          <View style={styles.rating} />
          <View style={styles.details} />
          <View style={styles.genres}>
            {Array.from({ length: 3 }).map((_, index) => (
              <View key={index} style={styles.genre} />
            ))}
          </View>
          <View style={styles.description} />
        </View>
      </SkeletonPlaceholder>

      {/* Cast Skeleton */}
      <SkeletonPlaceholder
        backgroundColor="#333"
        highlightColor="#444"
      >
        <View style={styles.cast}>
          {Array.from({ length: 5 }).map((_, index) => (
            <View key={index} style={styles.castItem} />
          ))}
        </View>
      </SkeletonPlaceholder>

      {/* Similar Movies Skeleton */}
      <SkeletonPlaceholder
        backgroundColor="#333"
        highlightColor="#444"
      >
        <View style={styles.similarMovies}>
          {Array.from({ length: 3 }).map((_, index) => (
            <View key={index} style={styles.movieItem} />
          ))}
        </View>
      </SkeletonPlaceholder>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  heartIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  poster: {
    width,
    height: height * 0.55,
  },
  movieDetails: {
    paddingHorizontal: 16,
    marginTop: -height * 0.09,
  },
  title: {
    width: '60%',
    height: 30,
    borderRadius: 4,
    marginBottom: 16,
  },
  rating: {
    width: 100,
    height: 20,
    borderRadius: 4,
    marginBottom: 16,
    alignSelf: 'center',
  },
  details: {
    width: '80%',
    height: 20,
    borderRadius: 4,
    marginBottom: 16,
    alignSelf: 'center',
  },
  genres: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  genre: {
    width: 80,
    height: 20,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  description: {
    width: '90%',
    height: 60,
    borderRadius: 4,
    marginBottom: 16,
    alignSelf: 'center',
  },
  cast: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  castItem: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  similarMovies: {
    paddingHorizontal: 16,
  },
  movieItem: {
    width: width * 0.4,
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    marginHorizontal: 8,
  },
});

export default MovieScreenSkeleton;
