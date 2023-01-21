import {
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  useAnimatedRef,
} from "react-native-reanimated";
import CarouselPagination from "./CarouselPagination";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";

const CampaignCarousel = ({ data, autoPlay, pagination }) => {
  const navigation = useNavigation();
  const scrollViewRef = useAnimatedRef<ScrollView>();
  const interval = useRef(null);
  const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);
  const [newData] = useState([
    { key: "spacer-left" },
    ...data,
    { key: "spacer-right" },
  ]);
  const { width } = useWindowDimensions();
  const SIZE = width * 0.7;
  const SPACER = (width - SIZE) / 2;
  const x = useSharedValue(0);
  const offSet = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  useEffect(() => {
    if (isAutoPlay === true) {
      let _offSet = offSet.value;
      interval.current = setInterval(() => {
        if (_offSet >= Math.floor(SIZE * (data.length - 1) - 10)) {
          _offSet = 0;
        } else {
          _offSet = Math.floor(_offSet + SIZE);
        }
        scrollViewRef.current.scrollTo({ x: _offSet, y: 0 });
      }, 2000);
    } else {
      clearInterval(interval.current);
    }
  }, [SIZE, SPACER, isAutoPlay, data.length, offSet.value, scrollViewRef]);

  return (
    <View>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        onScrollBeginDrag={() => {
          setIsAutoPlay(false);
        }}
        onMomentumScrollEnd={(e) => {
          offSet.value = e.nativeEvent.contentOffset.x;
          setIsAutoPlay(autoPlay);
        }}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={SIZE}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {newData.map((item, index) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const style = useAnimatedStyle(() => {
            const scale = interpolate(
              x.value,
              [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
              [0.8, 1, 0.8]
            );
            return {
              transform: [{ scale }],
            };
          });
          if (!item.ImageUrl) {
            return <View style={{ width: SPACER }} key={index} />;
          }
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  "Campaign" as never,
                  { seoName: item.SeoName, campaignId: item.Id } as never
                )
              }
              style={{ width: SIZE }}
              key={index}
            >
              <Animated.View style={[styles.container, style]}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item.ImageUrl }} style={styles.image} />
                  <Image
                    source={{ uri: item.BrandIconUrl }}
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
                    <Text
                      style={{ color: "#fff", fontSize: 12, fontWeight: "700" }}
                    >
                      {item.RemainingText}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    paddingVertical: 20,
                    paddingHorizontal: 20,
                    maxHeight: 100,
                  }}
                >
                  <View
                    style={{
                      maxHeight: 40,
                    }}
                  >
                    <WebView
                      style={{ width: SIZE }}
                      originWhitelist={["*"]}
                      source={{
                        html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="text-align: center">${item.Title}</body></html>`,
                      }}
                    />
                  </View>
                  {/* <Text style={styles.text}>{item.Title}</Text> */}

                  <Text
                    style={[
                      styles.text,
                      { color: item.PromotionCardColor, marginTop: 15 },
                    ]}
                  >
                    Daha Daha
                  </Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </Animated.ScrollView>
      {pagination && (
        <CarouselPagination
          data={data}
          color={data[0].PromotionCardColor}
          x={x}
          size={SIZE}
        />
      )}
    </View>
  );
};

export default CampaignCarousel;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#F4F6F5",
    padding: 5,
  },
  imageContainer: {
    height: 250,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
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
});
