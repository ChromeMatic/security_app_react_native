import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router"


const LoginScreen = () =>{
    return(
        <SafeAreaView className="bg-[#191919]  flex-1 justify-center items-center space-y-4">
            <Text className="text-3xl font-semibold text-white">
                Login Screen
            </Text>

            <TouchableOpacity
             className="flex justify-center items-center border-2 rounded w-1/2 p-2 border-teal-700"
             onPress={()=> router.push('/homeScreen')}
            >
                <Text className="text-base font-semibold text-white text-center">
                  Home
                </Text>  
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default LoginScreen