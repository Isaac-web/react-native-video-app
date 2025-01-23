import { View, Text, FlatList } from 'react-native';

type Props = {
  posts: Record<string, string | number>[];
};

const Trending = ({ posts }: Props) => {
  return (
    <View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => <Text className="text-white">{item.id}</Text>}
        horizontal
      />
    </View>
  );
};

export default Trending;
