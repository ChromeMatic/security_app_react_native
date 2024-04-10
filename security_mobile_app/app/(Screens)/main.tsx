import { useFonts } from 'expo-font'
import { Alert, TouchableOpacity, SafeAreaView, Text, View} from 'react-native'
import { supabase } from "../../lib/supabase";
import {router} from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Database } from '../../types/supabase'
import React,{ useState, useEffect } from 'react';
import MapView from 'react-native-maps';

const main = () =>{

  //type _loc = Database['public']['Tables']['user_location']['Row']

  type _loc = {
    latitude: any;
    longitude: any;
  }
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

  const [User, setUser] = useState({} as Database['public']['Tables']['UserAccount']['Row'])
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState({} as _loc)


  async function sign_out(){
    const { error } = await supabase.auth.signOut()

    if(error){
      Alert.alert(error.message)
    }else{
      router.push('/')
    }
  }

  async function get_login_user() {

      setLoading(true)
      
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

      setLoading(false)
      
      get_last_location() 
  }

  async function get_last_location(){

    const { data: { user } } = await supabase.auth.getUser()
    let _id:string = ''+user?.id
    
    if(_id){
      const { data } = await supabase
      .from('user_location')
      .select("latitude,longitude")
      .eq('user_id',_id)  

      if(data){ 
        let size:number = data.length -1
        setLocation(data[size]) 
      }
    }
  }

  function route_pages(route:string){ router.push(route)}

  useEffect(()=>{ 
    get_login_user()
  },[])


  return(
    <SafeAreaView 
      className="w-full h-screen flex flex-col space-y-4 justify-between items-center bg-[#1A1710]"
    >
            <View
             className="flex-col space-y-1.5 py-4 px-2 w-full bg-[#202124] h-36
             rounded-b-lg border-b-2 border-teal-900"
            >
              <Text className="text-teal-500 text-3xl font-semibold">
                Welcome Back
              </Text>

              <Text className="text-teal-500 text-xl">
                {User.frist_name} {User.last_name}
              </Text>

              <Text className="text-teal-500 text-base">
                {User.email_address}
              </Text>
            </View>

            <Text className='text-center text-teal-500 text-xl font-semibold'>
              Last Current Location {location.latitude}
            </Text>


            <View className="w-full h-96 rounded-md px-2">
              <MapView
               className="w-full h-full rounded-md overflow-hidden"
               initialRegion={{
                latitude: 18.14170398158974,
                latitudeDelta: 0.9,
                longitude: -77.29563344875488,
                longitudeDelta: 0.8,
               }}
              >
              </MapView>
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

export default main