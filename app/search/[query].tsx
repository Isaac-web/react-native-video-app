import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppwrite } from '@/hooks/useAppwrite';
import { getAllPosts, searchPosts } from '@/lib/appwrite';
import { Post } from '@/types';
import VideoCard from '@/components/video-card';
import { images } from '@/constants';
import SearchInput from '@/components/search-input';
import EmptyList from '@/components/empty-list';

const Query = () => {
  const { query } = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);
  const [searchInputValue, setQuery] = useState(query);
  const {
    isLoading,
    data: posts,
    refetch,
  } = useAppwrite<Post>(() => searchPosts(query as string));

  console.log(posts);

  const handleRefresh = async () => {
    setRefreshing(true);

    await refetch();

    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="px-4">
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id.toString()}
          renderItem={({ item }) => <VideoCard video={item} />}
          ListHeaderComponent={() => (
            <View className="my-6 space-y-6">
              <View className="justify-between items-start flex-row mb-6">
                <View className="text-3xl">
                  <Text className="font-pmedium text-sm text-gray-100">
                    Search results for
                  </Text>
                  <Text className="text-2xl text-white font-psemibold">
                    {query}
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
                <SearchInput placeholder="Search for a video topic..." />
              </View>
            </View>
          )}
          ListEmptyComponent={
            <EmptyList
              title="No Results"
              subtitle="Looks like there is no video matching your search."
            />
          }
          refreshControl={
            <RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Query;

const styles = StyleSheet.create({});
