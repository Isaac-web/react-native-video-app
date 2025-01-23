import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardTypeOptions,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { icons } from '../../constants';

type Props = {
  value: string;
  label?: string;
  placeholder?: string;
  className?: string;
  keyboardType?: KeyboardTypeOptions;
  onChangeText(value: string): void;
};

const SearchInput = ({
  label,
  value,
  placeholder,
  onChangeText,
  className,
  keyboardType,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`space-y-5 space-x-4 ${className}`}>
      {label && (
        <Text className="text-base text-gray-100 font-pmedium mb-2">
          {label}
        </Text>
      )}
      <View
        className={`flex flex-row items-center w-full px-5 h-16 bg-black-100 border-2 ${
          isFocused ? 'border-secondary' : 'border-black-200'
        } rounded-2xl`}
      >
        <TextInput
          className="text-base mt-1 text-white flex-1 font-pregular"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={'#7b7b8b'}
          onChangeText={onChangeText}
          secureTextEntry={label === 'Password' && showPassword ? true : false}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <TouchableOpacity
          onPress={() => setShowPassword((prev) => !prev)}
          activeOpacity={0.7}
        >
          <Image
            source={icons.search}
            fadeDuration={0}
            resizeMode="contain"
            className="w-6 h-6"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchInput;
