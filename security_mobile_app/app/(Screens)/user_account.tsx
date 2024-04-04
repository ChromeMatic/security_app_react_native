import { SafeAreaView, Text, View} from 'react-native'
import { supabase } from "../../lib/supabase";
import { useState, useEffect } from 'react';


const user_account = () =>{

    type user = {
        id:string,
        frist_name:string,
        last_name:string,
        email_address:string,
        user_Id:string
    }
    
    const [User, setUser] = useState({} as user)

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
          </View>

          

        </SafeAreaView>
    )
}

export default user_account