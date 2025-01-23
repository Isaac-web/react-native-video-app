import { View, Text, FlatList, ViewToken } from 'react-native';
import TrendingItem from './trending-item/indext';
import { Post } from '@/types';
import { useState } from 'react';

type Props = {
  posts: Post[];
};

const Trending = ({ posts }: Props) => {
  const [activeItem, setActiveItem] = useState('');

  const handleViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken<Post>[];
    changed: ViewToken<Post>[];
  }) => {
    if (viewableItems.length) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <TrendingItem post={item} activeItem={activeItem} />
        )}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70,
        }}
        contentOffset={{ x: 170, y: 0 }}
        horizontal
      />
    </View>
  );
};

export default Trending;
