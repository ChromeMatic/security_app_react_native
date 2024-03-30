import { SafeAreaView, Image, TextInput, View,Text, TouchableOpacity, Alert } from 'react-native'
import { useState, useEffect } from 'react';
import { supabase } from "../../lib/supabase";


const reset_account = () =>{

    const [email, setEmail] = useState("")

    function send_recovery_email(){
        if(email){
            Alert.alert("Please provide an email address")
        }else{
            //
        }
    }
    
    return(
        <SafeAreaView
         className="w-full h-screen flex-1 items-start bg-[#1A1710]"
        >

            <View
             className="flex-col justify-center items-start space-y-1.5 py-4 px-2  w-full bg-[#202124] h-40
             border-b-2 border-teal-500"
            >
              <Text className="text-teal-500 text-4xl">
                Reset Account
              </Text>

              <Text className="text-teal-500 text-lg">
               Please provide your email address below.
              </Text>

            </View>

            <View 
             className="flex justify-center items-center py-8 w-full"
            >
                <Image
                source={require('../../images/undraw_Safe_re_kiil.png')}
                style={{ 
                    width: 395, 
                    height: 175, 
                    borderRadius: 16
                }} 
                />

            </View>

            <View
             className="w-full  flex-col justify-center space-y-4 px-6"
            >
                <Text className="font-semibold text-teal-500 text-xl">
                    Email Address
                </Text>

                <TextInput
                 className="p-2 rounded-md w-full bg-white text-teal-400"
                 value={email}
                 onChangeText={setEmail}
                 placeholder="Eg. JohnDoe@gmail.com"
                />

                <View
                  className="w-full py-8 px-10 flex justify-center items-center"
                > 
                    <TouchableOpacity 
                    onPress={send_recovery_email}
                    className="bg-white py-2.5 px-8 rounded-md shadow-sm w-full" 
                    >
                    <Text className="text-lg font-bold text-teal-700 text-center capitalize">
                        send magic link
                    </Text>
                    </TouchableOpacity>
                </View>    

            </View>

        </SafeAreaView>
    )
}

export default reset_account