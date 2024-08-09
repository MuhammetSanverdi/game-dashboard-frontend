import React from 'react'
import { Api } from '../api/Api'

export const BuildingTypeService ={

   async getAllByUser(){
        return await Api.handleRequestGetAsync("BuildingTypes/getall")
    }
}
