import { SafeAreaView, Text, View } from "react-native";
import { Link, useRouter, Stack } from "expo-router"

const Home = () =>{
    //const router = useRouter();

    return(
        <SafeAreaView className="flex-1 items-center justify-center bg-[#202124] space-y-6 px-4 py-2">
            <Text
                className="text-4xl text-center font-semibold text-white"
            >
               Welcome The Security App
            </Text>

            <Text
                className="text-xl text-white"
            >
                🔐 Home Page 🔐
            </Text>

            <View className="w-full px-8 py-4 flex-row space-x-4 justify-center items-center">

                <Link
                 className="text-teal-600 border-2 border-teal-700 px-12 py-2 rounded-md font-semibold"
                 href='/auths/Login'
                >
                    Login
                </Link>

                <Link
                className="text-teal-600 border-2 border-teal-700 px-12 py-2 rounded-md font-semibold" 
                href='/auths/Register'
                >
                    Register
                </Link>

            </View>
        </SafeAreaView>
    )
}


export  default  Home