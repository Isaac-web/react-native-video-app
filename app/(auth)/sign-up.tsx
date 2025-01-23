import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';

import FormField from '@/components/form-field';
import CustomButton from '@/components/custom-button';
import { Link, router } from 'expo-router';
import { createUser } from '@/lib/appwrite';

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleCreateUser = async () => {
    const { email, password, username } = form;

    try {
      if (!email) return Alert.alert('Error', 'Please enter a valid email.');
      if (!password)
        return Alert.alert('Error', 'Please enter a valid password.');
      if (!username)
        return Alert.alert('Error', 'Please enter a valid username.');

      setIsSubmitting(true);

      await createUser(email, password, username);

      router.replace('/home');
    } catch (err: any) {
      Alert.alert('Error', err?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center  min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Login to Aora
          </Text>

          <View className="space-y-5">
            <FormField
              label="Username"
              value={form.username}
              placeholder="Enter your email"
              onChangeText={(value: string) =>
                setForm({ ...form, username: value })
              }
              className="mt-10"
              keyboardType="email-address"
            />

            <FormField
              label="Email"
              value={form.email}
              placeholder="Enter your email"
              onChangeText={(value: string) =>
                setForm({ ...form, email: value })
              }
              className="mt-7"
              keyboardType="email-address"
            />

            <FormField
              label="Password"
              value={form.password}
              placeholder="Enter your password"
              onChangeText={(value: string) =>
                setForm({ ...form, password: value })
              }
              className="mt-7"
              keyboardType="default"
            />

            <CustomButton
              title="Sign Up"
              containerStyles="mt-10"
              onPress={handleCreateUser}
              isLoading={isSubmitting}
            />
          </View>

          <View className="justify-center pt-5 mt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an account?{' '}
              <Link
                href={'/sign-in'}
                className="text-lg font-psemibold text-secondary"
              >
                Sign In
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
