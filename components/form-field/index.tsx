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
  label: string;
  value: string;
  placeholder?: string;
  onChangeText(value: string): void;
  className: string;
  keyboardType: KeyboardTypeOptions;
};

const FormField = ({
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
    <View className={`space-y-5 ${className}`}>
      <Text className="text-base text-gray-100 font-pmedium mb-2">{label}</Text>
      <View
        className={`flex flex-row items-center w-full px-5 h-16 bg-black-100 border-2 ${
          isFocused ? 'border-secondary' : 'border-black-200'
        } rounded-2xl`}
      >
        <TextInput
          className="flex-1 text-white font-psemibold"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={'#7b7b8b'}
          onChangeText={onChangeText}
          secureTextEntry={label === 'Password' && showPassword ? true : false}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {label === 'Password' && (
          <TouchableOpacity
            onPress={() => setShowPassword((prev) => !prev)}
            activeOpacity={0.7}
          >
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
