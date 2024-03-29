import { useCallback } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Image, Alert } from "react-native";
import {router} from 'expo-router'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync();

const Home = () =>{

    const img = require('../images/pic.png')

    const [ fontsLoaded, fontError ] = useFonts({
        "Kode Mono": require('../assets/fonts/KodeMono-SemiBold.ttf')
    })

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
          await SplashScreen.hideAsync();
        }
      }, [fontsLoaded, fontError]);
    
      if (!fontsLoaded && !fontError) {
        return null;
      }

    return(
        <SafeAreaView 
         onLayout={onLayoutRootView}
         className="flex-1 items-center justify-center bg-green-100 space-y-6 px-4 py-2"
        >
            <Text
                className="text-4xl text-center font-semibold text-teal-800 font-Kode"
            >
               Welcome The Security App
            </Text>

            
            <Image 
             source={img} 
             className="h-64 w-1/2 rounded-md"
            />

            <View className="flex-row justify-center items-center w-full space-x-6">
                <TouchableOpacity
                 onPress={()=>{ router.push('/Login') }}
                 className="bg-[#007EF3] rounded-full py-1.5 px-8 w-1/2 flex justify-center items-center"
                >
                    <Text className="text-white font-light text-xl">
                        Login
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                 onPress={()=>{ router.push('/Register') }}
                 className="bg-green-500 rounded-full py-1.5 px-8 w-1/2 flex justify-center items-center"
                >
                    <Text className="text-white font-light text-xl">
                        Register
                    </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}


export  default  Home