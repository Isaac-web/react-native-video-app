import { Text, View, FlatList, Image, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import AppStatusBar from '@/components/status-bar';
import SearchInput from '@/components/search-input';
import Trending from '@/components/trending';
import EmptyList from '@/components/empty-list';
import { getAllPosts, getLatestPosts } from '@/lib/appwrite';
import { useAppwrite } from '@/hooks/useAppwrite';
import VideoCard from '@/components/video-card';
import { Post } from '@/types';

const data = [
  {
    $collectionId: '679240600038beffea70',
    $createdAt: '2025-01-23T13:31:46.128+00:00',
    $databaseId: '6791c12a00117e4a3473',
    $id: '679244c100397229f7b2',
    $permissions: [],
    $updatedAt: '2025-01-23T13:31:46.128+00:00',
    prompt:
      'Make a fun video about hackers and all the cool stuff they do with computers',
    thumbnail: 'https://i.ibb.co/DzXRfyr/Bucket-59038.png',
    title: 'A World where Ideas Grow Big',
    users: {
      $collectionId: '6791c169000a6befe932',
      $createdAt: '2025-01-23T05:26:23.299+00:00',
      $databaseId: '6791c12a00117e4a3473',
      $id: '6791d2ff0011b9bee2c5',
      $permissions: [Array],
      $updatedAt: '2025-01-23T05:26:23.299+00:00',
      accountId: '6791d2fc00001510834b',
      avatar:
        'https://cloud.appwrite.io/v1/avatars/initials?name=takiy&project=6791bec1003762055056',
      email: 'kanytakiy@gmail.com',
      username: 'takiy',
    },
    video: 'https://player.vimeo.com/video/949620200?h=d60220d68d',
  },
  {
    $collectionId: '679240600038beffea70',
    $createdAt: '2025-01-23T13:27:11.115+00:00',
    $databaseId: '6791c12a00117e4a3473',
    $id: '679243ae0039126f7daf',
    $permissions: [],
    $updatedAt: '2025-01-23T13:27:11.115+00:00',
    prompt: 'An imaginative video envisioning the future of Virtual Reality',
    thumbnail: 'https://i.ibb.co/C5wXXf9/Video-3.png',
    title: "A Glimpse into Tomorrow's VR World",
    users: {
      $collectionId: '6791c169000a6befe932',
      $createdAt: '2025-01-23T05:26:23.299+00:00',
      $databaseId: '6791c12a00117e4a3473',
      $id: '6791d2ff0011b9bee2c5',
      $permissions: [Array],
      $updatedAt: '2025-01-23T05:26:23.299+00:00',
      accountId: '6791d2fc00001510834b',
      avatar:
        'https://cloud.appwrite.io/v1/avatars/initials?name=takiy&project=6791bec1003762055056',
      email: 'kanytakiy@gmail.com',
      username: 'takiy',
    },
    video: 'https://player.vimeo.com/video/949620017?h=d60220d68d',
  },
  {
    $collectionId: '679240600038beffea70',
    $createdAt: '2025-01-23T13:25:28.684+00:00',
    $databaseId: '6791c12a00117e4a3473',
    $id: '67924348001a31393846',
    $permissions: [],
    $updatedAt: '2025-01-23T13:25:28.684+00:00',
    prompt: "Create a captivating video journey through Japan's Sakura Temple",
    thumbnail: 'https://i.ibb.co/3Y2Nk7q/Bucket-215.png',
    title: "Japan's Blossoming temple",
    users: {
      $collectionId: '6791c169000a6befe932',
      $createdAt: '2025-01-23T05:26:23.299+00:00',
      $databaseId: '6791c12a00117e4a3473',
      $id: '6791d2ff0011b9bee2c5',
      $permissions: [Array],
      $updatedAt: '2025-01-23T05:26:23.299+00:00',
      accountId: '6791d2fc00001510834b',
      avatar:
        'https://cloud.appwrite.io/v1/avatars/initials?name=takiy&project=6791bec1003762055056',
      email: 'kanytakiy@gmail.com',
      username: 'takiy',
    },
    video: 'https://player.vimeo.com/video/949618057?h=d60220d68d',
  },
  {
    $collectionId: '679240600038beffea70',
    $createdAt: '2025-01-23T13:24:34.442+00:00',
    $databaseId: '6791c12a00117e4a3473',
    $id: '6792431200091fa17eae',
    $permissions: [],
    $updatedAt: '2025-01-23T13:24:34.442+00:00',
    prompt:
      'A buy working on his laptop that sparks excitement for coding, emphasizing the endless possibilities and personal growth it offers',
    thumbnail: 'https://i.ibb.co/mGfCYJY/Video-2.png',
    title: 'Find inspiration in Every Line',
    users: {
      $collectionId: '6791c169000a6befe932',
      $createdAt: '2025-01-23T05:26:23.299+00:00',
      $databaseId: '6791c12a00117e4a3473',
      $id: '6791d2ff0011b9bee2c5',
      $permissions: [Array],
      $updatedAt: '2025-01-23T05:26:23.299+00:00',
      accountId: '6791d2fc00001510834b',
      avatar:
        'https://cloud.appwrite.io/v1/avatars/initials?name=takiy&project=6791bec1003762055056',
      email: 'kanytakiy@gmail.com',
      username: 'takiy',
    },
    video: 'https://player.vimeo.com/video/949617485?h=d60220d68d',
  },
  {
    $collectionId: '679240600038beffea70',
    $createdAt: '2025-01-23T13:23:31.599+00:00',
    $databaseId: '6791c12a00117e4a3473',
    $id: '679242d30012745f9eef',
    $permissions: [],
    $updatedAt: '2025-01-23T13:23:31.599+00:00',
    prompt:
      'Make a video about a small blue AI robot blinking its eyes and looking at the screen',
    thumbnail: 'https://i.ibb.co/7XqVPVT/Photo-1677756119517.png',
    title: 'Meet small AI friends',
    users: {
      $collectionId: '6791c169000a6befe932',
      $createdAt: '2025-01-23T05:26:23.299+00:00',
      $databaseId: '6791c12a00117e4a3473',
      $id: '6791d2ff0011b9bee2c5',
      $permissions: [Array],
      $updatedAt: '2025-01-23T05:26:23.299+00:00',
      accountId: '6791d2fc00001510834b',
      avatar:
        'https://cloud.appwrite.io/v1/avatars/initials?name=takiy&project=6791bec1003762055056',
      email: 'kanytakiy@gmail.com',
      username: 'takiy',
    },
    video: 'https://player.vimeo.com/video/949616422?h=d60220d68d',
  },
  {
    $collectionId: '679240600038beffea70',
    $createdAt: '2025-01-23T13:22:26.997+00:00',
    $databaseId: '6791c12a00117e4a3473',
    $id: '679242920030f2efac87',
    $permissions: [],
    $updatedAt: '2025-01-23T13:22:26.997+00:00',
    prompt:
      'Create a heartwarming video following the travels of dalmatian dog exploring beautiful Italy',
    thumbnail: 'https://i.ibb.co/CBYzyKh/Video-1.png',
    title: "Dalmatian's journey through Italy",
    users: {
      $collectionId: '6791c169000a6befe932',
      $createdAt: '2025-01-23T05:26:23.299+00:00',
      $databaseId: '6791c12a00117e4a3473',
      $id: '6791d2ff0011b9bee2c5',
      $permissions: [Array],
      $updatedAt: '2025-01-23T05:26:23.299+00:00',
      accountId: '6791d2fc00001510834b',
      avatar:
        'https://cloud.appwrite.io/v1/avatars/initials?name=takiy&project=6791bec1003762055056',
      email: 'kanytakiy@gmail.com',
      username: 'takiy',
    },
    video: 'https://player.vimeo.com/video/949582778?h=d60220d68d',
  },
  {
    $collectionId: '679240600038beffea70',
    $createdAt: '2025-01-23T13:21:10.103+00:00',
    $databaseId: '6791c12a00117e4a3473',
    $id: '67924245003624599804',
    $permissions: [],
    $updatedAt: '2025-01-23T13:21:10.103+00:00',
    prompt:
      'Create a motivating AI driven video aimed at inspiring coding enthusiasts with simple language',
    thumbnail: 'https://i.ibb.co/tJBcX20/Appwrite-video.png',
    title: 'Get inspired to code',
    users: {
      $collectionId: '6791c169000a6befe932',
      $createdAt: '2025-01-23T05:26:23.299+00:00',
      $databaseId: '6791c12a00117e4a3473',
      $id: '6791d2ff0011b9bee2c5',
      $permissions: [Array],
      $updatedAt: '2025-01-23T05:26:23.299+00:00',
      accountId: '6791d2fc00001510834b',
      avatar:
        'https://cloud.appwrite.io/v1/avatars/initials?name=takiy&project=6791bec1003762055056',
      email: 'kanytakiy@gmail.com',
      username: 'takiy',
    },
    video: 'https://player.vimeo.com/video/949579770?h=897cd5e781',
  },
];

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading, data: posts, refetch } = useAppwrite<Post>(getAllPosts);
  const {
    isLoading: isLoadingLatestPosts,
    data: latestPosts = [],
    refetch: reFetchLatestPosts,
  } = useAppwrite<Post>(getLatestPosts);

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
                  posts={latestPosts}
                  // currentPost={latestPosts?.[0]}
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
