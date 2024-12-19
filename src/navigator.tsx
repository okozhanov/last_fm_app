import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import AlbumDetailsScreen from './screens/AlbumDetailsScreen';
import ArtistDetailsScreen from './screens/ArtistDetailsScreen';
import SCREEN_NAMES from './constants/screenNames';
import type {AlbumParamsType} from './redux/reducers/albums/reducer';
import type {ArtistParamsType} from './redux/reducers/artists/reducer';

export type RootStackParamList = {
  [SCREEN_NAMES.WELCOME]: undefined;
  [SCREEN_NAMES.HOME]?: {artistName?: string};
  [SCREEN_NAMES.ALBUM_DETAILS]: AlbumParamsType;
  [SCREEN_NAMES.ARTIST_DETAILS]: ArtistParamsType;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={SCREEN_NAMES.WELCOME}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={SCREEN_NAMES.WELCOME} component={WelcomeScreen} />
        <Stack.Screen name={SCREEN_NAMES.HOME} component={HomeScreen} />
        <Stack.Screen
          name={SCREEN_NAMES.ALBUM_DETAILS}
          component={AlbumDetailsScreen}
        />
        <Stack.Screen
          name={SCREEN_NAMES.ARTIST_DETAILS}
          component={ArtistDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
