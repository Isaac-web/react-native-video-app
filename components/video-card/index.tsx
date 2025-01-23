import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { icons } from '@/constants';
import { Post } from '@/types';

type Props = {
  video: Post;
};

const VideoCard = ({
  video: { title, thumbnail, video, prompt, $id, users: creator },
}: Props) => {
  const [play, setPlay] = useState(false);

  console.log(thumbnail);

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center w-[46px] h-[46px] rounded-lg border border-secondary  p-0">
          <Image
            source={{ uri: creator?.avatar }}
            className="w-full h-full rounded-lg"
            resizeMode="cover"
          />
        </View>
        <View className="justify-center flex-1 ml-3 gap-y-1">
          <Text className="text-white font-pregular">{title}</Text>
          <Text
            className="text-gray-100 font-pregular text-xs"
            numberOfLines={1}
          >
            {creator?.username}
          </Text>
        </View>
        <View>
          <Image
            className="pt-2 w-5 h-5"
            resizeMode="contain"
            source={icons.menu}
          />
        </View>
      </View>

      <TouchableOpacity
        className="w-full h-60 justify-center items-center"
        activeOpacity={0.8}
      >
        {play ? (
          <Text className="text-white">Playing...</Text>
        ) : (
          <Image
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
            source={{ uri: thumbnail }}
          />
        )}
        <Image
          className="w-12 h-12 absolute"
          resizeMode="contain"
          source={icons.play}
        />
      </TouchableOpacity>
    </View>
  );
};

export default VideoCard;
