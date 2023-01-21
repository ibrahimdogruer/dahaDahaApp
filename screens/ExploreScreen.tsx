import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import BrandTags from "../components/BrandTags";
import CampaignCarousel from "../components/CampaignCarousel";

const logo = require("../assets/daha_daha_logo.png");

const ExploreScreen = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [brandTags, setBrandTags] = useState(null);
  const [promotions, setPromotions] = useState(null);

  const headers = {
    "Content-Type": "application/json",
    "X-Country-Id": "TR",
    "X-Language-Id": "TR",
  };

  const getTags = async () => {
    const response = await fetch(`https://api.extrazone.com/tags/list`, {
      method: "GET",
      headers,
    });
    const data = await response.json();
    setBrandTags(data);
  };

  const getPromotions = async () => {
    const response = await fetch(
      `https://api.extrazone.com/promotions/list?Channel=PWA`,
      {
        method: "GET",
        headers,
      }
    );
    const data = await response.json();
    setPromotions(data);
  };

  useEffect(() => {
    getTags();
    getPromotions();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* begin:: Header */}
      <View style={[styles.row, { paddingHorizontal: 15 }]}>
        <Image source={logo} />

        <View style={[styles.row, { paddingHorizontal: 15 }]}>
          <TouchableOpacity
            style={{
              backgroundColor: "#F40000",
              padding: 10,
              borderRadius: 20,
              width: 90,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 12, fontWeight: "700" }}>
              Giriş Yap
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#1D1E1C",
              padding: 10,
              borderRadius: 20,
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              marginStart: 10,
            }}
          >
            <FontAwesome5 name="user-alt" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {/* end:: Header */}

      {/* begin:: Tags */}
      <View style={{ marginTop: 10 }}>
        <BrandTags
          data={brandTags}
          selected={selectedTag}
          setSelected={setSelectedTag}
        />
      </View>
      {/* end:: Tags */}

      {/* begin:: Campaign Cards */}
      {promotions && promotions.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            marginTop: 15,
            paddingBottom: 25,
          }}
          nestedScrollEnabled
        >
          <CampaignCarousel
            data={promotions}
            pagination={true}
            autoPlay={false}
          />
        </ScrollView>
      ) : null}
      {/* end:: Campaign Cards */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ExploreScreen;
