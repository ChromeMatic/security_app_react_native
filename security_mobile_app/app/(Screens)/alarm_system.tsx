import { SafeAreaView, Text, TouchableOpacity, Alert} from 'react-native'
import { supabase } from "../../lib/supabase";
import { useState, useEffect } from 'react';
import { Database } from "../../types/supabase";
import FontAwesome from '@expo/vector-icons/FontAwesome6';
import React from 'react';

const alarm_system = () =>{

    type _alarm = Database['public']['Tables']['Alarm']['Row']
    const [User, setUser] = useState("" as string)

    async function get_login_user() {
        const { data: { user } } = await supabase.auth.getUser()
        let user_id:string = ''+user?.id

        if(user_id){ setUser(user_id) }
    }

    async function _Alert(){
       const { data, error } = await supabase
       .from('Alarm')
       .select("*")
       .eq('user_id',User)

       if(data){
            const { error} = await supabase
            .from('Alarm')
            .insert([
            { 
                user_id: ''+User, 
                alarm_status: true 
            },
            ])
            .select()
    
            if(error){ Alert.alert(error.message) }
       }

    }

    useEffect(()=>{ get_login_user() },[])

    return(
        
        <SafeAreaView 
          className="w-full h-screen flex flex-col space-y-8 justify-center items-center px-4 py-2 bg-main"
        >

            <TouchableOpacity
              className="border-2 flex flex-col space-y-2 p-2 w-full border-teal-900 rounded-md
              justify-center items-center"
              onPress={_Alert}
            >
                <FontAwesome name="bell" size={24} color="#14b8a6" />
                <Text className="text-teal-500">
                    Alarm System
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default alarm_system