import { SafeAreaView, Text, TextInput, View, Pressable, Alert } from "react-native";
import React, {useState} from "react";
import {router} from 'expo-router'
import { supabase } from "../../lib/supabase";

const Register = ()=>{

    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function signUpWithEmail() {
        setLoading(true)

        if( firstName === "" || lastName === "" || email === ""){
            Alert.alert("Please ensure that the first name & last name fields are filled.")
        }else{
            const {
                error, 
                data:{session} 
            } = await supabase.auth.signUp({ email, password })
    
            if(error) Alert.alert(error.message)
            if(session) { 

               const { data: { user } } = await supabase.auth.getUser()
               let user_id:string = ''+user?.id
               let email:string = ''+user?.user_metadata.email

               const {error} = await supabase
               .from('UserAccount')
               .insert({
                 frist_name:firstName, 
                 last_name:lastName,
                 email_address:email,
                 user_Id: user_id
                })
               
               if(error){
                    Alert.alert(error.message)
               }else{
                 router.push("/main") 
               }
            }
        }

        setLoading(false)
    }

    return(
        <SafeAreaView className="w-full h-screen flex-1 items-start px-4 py-2 bg-main">
            <View
                className="w-full h-full flex-1 justify-center space-y-2"
                >
                    <Text className="text-white text-center text-3xl py-4">
                      Register
                    </Text>

                    <Text className="text-white text-xl">
                       First Name
                    </Text>

                    <TextInput
                        className="p-2 rounded-md w-full bg-[#161A29] text-teal-400"
                        value={firstName}
                        onChangeText={setFirstName}
                        placeholder="Eg. John"
                    />

                    <Text className="text-white text-xl">
                       Last Name
                    </Text>

                    <TextInput
                        className="p-2 rounded-md w-full bg-[#161A29] text-teal-400"
                        value={lastName}
                        onChangeText={setLastName}
                        placeholder="Eg. John"
                    />
                    
                    <Text className="text-white text-xl">
                        Email Address
                    </Text>

                    <TextInput
                        className="p-2 rounded-md w-full bg-[#161A29] text-teal-400"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Eg. jhonsnow@gmail.com"
                    />

                    <Text className="text-white text-xl pt-2s">
                        Password
                    </Text>

                    <TextInput
                        className="p-2 rounded-md w-full bg-[#161A29] text-white"
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Eg. *******"
                        secureTextEntry
                    />

                   <View className="py-6 px-4">
                    <Pressable 
                        onPress={signUpWithEmail}
                        disabled={loading}
                        className="rounded-full px-8 py-4 bg-indigo-500 text-white"
                        >
                            <Text className="text-center text-white font-semibold">
                               { loading ? 'Creating An Account....':'SIGN UP' }
                            </Text>
                        </Pressable>
                   </View>

            </View>
        </SafeAreaView>
    )
}

export default Register