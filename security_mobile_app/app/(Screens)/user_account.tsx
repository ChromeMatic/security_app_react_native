import { SafeAreaView, Text, View, TouchableOpacity} from 'react-native'
import { supabase } from "../../lib/supabase";
import { useState, useEffect } from 'react';
import { Database } from '../../types/supabase-types'
import FontAwesome from '@expo/vector-icons/FontAwesome6';
import * as Location from 'expo-location';

const user_account = () =>{
    
    const [User, setUser] = useState({} as Database['public']['Tables']['UserAccount']['Row'])
    const [location, setLocation] = useState({} as Location.LocationObject);
    const [text, setText] = useState("Set Location" as string)

    async function get_login_user() {
        
        const { data: { user } } = await supabase.auth.getUser()
        let user_id:string = ''+user?.id
        
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
        console.info(location.coords)
        setText("Location Saved")
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