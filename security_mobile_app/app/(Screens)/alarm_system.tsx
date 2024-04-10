import { SafeAreaView, Text} from 'react-native'
import { supabase } from "../../lib/supabase";
import { useState, useEffect } from 'react';
import React from 'react';

const alarm_system = () =>{

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
          items-center px-4 py-2 bg-main"
        >
            <Text className="text-white text-4xl">
                Alarm System
            </Text>
        </SafeAreaView>
    )
}

export default alarm_system