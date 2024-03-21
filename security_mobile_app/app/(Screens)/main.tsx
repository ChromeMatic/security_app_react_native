import { useFonts } from 'expo-font'
import { Alert, Pressable, SafeAreaView, Text, View} from 'react-native'
import { supabase } from "../../lib/supabase";
import { useState, useEffect } from 'react';
import {router} from 'expo-router'

const main = () =>{

  type user = {
    id:string,
    frist_name:string,
    last_name:string,
    email_address:string,
    user_Id:string
  }

    const [User, setUser] = useState({} as user)
    const [loading, setLoading] = useState(false)

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
    }

    useEffect(()=>{ get_login_user() },[])

    return(
        <SafeAreaView 
          className="w-full h-screen flex-1 justify-between 
          items-center  bg-green-100"
        >
            <View
             className="flex-col space-y-2 py-4 px-2 w-full bg-white h-36
             rounded-b-2xl"
            >
              <Text className="text-teal-800 text-4xl">
                Welcome Back
              </Text>

              <Text className="text-teal-800 text-xl">
                {User.frist_name} {User.last_name}
              </Text>
            </View>

            <View className="flex flex-col p-2 w-full bg-green-100 ">

             
              <View 
               className="flex flex-row justify-center items-center space-x-2 w-full h-24"
              >
                <Pressable className="bg-white rounded-md p-4 flex justify-center
                 items-center w-auto">
                   <Text>
                     Option 1
                   </Text>
                </Pressable>

                <Pressable className="bg-white rounded-md p-4 flex justify-center
                 items-center w-auto">
                  <Text>
                     Option 2
                   </Text>
                </Pressable>

                <Pressable className="bg-white rounded-md p-4 flex justify-center
                 items-center w-auto">
                  <Text>
                     Option 3
                   </Text>
                </Pressable>

                <Pressable className="bg-white rounded-md p-4 flex justify-center
                 items-center w-auto">
                  <Text>
                     Option 4
                   </Text>
                </Pressable>
              </View>

              <Pressable 
               onPress={sign_out}
               className="bg-white rounded-md p-4 flex justify-center
               items-center w-auto"
              >
                <Text>
                 { loading ? 'Loading...':'Sign Out ' }
                </Text>
              </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default main