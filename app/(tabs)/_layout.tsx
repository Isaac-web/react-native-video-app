import { Image, StyleSheet, Text, View } from 'react-native';
import React, { ReactNode } from 'react';
import { Tabs } from 'expo-router';

import { icons } from '../../constants';

const TabBarIcon = ({
  icon,
  color,
  name,
  focused,
}: {
  icon: ReactNode;
  color: string;
  name: string;
  focused: boolean;
}) => (
  <View className="items-center w-24 gap-2">
    <Image
      source={icon}
      resizeMode="contain"
      tintColor={color}
      className="w-6 h-6"
    />
    <Text
      className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
      style={{ color }}
    >
      {name}
    </Text>
  </View>
);

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 74,
            paddingTop: 8,
            backgroundColor: '#161622',
            borderTopColor: '#232533',
            borderTopWidth: 1,
          },
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                icon={icons.home}
                color={color}
                focused={focused}
                name={'Home'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: 'Bookmark',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                icon={icons.bookmark}
                color={color}
                focused={focused}
                name={'Bookmark'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                icon={icons.plus}
                color={color}
                focused={focused}
                name={'Create'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                icon={icons.profile}
                color={color}
                focused={focused}
                name={'Profile'}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
