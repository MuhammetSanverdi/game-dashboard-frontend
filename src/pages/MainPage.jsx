import React, { useState } from 'react'
import { Avatar, Dropdown, Footer, Navbar, Sidebar } from 'flowbite-react'
import BuildingTable from '../components/BuildingsTable'
import '../assets/css/mainPage.css'
import { useNavigate } from 'react-router-dom'

const MainPage = ({setIsLoading,setIsAuthenticated}) => {

  const [sidebarClosed,setSidebarClosed] = useState(true);

  const navigate = useNavigate();

  const logout=()=>{
    
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("Expiration")
    setIsAuthenticated(false)
    navigate("/login")    
  }

  const handleClosed=()=>{
      setSidebarClosed(!sidebarClosed)
    }

    return (
      <>
      <Navbar fluid rounded className='bg-gray-700 rounded-none'>
        <Navbar.Brand>
          <a href="/">
          <img  href="/" src="https://www.panteon.games/wp-content/themes/panteon/assets/img/logo.png" className="mr-3 h-6 sm:h-9" alt="Panteon Logo" />
          </a>         
          <button onClick={handleClosed} 
        type="button" 
        className="inline-flex items-start h-9 p-2 mt-2 ms-3 bg-gray-400 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-gray-200">
    <span className="sr-only">Open sidebar</span>
    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
    </svg>
  </button>
        </Navbar.Brand>
      
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
          inline
          label={<Avatar alt="User settings"  img="https://gamedash-ahavazdpaygvh6gr.eastus-01.azurewebsites.net/avatar.jpg" rounded />}
        >
          <Dropdown.Item onClick={()=>logout()}>Sign out</Dropdown.Item>
        </Dropdown>
      </div>
   
    </Navbar>
    <div className="flex h-screen">
      <div className='bg-black'>
      <Sidebar aria-label="Default sidebar example" color='#212121' className={(sidebarClosed?"w-0 ":"w-32 ")+(sidebarClosed?"md:w-0 ":"md:w-64 ")+"transition-width duration-500 rounded-tr-md rounded-br-md back-color" }>
        <Sidebar.Items className='pt-5'>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" className="bg-gray-400">Buildings</Sidebar.Item>
            
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      </div>
      <main className="flex-grow overflow-auto">
        <BuildingTable setIsLoading={setIsLoading} />
      </main>
    </div>
    <Footer container className="fixed bottom-0 w-full  bg-gray-600">
      <Footer.Copyright href="#" by="Panteon Games" className='text-black' year={2024}/>
      <Footer.LinkGroup className='text-black text-base'>
        <Footer.Link href="#">About</Footer.Link>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">Licensing</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  </>
  )
}

export default MainPage