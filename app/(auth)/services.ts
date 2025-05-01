import AxiosConfig from "@/config/axios"
import { UserCustomer } from "@/types/auth"



const axios = AxiosConfig()

export const registerCustomer = async(payload:UserCustomer)=>{
    const res = await axios.post('UserCustomer/create',
        payload
    )

    return res.data;
}