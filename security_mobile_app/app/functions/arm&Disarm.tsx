import { SafeAreaView, Text, TouchableOpacity } from 'react-native'


let _value:string = "ARMED";

const arm_disarm = ()=>{
    return(
        <SafeAreaView className='flex-1 space-y-6 items-center justify-center bg-[#202124]'>
            <Text className='text-3xl font-semibold text-white'>
                Actions
            </Text>

            <TouchableOpacity
             className="flex justify-center items-center border-2 rounded py-2 px-4 border-green-500 bg-opacity-20 w-1/2"
             onPress={() => _value == "ARMED"}
            >
                <Text
                 className="text-red-500"
                >
                    {_value}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default arm_disarm