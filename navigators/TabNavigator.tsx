import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreScreen from "../screens/ExploreScreen";
import DahaWalletScreen from "../screens/DahaWalletScreen";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import PortalScreen from "../screens/PortalScreen";

const portal = require("../assets/portal.png");

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const PortalIcon = (props) => {
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={{
          height: 70,
          width: 70,
          top: -25,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image source={portal}></Image>
      </TouchableOpacity>
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="Explore"
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
          borderWidth: 1.5,
          borderColor: "#ECEEEF",
          bottom: 0,
          height: 70,
          shadowColor: "rgba(0, 0, 0, 0.05)",
          shadowOpacity: 0.6,
          shadowRadius: 10,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          elevation: 4,
          paddingBottom: 10,
          paddingTop: 12,
        },
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialIcons
                name="explore"
                size={24}
                color={focused ? "#1D1E1C" : "rgba(0, 0, 0, 0.5)"}
              />
              <Text
                style={{
                  marginTop: 2,
                  fontSize: 10,
                  fontWeight: "700",
                  color: focused ? "#1D1E1C" : "rgba(0, 0, 0, 0.5)",
                }}
              >
                KEŞFET
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Portal"
        component={PortalScreen}
        options={{
          tabBarShowLabel: false,
          tabBarButton: (props) => <PortalIcon {...props} />,
        }}
      />
      <Tab.Screen
        name="DahaWallet"
        component={DahaWalletScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign
                name="star"
                size={24}
                color={focused ? "#1D1E1C" : "rgba(0, 0, 0, 0.5)"}
              />
              <Text
                style={{
                  marginTop: 2,
                  fontSize: 10,
                  fontWeight: "700",
                  color: focused ? "#1D1E1C" : "rgba(0, 0, 0, 0.5)",
                }}
              >
                DAHA CÜZDAN
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
