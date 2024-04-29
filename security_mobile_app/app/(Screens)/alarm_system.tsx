import { SafeAreaView, View, Text, TouchableOpacity, Alert} from 'react-native'
import { supabase } from "../../lib/supabase";
import { useState, useEffect } from 'react';
import { Database } from "../../types/supabase";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react';
import {router} from 'expo-router'

const alarm_system = () =>{

    type _alarm = Database['public']['Tables']['Alarm']['Row']
    
    const [User, setUser] = useState("" as string)
    const [loading, setLoading] = useState(false)

    type ScreenRoutesType = {
      name:string,
      route:string,
    }
  
    let Screens:ScreenRoutesType[] = [
      {
        name:"home",
        route:"/main"
      },
      {
        name:"Account",
        route:"/user_account"
      },
      {
        name:"Alarm",
        route:"/alarm_system"
      },
      {
        name:"Settings",
        route:"/settings"
      },
    ]

    async function get_login_user() {
        const { data: { user } } = await supabase.auth.getUser()
        let user_id:string = ''+user?.id

        if(user_id){ setUser(user_id) }
    }

    async function sign_out(){
        const { error } = await supabase.auth.signOut()
    
        if(error){
          Alert.alert(error.message)
        }else{
          router.push('/')
        }
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
    //<MaterialIcons name="crisis-alert" size={24} color="black" />

    function route_pages(route:string){ router.push(route)}

    useEffect(()=>{ get_login_user() },[])

    return(
        
        <SafeAreaView 
          className="w-full h-screen flex flex-col space-y-8 justify-between items-center px-4 py-2 bg-main"
        >
            <View
           className="flex-col space-y-1.5 py-4 px-2 w-full bg-[#202124] h-36
           rounded-b-lg border-b-2 border-teal-900"
          >
            <Text className="text-white text-4xl">
                User Account 
            </Text>

            <Text className="text-teal-500 font-semibold text-xl">
               user account settings
            </Text>
          </View>

          <View className="flex w-full flex-col space-y-6">
            <TouchableOpacity
             className="border-2 flex flex-col space-y-2 p-2 w-full border-teal-900 rounded-md
             justify-center items-center bg-white"
              onPress={_Alert}
            >
                <FontAwesome6 name="bell" size={24} color="#14b8a6" />
                <Text className="text-teal-500">
                    Alarm System
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="border-2 flex flex-col space-y-2 p-2 w-full border-teal-900 rounded-md
              justify-center items-center bg-white"
            >  
                <MaterialIcons name="crisis-alert" size={24} color="#14b8a6" />
                <Text className="text-teal-500">
                    PANIC
                </Text>
            </TouchableOpacity>
          </View>

            <View 
             className="flex flex-col p-2.5 w-full bg-[#202124] rounded-t-lg 
             border-t-2 border-teal-900"
            >

                <View 
                className="flex flex-row justify-center items-center space-x-6 w-full h-24"
                >
                    {Screens.map((screen)=>(
                    <TouchableOpacity
                    onPress={() => route_pages(screen.route)}
                    className=" rounded-md p-2 flex justify-center
                    items-center w-20 bg-[#191919]"
                    >
                        { screen.name === "home" ? 
                        <FontAwesome name="home" size={32} color="#14b8a6" /> 
                        : '' 
                        }

                        { screen.name === "Account" ? 
                        <FontAwesome name="user" size={32} color="#14b8a6" /> 
                        : '' 
                        }

                        { screen.name === "Alarm" ? 
                        <FontAwesome name="exclamation-triangle" size={32} color="#14b8a6" /> 
                        : '' 
                        }

                        { screen.name === "Settings" ? 
                        <FontAwesome name="cog" size={32} color="#14b8a6" /> 
                        : '' 
                        }

                        <Text className="capitalize font-semibold text-teal-500">
                        {screen.name}
                        </Text>
                    </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity 
                onPress={sign_out}
                className="bg-[#191919] rounded-md p-1.5 flex flex-col space-y-0.5 justify-center
                items-center w-auto"
                >
                    <FontAwesome name="sign-out" size={32} color="#14b8a6" /> 
                    <Text className="uppercase font-semibold text-teal-500 text-sm">
                    { loading ? 'Loading...':'Sign Out ' }
                    </Text>
                </TouchableOpacity>
                
            </View>


        </SafeAreaView>
    )
}

export default alarm_system