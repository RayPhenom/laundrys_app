import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
//import Carousel from "../components/Carousel";

const HomeScreen = () => {
  const [displayCurrentAddress, setdisplayCurrentAddress] = useState(
    "loading your location"
  );
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location Service Disabled",
        "Please enable your location services to use this app.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Please grant location permission to use this app.",
        [{ text: "OK" }],
        { cancelable: false }
      );
      return;
    }
    const { coords } = await Location.getCurrentPositionAsync();
    console.log(coords);
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      console.log(response);
      for (let item of response) {
        let address = ` ${item.city}, ${item.country}, ${item.region}`;
        setdisplayCurrentAddress(address);
      }
    }
  };
  return (
    <SafeAreaView>
      {/* Location  and profile*/}
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <MaterialIcons name="location-on" size={35} color="#fd5c63" />
        <View>
          <Text style={{ fontSize: 20, fontWeight: "600" }}>Deliver to</Text>
          <Text>{displayCurrentAddress}</Text>
        </View>

        <Pressable style={{ marginLeft: "auto", marginRight: 7 }}>
          <Image
            style={{ width: 40, height: 40, borderRadius: 20 }}
            source={{
              uri: "https://lh3.googleusercontent.com/a/ACg8ocIjKb0UDoQfacvP49FbWWOIG7wxjy5mVLXsrCRckzmSEo5PLFRXwA=s288-c-no",
            }}
          />
        </Pressable>
      </View>
      {/* Searchbar */}
      <View
        style={{
          padding: 10,
          margin: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          borderColor: "#C0C0C0",
          borderWidth: 0.8,
          borderRadius: 7,
        }}
      >
        <TextInput placeholder="Search for laundry items" />
        <Feather name="search" size={24} color="#fd5c63" />
      </View>
      {/* Carousel */}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
