// MapHomeScreen.tsx

import React, {useRef} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import MapView from 'react-native-maps';
import useAuth from '@/hooks/queries/useAuth';
import useUserLocation from '@/hooks/useUserLocation';

import {colors, mapNavigations, MarkerType} from '@/constants';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import GoogleMapView from '@/components/GoogleMapView';

// 예시마커
const Markers = [
  {
    latitude: 37.5765,
    longitude: 126.978,
    name: '충북청년희망센터',
    address: '상당구 사북로 164 대우타워아파트 5층',
    tags: ['공유오피스', '청년지원기관관'],
    hours: '월-금 10:00~21:00 / 토 10:00~16:00',
    capacity: '2~6명 / 10~25명',
    website: 'https://www.cbhope1539.net/index.do',
    describe:
      '충북청년희망센터는 청년들의 창업과 취업을 지원하는 공간으로, 다양한 프로그램과 시설을 제공합니다.',
  },
  {
    latitude: 37.5615,
    longitude: 126.958,
    name: 'Marker 2',
    address: 'Address 2',
    tags: ['tag3', 'tag4'],
    hours: '10:00-19:00',
    capacity: 20,
    website: 'https://example2.com',
  },
  {
    latitude: 37.5665,
    longitude: 127,
    name: 'Marker 3',
    address: 'Address 3',
    tags: ['tag5', 'tag6'],
    hours: '8:00-17:00',
    capacity: 15,
    website: 'https://example3.com',
  },
];

function MapHomeScreen() {
  const {logoutMutation} = useAuth();
  const navigation = useNavigation<NavigationProp<MapStackParamList>>();
  const mapRef = useRef<MapView | null>(null);
  const {userLocation, isUserLocationError} = useUserLocation();

  const handleLogout = () => {
    logoutMutation.mutate(null);
  };

  const handlePressUserLocation = () => {
    if (isUserLocationError || !userLocation) {
      // 에러메세지를 표시하기
      return;
    }
    mapRef.current?.animateToRegion({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const handleMarkerPress = (marker: MarkerType) => {
    navigation.navigate(mapNavigations.MAP_INFO, {marker});
  };
  return (
    <>
      <View style={styles.header}>
        <Image
          source={require('@/assets/icons/app_icon_200.png')}
          style={{
            width: 40,
            height: 40,
            marginRight: 12,
            resizeMode: 'contain',
          }}
        />
        <Text style={styles.h1}>청마루</Text>
      </View>
      <GoogleMapView
        ref={mapRef}
        location={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        }}
        Markers={Markers}
        onMarkerPress={handleMarkerPress}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: '12%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    paddingHorizontal: 24,
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
});

export default MapHomeScreen;
