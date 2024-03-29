import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native';
import {router} from 'expo-router'

const imageUrl = 'https://images.unsplash.com/photo-1587647069256-6ec77c96c2a4?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

function toLogin(){ router.push('/Login')}

function Register (){ router.push('/Register') }

const LandingPage = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-[#1A1710]">
      
      <Image 
        source={{ uri: imageUrl }} 
        style={{ 
            width: 395, 
            height: 575, 
            marginBottom: 16, 
            borderTopRightRadius: 25,
            borderTopLeftRadius: 125,
            borderBottomRightRadius: 375,
            borderBottomLeftRadius: 25, 
        }} 
      />

      <Text className="text-3xl font-bold text-teal-500 mb-6 ">
        Security App
      </Text>

      <Text className="text-xl text-center text-teal-600 mb-6 px-4">
        Protecting your home has never been easier.
      </Text>

      <View className="flex flex-row space-x-8">

        <TouchableOpacity 
         onPress={toLogin}
         className="bg-white py-2.5 px-8 rounded-md shadow-sm"
        >
          <Text className="text-lg font-bold text-teal-700">Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity 
         onPress={Register}
         className="bg-white py-2.5 px-8 rounded-md shadow-sm" 
        >
          <Text className="text-lg font-bold text-teal-700">Register</Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
};

export default LandingPage;
