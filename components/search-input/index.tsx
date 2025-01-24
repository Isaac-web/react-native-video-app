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
import { router, useLocalSearchParams, usePathname } from 'expo-router';

type Props = {
  value?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?(value: string): void;
};

const SearchInput = ({
  label,
  placeholder,
  className,
  keyboardType,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const pathname = usePathname();

  const { query: searchQuery } = useLocalSearchParams();
  const [query, setQuery] = useState(searchQuery as string);

  const handleSearch = () => {
    if (pathname.startsWith('/search')) router.setParams({ query });
    else router.push(`/search/${query}`);
  };

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
          value={query}
          placeholder={placeholder}
          placeholderTextColor={'#CDCDE0'}
          onChangeText={(value) => setQuery(value)}
          keyboardType={'web-search'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <TouchableOpacity activeOpacity={0.7} onPress={() => handleSearch()}>
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
