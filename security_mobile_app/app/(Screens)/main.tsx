import { useFonts } from 'expo-font'
import { SafeAreaView, Text} from 'react-native'
import { supabase } from "../../lib/supabase";
import { useState, useEffect } from 'react';

const main = () =>{

  type user = {
    id:string,
    frist_name:string,
    last_name:string,
    email_address:string,
    user_Id:string
  }

    const [User, setUser] = useState("")

    async function get_login_user() {
      const { data: { user } } = await supabase.auth.getUser()
      //setUser(user?.user_metadata.email)
    }

    useEffect(()=>{ get_login_user() },[])

    return(
        <SafeAreaView 
          className="w-full h-screen flex-1 justify-center 
          items-center px-4 py-2 bg-main"
        >
            <Text className="text-white text-4xl">
              {User}
            </Text>
        </SafeAreaView>
    )
}

export default main