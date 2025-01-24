import {
  Text,
  View,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons, images } from '@/constants';
import AppStatusBar from '@/components/status-bar';
import SearchInput from '@/components/search-input';
import EmptyList from '@/components/empty-list';
import { getUserPosts } from '@/lib/appwrite';
import { useAppwrite } from '@/hooks/useAppwrite';
import VideoCard from '@/components/video-card';
import { Post } from '@/types';
import { useGlobalContext } from '@/context/global-context';

const Profile = () => {
  const globalState = useGlobalContext();

  const [user] = useState<Record<string, string> | null>(
    globalState?.user?.documents?.[0] as unknown as Record<
      string,
      string
    > | null
  );

  const [refreshing, setRefreshing] = useState(false);

  const { isLoading, data, refetch } = useAppwrite<Post>(() =>
    getUserPosts(user?.$id as string)
  );

  const handleRefresh = async () => {
    setRefreshing(true);

    await refetch();

    setRefreshing(false);
  };

  const handleLogout = () => {};

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="px-4">
        <FlatList
          data={data}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <VideoCard video={item} />}
          ListHeaderComponent={() => (
            <View className="w-full justify-center items-center mt-6 mb-12 px4">
              <TouchableOpacity
                className="w-full items-end mb-10"
                onPress={() => {}}
              >
                <Image
                  source={icons.logout}
                  className="w-6 h-6"
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center overflow-hidden">
                <Image
                  source={{ uri: user?.avatar }}
                  className="w-[90%] h-[90%] rounded-lg"
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

export default Profile;
