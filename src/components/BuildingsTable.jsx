import React, { useEffect, useState } from 'react'
// import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { Button, Checkbox, Datepicker, Dropdown, Label, Modal, Select, Textarea, TextInput } from "flowbite-react";
import { Navigate, useNavigate } from 'react-router-dom';
import { BuildingTypeService } from '../services/BuildingTypeService';
import { BuildingService } from '../services/BuildingService';
import ToastService from '../services/ToastService';


const BuildingTable = ({ setIsLoading }) => {

    const navigate = useNavigate();
    const [status, setStatus] = useState(0);
    const [buildings, setBuildings] = useState([]);
    const [buildingTypes, setBuildingTypes] = useState([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [selectedType,setSelectedType] = useState("")

    useEffect(() => {

        const getValues = async () => { 
            setIsLoading(true)
            try {
               
                const buildingResponse = await BuildingService.getAllByUser();
                const buildingTypeResponse = await BuildingTypeService.getAllByUser();



                if (buildingResponse.status === 200 && buildingTypeResponse.status === 200) {
                    console.log(buildingResponse.data.data);
                    console.log(buildingTypeResponse.data.data);

                    setBuildings(buildingResponse.data.data);
                    setBuildingTypes(buildingTypeResponse.data.data)

                }

            }
            catch (error) {
                console.log(error);
            }
            finally {
                setStatus(200)
                setIsLoading(false)
                console.log(buildings, buildingTypes);

            }
        }
        getValues();

    }, [])

    const handleChange = (event) => {
        console.log(event.target.value);
        
        
        setSelectedType(event.target.value);
      };

    const handleAddSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true)

console.log(e.target.buildingTypeId);

        // if(selectedType==null | selectedType==="" ){
        //     ToastService.toastWarning("Build type not selected");
        //     setIsLoading(false)
        //     return;
        // }

        const buildingData = {
            // userId: "",
            cost: Number(e.target.cost.value),
            constructionTime:Number(e.target.constructionTime.value),
            buildingTypeId:e.target.buildingTypeId.value
        }
        let error = [];
        console.log(buildingData);

        if (buildingData.cost <= 0) {
            error.push("Building cost must be greater than 0. ")
        }
        if (buildingData.constructionTime < 30 || buildingData.constructionTime>1800) {
            error.push("Building construction time must be between 30 and 1800 seconds.")
        }
        console.log(error);

        if (error.length == 0) {
            const response = await BuildingService.add(buildingData);
            console.log(response);

            if (response.status === 200) {
                const buildings = await BuildingService.getAllByUser();
                const buildingTypes =await BuildingTypeService.getAllByUser();
                setBuildings(buildings.data.data);
                setBuildingTypes(buildingTypes.data.data)                
                
                setOpenAddModal(false)
            }
           
        }
        else {
            
            ToastService.toastWarning(<div>{error[0]} <br /> {error[1]}</div>, "dark");
        }
        setIsLoading(false)
    }


    if (status === 200 ) {
        return (

            <div className=' min-w-full h-full '>
                <div className='h-full'>
                    {/* <!-- Start block --> */}
                    <section className="bg-slate-900 h-full dark:bg-gray-900 px-3 pt-8  md:p-12 antialiased">
                        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                            {/* <!-- Start coding here --> */}
                            <div className="bg-gray-800 dark:bg-gray-800 relative rounded-lg overflow-hidden shadow-xl">
                                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                                    <div className="w-full md:w-1/2">
                                    {buildingTypes.length>0?(
                                        <button type="button" onClick={() => setOpenAddModal(true)} id="createProductModalButton" data-modal-target="createProductModal" data-modal-toggle="createProductModal"
                                            className="flex items-center justify-center text-white bg-palette-4 hover:bg-gray-300 hover:text-gray-800 font-medium rounded-lg text-sm px-4 py-2 transition duration-250 
                                     focus:outline-none ">
                                            <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                            </svg>
                                            Add Building
                                        </button>):<></>}
                                                                            </div>
                                </div>


                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left text-gray-400 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
                                            <tr className="border-b dark:border-gray-700 text-gray-400 font-medium   text-base">
                                                <td scope="col" className="px-4 py-4 ">
                                                    Building Type
                                                </td>
                                                <td scope="col" className="px-4 py-4 ">
                                                    Building Cost
                                                </td>
                                                <td scope="col" className="px-4 py-4">
                                                    Construction Time
                                                </td>
                                            </tr>
                                        </thead>
                                        {buildings ?
                                            <tbody>
                                                {buildings.length > 0 ? (
                                                    buildings.map((building, index) => (
                                                        <tr key={index} className="border-b dark:border-gray-700 ">
                                                            <td scope='col' className="px-4 py-3">
                                                                {building.buildingTypeName}
                                                            </td>
                                                            <td scope='col' className="px-4 py-3">
                                                                {building.cost}
                                                            </td>
                                                            <td scope='col' className="px-4 py-3">
                                                                {building.constructionTime}
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <></>
                                                )}
                                            </tbody>
                                            :
                                            <></>
                                        }

                                    </table>
                                </div>
                                <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">

                                </nav>
                            </div>
                        </div>
                    </section>

                </div>            

                <Modal show={openAddModal} onClose={() => setOpenAddModal(false)} size="sm" >
                    <Modal.Header className='bg-gray-600'>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                            Add Building
                        </div>
                    </Modal.Header>
                    <Modal.Body className='overflow-visible bg-gray-400' >
                        <form onSubmit={handleAddSubmit} className="mt-1 mb-1 ">
                            <div className="grid gap-4 mb-4 grid-cols-3">
                                <div className="col-span-3">

                                    <select id="buildingTypeId" value={selectedType}   onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        
                                        {buildingTypes.map((type) => (
                                            <option key={type.id} value={type.id}>{type.name}</option>
                                        ))}
                                    </select>

                                </div>

                                <div className="col-span-3">
                                    <TextInput
                                    type='number'
                                        label="Cost"
                                        id="cost"
                                        placeholder="Cost"
                                        required
                                    />
                                </div>
                                <div className="col-span-3">
                                    <TextInput
                                        label="ConstructionTime"
                                        id="constructionTime"
                                        placeholder="Construction Time"
                                        type='number'
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit" size="md" className="text-white inline-flex items-center bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
                                    </svg>
                                    Add
                                </Button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
    else {
        return (

            <div className=' min-w-full h-full '>
                <div className='h-full'>
                    {/* <!-- Start block --> */}
                    <section className="bg-slate-900 h-full dark:bg-gray-900 px-3 pt-8  md:p-12 antialiased">
                        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                            {/* <!-- Start coding here --> */}

                        </div>
                    </section>

                </div>




            </div>
        )
    }
    


}

export default BuildingTable


