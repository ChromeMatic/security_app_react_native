import React,{ useState, useEffect } from 'react';
import { SafeAreaView, Text} from 'react-native'
import { supabase } from "../../lib/supabase";

const settings = () =>{

    const [User, setUser] = useState({})

    async function get_login_user() {
        const user = await supabase.auth.getUser()
        setUser(user.data)
        return User
    }

    useEffect(()=>{ get_login_user() },[])

    return(
        
        <SafeAreaView 
         className="w-full h-screen flex flex-col space-y-4 justify-center items-center bg-[#1A1710]"
        >
            <Text className="text-teal-500 text-4xl font-semibold">
                Settings
            </Text>
        </SafeAreaView>
    )
}

export default settings