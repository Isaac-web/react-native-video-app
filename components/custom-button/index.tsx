import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

type Props = {
  title: string;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
  onPress?(): void;
};

const CustomButton = ({
  title,
  onPress,
  containerStyles,
  textStyles,
  isLoading,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isLoading}
      className={`bg-secondary-100 min-h-[62px] justify-center items-center w-full rounded-xl ${containerStyles} ${
        isLoading ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <Text className={` font-psemibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
