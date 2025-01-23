import { View, Text, Image } from 'react-native';
import { images } from '@/constants';
import CustomButton from '../custom-button';
import { router } from 'expo-router';

type Props = {
  title: string;
  subtitle: string;
};

const EmptyList = ({ title, subtitle }: Props) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[215px]"
      />
      <Text className="text-xl  font-psemibold text-gray-100">{title}</Text>
      <Text className="font-pmedium text-sm text-gray-100/70">{subtitle}</Text>
      <CustomButton
        title="Create Video"
        onPress={() => router.push('/create')}
        containerStyles="mt-5"
      />
    </View>
  );
};

export default EmptyList;
