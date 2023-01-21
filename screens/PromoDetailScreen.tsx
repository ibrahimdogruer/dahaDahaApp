import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import WebView from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";

const PromoDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { campaignId, seoName } = route?.params;
  const [promotion, setPromotion] = useState(null);
  const { width, height } = useWindowDimensions();

  const headers = {
    "Content-Type": "application/json",
    "X-Country-Id": "TR",
    "X-Language-Id": "TR",
  };

  useEffect(() => {
    if (campaignId && seoName) {
      getPromotionDetails();
    } else {
      navigation.goBack();
    }
  }, []);

  const getPromotionDetails = async () => {
    const response = await fetch(
      `https://api.extrazone.com/promotions?Id=${campaignId}`,
      {
        method: "GET",
        headers,
      }
    );
    const data = await response.json();
    setPromotion(data);
  };

  if (promotion === null) {
    return <View></View>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: promotion?.ImageUrl }} style={styles.image} />
          <Image
            source={{ uri: promotion?.BrandIconUrl }}
            style={styles.logo}
          />
          <View
            style={{
              position: "absolute",
              bottom: 5,
              right: 5,
              backgroundColor: "#1D1E1C",
              padding: 5,
              borderRadius: 20,
              width: 90,
              height: 32,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 12, fontWeight: "700" }}>
              {promotion?.RemainingText}
            </Text>
          </View>
        </View>

        <View style={{ height: height }}>
          <View style={{ height: 60 }}>
            <WebView
              style={{ width: width }}
              originWhitelist={["*"]}
              source={{
                html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="text-align: center">${promotion?.Title}</body></html>`,
              }}
            />
          </View>

          <View style={{ height: height, paddingBottom: 150 }}>
            <WebView
              style={{ width: width }}
              originWhitelist={["*"]}
              source={{
                html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="text-align: center">${promotion?.Description}</body></html>`,
              }}
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={16} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.actionButton, { width: width - 30 }]}>
        <Text style={{ color: "#fff", fontSize: 12, fontWeight: "700" }}>
          {promotion?.DetailButtonText}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#F4F6F5",
    padding: 5,
  },
  imageContainer: {
    height: 300,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderBottomLeftRadius: 100,
  },
  logo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 55,
    height: 55,
    borderRadius: 30,
    borderWidth: 4.5,
    borderColor: "#fff",
  },
  text: {
    fontWeight: "700",
    fontSize: 14,
    textAlign: "center",
  },
  actionButton: {
    position: "absolute",
    bottom: 20,
    marginHorizontal: 15,
    backgroundColor: "#F40000",
    padding: 10,
    borderRadius: 28,
    // width: width - 30,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 55,
    left: 15,
    padding: 10,
    backgroundColor: "#1D1E1C",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PromoDetailScreen;
