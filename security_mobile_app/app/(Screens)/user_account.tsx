import { SafeAreaView, Text, View, TouchableOpacity} from 'react-native'
import { supabase } from "../../lib/supabase";
import { useState, useEffect } from 'react';
import { Database } from '../../types/supabase'
import FontAwesome from '@expo/vector-icons/FontAwesome6';
import * as Location from 'expo-location';
import React from 'react';


const user_account = () =>{

    type _user = Database['public']['Tables']['UserAccount']['Row']
    type _location = Database['public']['Tables']['user_location']['Insert']
    
    const [User, setUser] = useState({} as _user)
    const [Id, setId] = useState("")
    const [location, setLocation] = useState({} as Location.LocationObject);
    const [text, setText] = useState("Set Location" as string)

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

    useEffect(()=>{ get_login_user() },[])

    return(
        
        <SafeAreaView 
          className="w-full h-screen flex flex-col space-y-4 justify-start 
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
              <FontAwesome name="location-crosshairs" size={22} color="#14b8a6" /> 
              <Text className='text-teal-500 font-semibold'>
                { text }
              </Text>
            </TouchableOpacity>
          </View>
          

        </SafeAreaView>
    )
}

export default user_account