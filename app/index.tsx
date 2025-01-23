import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants/index';
import CustomButton from '@/components/custom-button';
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';
import { useGlobalContext } from '@/context/global-context';

export default function App() {
  const globalContext = useGlobalContext();

  if (!globalContext?.isLoading && !globalContext?.isLoggedIn)
    return <Redirect href={'/home'} />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center  items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="h-[84px] w-[130px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] h-[300px] w-full"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless
            </Text>
            <Text className="text-3xl text-white font-bold text-center">
              Possibilities with{' '}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -right-8 -bottom-2"
              resizeMode="contain"
            />
          </View>
          <View>
            <Text className="text-sm font-pregular text-gray-100 text-center mt-7">
              Where creativity meets innovation. Embark on a journey of
              limitless exploration with aora
            </Text>
          </View>

          <CustomButton
            title={'Continue With Email'}
            containerStyles={'mt-7'}
            onPress={() => router.push('/sign-in')}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161122" style="light" />
    </SafeAreaView>
  );
}
