import { SafeAreaView, Text, TextInput, View, Pressable, Alert } from "react-native";
import React, {useState} from "react";
import {router} from 'expo-router'
import { supabase } from "../../lib/supabase";


const Login = ()=>{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function LoginWithEmailPassword(){
        setLoading(true)

        const {error, data:{session} } = await supabase.auth.signInWithPassword({ email,password })

        if(error) Alert.alert(error.message)
        if(session) { router.push("/main") }

        setLoading(false)
    }

    return(
        <SafeAreaView className="w-full h-screen flex-1 items-start px-4 py-2 bg-[#020717]">

            <View
              className="w-full h-full flex-1 justify-center space-y-2"
            >

                <Text className="text-white text-center text-3xl py-4">
                    Login
                </Text>

                <Text className="text-white text-xl">
                    Email Address
                </Text>

                <TextInput
                    className="p-2 rounded-md w-full bg-[#161A29] text-teal-400"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Eg. jhonsnow@gmail.com"
                />

                <Text className="text-white text-xl pt-8">
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
                    onPress={LoginWithEmailPassword}
                    disabled={loading}
                    className="rounded-full px-8 py-4 bg-indigo-500 text-white"
                    >
                        <Text className="text-center text-white font-semibold">
                            { loading ? 'Loading....':'LOGIN' }
                        </Text>
                    </Pressable>
                </View>
            </View>


        </SafeAreaView>
    )
}

export default Login