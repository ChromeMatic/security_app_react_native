import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

const HomeScreen = ()=>{
    return(
        <SafeAreaView className="bg-[#191919] flex-1 space-y-8 justify-center items-center">
            <Text className="text-3xl font-semibold text-white">
              Home
            </Text>

            <View
             className="flex-row justify-center items-center w-full space-x-4 px-4"
            >
                <TouchableOpacity
                  className="border-2 rounded py-2 px-4 border-teal-700"
                  onPress={() => router.push('/accounts/user_account') }
                >
                    <Text className="text-teal-500">
                        Account Settings
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="border-2 rounded py-2 px-4 border-red-400 bg-opacity-20"
                  onPress={()=> router.push('/functions/arm&Disarm')}
                >
                    <Text className="text-red-500">
                        Arm & Disarm
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
              className="border-2 rounded py-2 px-4 border-teal-700 animate-pulse"
            //  onPress={()=> router.push('/functions/arm&Disarm')}
            >
                <Text className="text-teal-600 font-extrabold text-xl">
                    Panic
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default HomeScreen