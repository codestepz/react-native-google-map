import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const platform = Platform.select({
  ios: () => 'ios',
  android: () => 'android',
})();

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.map = null;
    this.state = { 
      mapOption: { 
        enableHighAccuracy: false, 
        timeout: 5000, 
        maximumAge: 0
      },
      initialRegion: {
        latitude: 13.781058,
        longitude: 100.4914531,
        latitudeDelta: 0.0922 / 10,
        longitudeDelta: 0.0421 / 10,
      },
      initialMarker: {
        locationName: 'Last Location',
        latitude: 13.781058,
        longitude: 100.4914531,
        latitudeDelta: 0.0922 / 10,
        longitudeDelta: 0.0421 / 10,
      },
    };
  }
  // ตำแหน่งปัจจุบัน
  onRegionChange(regionCurrent) {
    console.log(regionCurrent);
  }
  // ตำแหน่งปัจจุบัน
  onRegionChangeComplete(regionCurrent) {
    console.log(regionCurrent);
  }
  render() {
    if (platform === 'ios') {
      return (
        <View style={styles.container}>
          <MapView 
              ref={(map) => { this.map = map; }}
              style={styles.map}
              showsUserLocation={true}
              followsUserLocation={true}
              moveOnMarkerPress={false}
              zoomEnabled={false}
              scrollEnabled={false}
              initialRegion={this.state.initialRegion}
              region={this.state.initialRegion}
              onRegionChange={(region) => this.onRegionChange(region)}
              onRegionChangeComplete={(region) => this.onRegionChangeComplete(region)}>
            </MapView>
            <MapView.Circle center={{ latitude : this.state.initialMarker.latitude, longitude : this.state.initialMarker.longitude }} radius={200} strokeColor="rgba(197, 0, 48, 0.9)" fillColor="rgba(197, 50, 81, 0.9)"></MapView.Circle>
          </View>
      );
    }
    if (platform === 'android') {
      return (
        <View style={styles.container}>
          <MapView 
            ref={(map) => { this.map = map; }}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            followsUserLocation={true}
            moveOnMarkerPress={false}
            zoomEnabled={false}
            scrollEnabled={false}
            initialRegion={this.state.initialRegion}
            region={this.state.initialRegion}
            onRegionChange={(region) => this.onRegionChange(region)}
            onRegionChangeComplete={(region) => this.onRegionChangeComplete(region)}>
            <MapView.Marker coordinate={{ latitude : this.state.initialMarker.latitude, longitude : this.state.initialMarker.longitude }} title={this.state.initialMarker.locationName}/>
            </MapView>
        </View>
      );    
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  map: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0,
  },
});