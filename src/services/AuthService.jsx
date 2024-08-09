import React from 'react'
import { Api } from '../api/Api'

const AuthService = {
 async register(data){
return await Api.handleRequestPostAsync("Auth/register",data,false)
 },
 async login(data){
    return await Api.handleRequestPostAsync("Auth/login",data,false)
     }
}

export default AuthService
