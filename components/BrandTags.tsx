import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import React from "react";

const BrandTags = ({ data, selected, setSelected }) => {
  return (
    <FlatList
      keyExtractor={(item) => item.Id.toString()}
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 8 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{
            padding: 6,
            borderColor: selected === item ? "#F40000" : "#ECEEEF",
            borderWidth: 1.5,
            borderRadius: 8,
            margin: 2,
          }}
          onPress={() => setSelected(item)}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ width: 24, height: 24, resizeMode: "contain" }}
              source={{ uri: item.IconUrl }}
            />
            <Text style={{ marginStart: 8 }}>{item.Name}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default BrandTags;
