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
            Alert.alert("Please ensure that all fields are filled.")
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
        <SafeAreaView className="w-full h-screen flex-1 items-start px-6 py-2 bg-[#1A1710]">
            <View
                className="w-full h-full flex-1 justify-center space-y-2"
                >
                     <Text className="text-teal-500 text-center text-6xl pb-8">
                      Register
                    </Text>

                    <Text className="text-teal-600 text-xl font-semibold py-4">
                       First Name
                    </Text>

                    <TextInput
                        className="p-2 rounded-md w-full bg-white text-teal-400"
                        value={firstName}
                        onChangeText={setFirstName}
                        placeholder="Eg. John"
                    />

                    <Text className="text-teal-600 text-xl font-semibold">
                       Last Name
                    </Text>

                    <TextInput
                        className="p-2 rounded-md w-full bg-white text-teal-400"
                        value={lastName}
                        onChangeText={setLastName}
                        placeholder="Eg. John"
                    />
                    
                    <Text className="text-teal-600 text-xl font-semibold">
                        Email Address
                    </Text>

                    <TextInput
                         className="p-2 rounded-md w-full bg-white text-teal-400"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Eg. jhonsnow@gmail.com"
                    />

                    <Text className="text-teal-600 text-xl font-semibold">
                        Password
                    </Text>

                    <TextInput
                         className="p-2 rounded-md w-full bg-white text-teal-400"
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Eg. *******"
                        secureTextEntry
                    />

                   <View className="pt-16 px-4">
                    <Pressable 
                        onPress={signUpWithEmail}
                        disabled={loading}
                        className="rounded-lg px-8 py-2.5 bg-white"
                        >
                            <Text className="text-center text-teal-800 font-semibold">
                               { loading ? 'Creating An Account....':'SIGN UP' }
                            </Text>
                        </Pressable>
                   </View>

            </View>
        </SafeAreaView>
    )
}

export default Register