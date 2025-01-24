import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Post } from '@/types';
import * as Animatable from 'react-native-animatable';
import { Image } from 'react-native';
import { icons } from '@/constants';
import { Video, ResizeMode } from 'expo-av';

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
      duration={300}
    >
      {play ? (
        <View>
          <Video
            source={{ uri: post.video }}
            style={styles.video}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={(status) => {}}
          />
        </View>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => setPlay(true)}
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
          {/* <View>
            <Video
              source={{ uri: post.video }}
              style={styles.video}
              resizeMode={ResizeMode.CONTAIN}
              useNativeControls
              shouldPlay
              onPlaybackStatusUpdate={(status) => {}}
            />
          </View> */}
        </>
      )}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  video: {
    height: 280,
    width: 180,
    backgroundColor: 'black',
    borderRadius: 30,
  },
});

export default TrendingItem;
