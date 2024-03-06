import { useFonts } from 'expo-font'
import { SafeAreaView, Text} from 'react-native'
import { supabase } from "../../lib/supabase";
import { useState } from 'react';

const main = () =>{

    const [User, setUser] = useState({})

    async function get_login_user() {
        const user = await supabase.auth.getUser()
        setUser(user.data)
        return User
    }

    return(
        <SafeAreaView className="w-full h-screen flex-1 justify-center items-center px-4 py-2 bg-[#020717]">
            <Text className="text-white text-4xl">
                Welcome 
            </Text>
        </SafeAreaView>
    )
}

export default main