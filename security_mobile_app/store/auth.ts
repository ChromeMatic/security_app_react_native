import { supabase } from "../lib/supabase";
import { Database } from '../types/supabase'


type _user = Database['public']['Tables']['UserAccount']['Row']

export async function get_login_user() {

    let User:_user = {} as _user

    const { data: { user } } = await supabase.auth.getUser()
    let user_id:string = ''+user?.id
    
    if(user_id){
        const { data} = await supabase
        .from('UserAccount')
        .select()
        .eq('user_Id',user_id)

        if(data){  User = data[0] }
    }

    return User
}