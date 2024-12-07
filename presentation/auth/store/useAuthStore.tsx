import { authCheckStatus, authLogin } from "@/core/auth/actions/auth-actions";
import { User } from "@/core/auth/interface/user";
import { create } from "zustand";

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking'

export interface AuthState {
  status: AuthStatus;
  toke?:string;
  user?:User;

  login: (email:string, password:string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkStatus:() =>Promise<void>;
  changeStatus:(token?:string, user?:User) => boolean
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  //Properties
  status: 'checking',
  toke: undefined,
  user: undefined,
  //Actions
  login: async (email:string, password:string) => {

    const resp = await authLogin(email, password)
    return get().changeStatus(resp.token, resp.user)
  },
  logout: async () => {
    //Todo clear toke of secure storage
    set({ status: 'unauthenticated', toke: undefined, user: undefined })
  },

  changeStatus: (token?:string, user?:User) => {
   
    if (!token || !user) {
        
        set({ status: 'unauthenticated', toke: undefined, user: undefined })
        return false;
    
    }
    
    set({ status: 'authenticated', toke: token, user:user })
    return true
  },

  checkStatus: async () => {
    const resp = await authCheckStatus()

     get().changeStatus(resp?.token, resp?.user)
  }
}))