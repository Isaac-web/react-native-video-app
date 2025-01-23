import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { Image } from 'react-native';
import FormField from '@/components/form-field';
import CustomButton from '@/components/custom-button';
import { Link, router } from 'expo-router';
import { createUser, signIn } from '@/lib/appwrite';

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleSignIn = async () => {
    const { email, password } = form;

    try {
      if (!email) return Alert.alert('Error', 'Please enter a valid email.');
      if (!password)
        return Alert.alert('Error', 'Please enter a valid password.');

      setIsSubmitting(true);

      await signIn(email, password);

      router.replace('/home');
    } catch (err: any) {
      Alert.alert('Error', err?.message);
      router.replace('/home');
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
              title="Login"
              containerStyles="mt-10"
              onPress={handleSignIn}
              isLoading={isSubmitting}
            />
          </View>

          <View className="justify-center pt-5 mt-50 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?{' '}
              <Link
                href={'/sign-up'}
                className="text-lg font-psemibold text-secondary"
              >
                Sign Up
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
