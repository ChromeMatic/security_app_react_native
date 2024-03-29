import { SafeAreaView, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import React, {useState} from "react";
import {router} from 'expo-router'
import { supabase } from "../../lib/supabase";


const Login = ()=>{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function LoginWithEmailPassword(){
        setLoading(true)

         if( email === "" || password === "" ){
            Alert.alert("Please ensure that an email address or password are not empty!!")
         }else{
            const {error, data:{session} } = await supabase.auth.signInWithPassword({ email,password })

            if(error) Alert.alert(error.message)
            if(session) { router.push("/main") }
         }

        setLoading(false)
    }

    return(
        <SafeAreaView className="w-full h-screen flex-1 items-start px-4 py-2 bg-[#1A1710]">

            <View
              className="w-full h-full flex-1 justify-center space-y-2"
            >

                <Text className="text-teal-500 text-center text-6xl py-4">
                    Login
                </Text>

                <Text className="text-teal-600 text-xl font-semibold">
                    Email Address
                </Text>

                <TextInput
                    className="p-2 rounded-md w-full bg-white border-2 border-teal-300 text-teal-600"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="📧 jhonsnow@gmail.com"
                />

                <Text className="text-teal-600 text-xl font-semibold pt-8">
                    Password
                </Text>

                <TextInput
                    className="p-2 rounded-md w-full bg-white border-2 border-teal-300 text-teal-600"
                    value={password}
                    onChangeText={setPassword}
                    placeholder="🔒 *******"
                    secureTextEntry
                />

                <View className="py-6 px-4 flex flex-col space-y-8">
                    <TouchableOpacity 
                     onPress={LoginWithEmailPassword}
                     disabled={loading}
                     className="rounded-md px-4 py-2.5 bg-white "
                    >
                        <Text className="text-center text-teal-800 font-semibold text-lg">
                            { loading ? 'Loading....':'LOGIN' }
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                     className="rounded-md"
                    >
                        <Text 
                         className="text-center uppercase font-extrabold text-teal-500 underline"
                        >
                            Forget Password
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>


        </SafeAreaView>
    )
}

export default Login
