import { SafeAreaView, Text, View, TouchableOpacity, Alert} from 'react-native'
import { supabase } from "../../lib/supabase";
import { useState, useEffect } from 'react';
import { Database } from '../../types/supabase'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import * as Location from 'expo-location';
import React from 'react';
import {router} from 'expo-router'


const user_account = () =>{

    type _user = Database['public']['Tables']['UserAccount']['Row']
    type _location = Database['public']['Tables']['user_location']['Insert']
    
    const [User, setUser] = useState({} as _user)
    const [Id, setId] = useState("")
    const [location, setLocation] = useState({} as Location.LocationObject);
    const [text, setText] = useState("Set Location" as string)
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
        setId(user_id)
        
        if(user_id){

            const { data} = await supabase
            .from('UserAccount')
            .select()
            .eq('user_Id',user_id)
    
            if(data){
              setUser(data[0])
            }
    
        }
    }

    async function get_user_location(){

      setText("Waiting...")

      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setText('Permission to access location was denied');
      }else{
        
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        save_location(location.coords)
        setText("Location Saved")
      }

    }

    async function save_location(location:_location | any){
      if(location){
          const { data, error } = await supabase
          .from('user_location')
          .insert([
            { 
              user_id: ''+Id,
              accuracy: Number(location.accuracy),
              altitude: Number(location.altitude),
              altitudeAccuracy: Number(location.altitudeAccuracy),
              heading: Number(location.heading),
              latitude: Number(location.latitude),
              longitude: Number(location.longitude),
              speed: Number(location.speed)
            }
          ]) 
          .select()
  
          if(data){ return data }
  
          if(error) throw error
      }
   }

   async function sign_out(){
    const { error } = await supabase.auth.signOut()

    if(error){
      Alert.alert(error.message)
    }else{
      router.push('/')
    }
  }

    useEffect(()=>{ get_login_user() },[])

    function route_pages(route:string){ router.push(route)}

    return(
        
        <SafeAreaView 
          className="w-full h-screen flex justify-between flex-col space-y-4 
          items-start p-1.5 bg-main"
        >

          <View
           className="flex-col space-y-1.5 py-4 px-2 w-full bg-[#202124] h-36
           rounded-b-lg border-b-2 border-teal-900"
          >
            <Text className="text-white text-4xl">
                User Account 
            </Text>

            <Text className="text-teal-500 font-semibold text-xl">
                {User.frist_name} {User.last_name}
            </Text>

            <Text className="text-teal-500 font-semibold text-xl">
                {User.email_address}
            </Text>
          </View>

          <View className='w-full flex justify-center items-center p-2'>
            <TouchableOpacity
             onPress={get_user_location}
             className="rounded-md p-1.5 flex justify-center
             items-center w-full space-x-2 bg-white"
            >
              <FontAwesome6 name="location-crosshairs" size={22} color="#14b8a6" /> 
              <Text className='text-teal-500 font-semibold'>
                { text }
              </Text>
            </TouchableOpacity>
          </View>

          <View>

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

export default user_account