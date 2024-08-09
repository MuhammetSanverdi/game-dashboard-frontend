import React from 'react'
import { Api } from '../api/Api'

export const BuildingService = {

    async add(data){
        return await Api.handleRequestPostAsync("Buildings/add",data);
    },
        async getAllByUser(){
        return await Api.handleRequestGetAsync("Buildings/getallbyuser");
    }
}
