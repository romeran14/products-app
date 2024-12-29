
import { productsApi } from "@/core/api/productsApi";
import { User } from "../interface/user";

export interface AuthResponse{
    id: string;
    email: string;
    fullName: string;
    isActive: boolean;
    roles: string[];
    token: string;
}

const returnUserToken = (data:AuthResponse):{
    user: User,
    token: string
} => {

  const { token, ...user } = data;

  return {
    token,
    user
  }
}

export const authLogin = async ( email:string, password:string) => {
   
    email = email.toLowerCase().trim();

    try {
        const { data } = await productsApi.post<AuthResponse>('/auth/login', { email, password });

        return returnUserToken(data)
    } catch (error) {
        console.log(error)
        throw new Error('Error al iniciar sesión')
    }
}

export const authRegisterUser = async ( fullName:string, email:string, password:string) => {
   
    email = email.toLowerCase().trim();

    try {
        const { data } = await productsApi.post<AuthResponse>('/auth/register', { fullName, email, password });

        return returnUserToken(data)
    } catch (error) {
        console.log(error)
        throw new Error('Error al crear Usuario')
    }
}

export const authCheckStatus = async () => {
    try {
        const { data } = await productsApi.get<AuthResponse>('/auth/check-status');

        return returnUserToken(data)
    } catch (error) {
        console.log(error)
        return null
    }
}

//TODO hacer el registro