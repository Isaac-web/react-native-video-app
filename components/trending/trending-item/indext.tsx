import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Post } from '@/types';
import * as Animatable from 'react-native-animatable';
import { Image } from 'react-native';
import { icons } from '@/constants';

type Props = {
  post: Post;
  activeItem: string;
};

const zoomIn = {
  from: {
    transform: [{ scale: 0.9 }],
  },
  to: {
    transform: [{ scale: 1 }],
  },
};

const zoomOut = {
  from: {
    transform: [{ scale: 1 }],
  },
  to: {
    transform: [{ scale: 0.9 }],
  },
};

const TrendingItem = ({ post, activeItem }: Props) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === post.$id ? zoomIn : zoomOut}
    >
      {play ? (
        <Text className="text-white">TrendingItem</Text>
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
        >
          <ImageBackground
            source={{ uri: post.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-black/40"
          />
          <Image
            source={icons.play}
            className="w-16 h-16 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

export default TrendingItem;
