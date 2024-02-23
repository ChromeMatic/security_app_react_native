import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router"

const UserAccount = ()=>{
    return(
        <SafeAreaView className="bg-[#191919] flex-1 space-y-6 justify-center items-center">
            <Text className="text-3xl font-semibold text-white">
                User Account
            </Text>

            <TouchableOpacity
             onPress={()=> router.push('/') }
             className="flex-row space-x-2 justify-center items-center border-2 border-teal-300 w-1/2 py-2 rounded-md"
            >
                <Text className="text-white font-semibold text-xl">
                 🏠 Home
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default UserAccount