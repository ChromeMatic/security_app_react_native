import { SafeAreaView, Text} from 'react-native'
import { supabase } from "../../lib/supabase";
import { useState, useEffect } from 'react';

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
          className="w-full h-screen flex-1 justify-center 
          items-center px-4 py-2 bg-green-100"
        >
            <Text className="text-teal-700 text-4xl">
                Settings
            </Text>
        </SafeAreaView>
    )
}

export default settings