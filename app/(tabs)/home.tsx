import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import AppStatusBar from '@/components/status-bar';
import SearchInput from '@/components/search-input';
import Trending from '@/components/trending';
import EmptyList from '@/components/empty-list';
import { getAllPosts } from '@/lib/appwrite';
import { useAppwrite } from '@/hooks/useAppwrite';

type Post = {
  $id: string;
  title: string;
  thumbnail: string;
  video: string;
  prompt: string;
};

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading, data: posts, refetch } = useAppwrite<Post>(getAllPosts);

  const handleRefresh = async () => {
    setRefreshing(true);

    await refetch();

    setRefreshing(false);
  };

  if (isLoading) return <Text>'Loading...'</Text>;

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="px-4">
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text className="text-3xl text-white/15">Number {item.$id}</Text>
            </View>
          )}
          ListHeaderComponent={() => (
            <View className="my-6 space-y-6">
              <View className="justify-between items-start flex-row mb-6">
                <View className="text-3xl">
                  <Text className="font-pmedium text-sm text-gray-100">
                    Welcome Back
                  </Text>
                  <Text className="text-2xl text-white font-psemibold">
                    Isaac Takiy
                  </Text>
                </View>
                <View className="mt-1.5">
                  <Image
                    source={images.logoSmall}
                    className="w-9 h-10"
                    resizeMode="contain"
                  />
                </View>
              </View>

              <View>
                <SearchInput
                  value=""
                  onChangeText={() => undefined}
                  placeholder="Search for a video topic..."
                />
              </View>

              <View className="w-full flex-1  pt-5 pb-8">
                <Text className="text-gray-100 text-lg front-pregular mb-3">
                  Trending videos
                </Text>
                <Trending
                  posts={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] ?? []}
                />
              </View>
            </View>
          )}
          ListEmptyComponent={
            <EmptyList
              title="No videos founds"
              subtitle="Be the first person to upload a video"
            />
          }
          refreshControl={
            <RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />
          }
        />
      </View>
      <AppStatusBar />
    </SafeAreaView>
  );
};

export default Home;

// title
// thumbnail
// prompt
// video
// users
