import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import AppNavigation from './navigation/appNavigation';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    async function prepare() {
      try {
        // Simulate a longer splash screen time (e.g., 3 seconds)
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Hide the splash screen after the delay
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      <AppNavigation />
    </>
  );
}
