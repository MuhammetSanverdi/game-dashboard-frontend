import { Button, Checkbox, Label, TextInput, Card } from 'flowbite-react';
import { Input } from 'postcss';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import ToastService from '../services/ToastService';

const Login = ({setIsLoading,setIsAuthenticated}) => {
    const navigate = useNavigate();

const handleSubmit=async (e)=>{
    e.preventDefault();

    setIsLoading(true)
    
    const loginData = {
        username: e.target.username.value,
        password: e.target.password.value
    }
    let error = [];
    console.log(loginData.username.length);
    
    if(loginData.username.length<4){
        error.push("Username length must be greater than 4. ")
    }
    if(loginData.password.length<8){
        error.push("Password length must be greater than 8.")
    }
    console.log(error);
    
    if(error.length==0){
        const response = await AuthService.login(loginData);
        console.log(response);
        
        if(response.status===200 && response.data.data!==null)
        {
            sessionStorage.setItem("Token",response.data.data.accessToken);
            sessionStorage.setItem("Expiration",response.data.data.expirationTime);
            setIsAuthenticated(true)
            navigate("/home");
        }
        setIsLoading(false)
    }
    else
    {
        ToastService.toastWarning(<div>{error[0]} <br/> {error[1]}</div>,"dark");
    }
}

    return (

        <section className='bg-slate-900 h-100'>
            <div className='flex flex-col items-center justify-center px-6 py-8 md:max-w-sm lg:max-w-lg sm:mx-auto h-screen lg:py-0 lg:px-12 font-body'>
                <a href="https://www.panteon.games" className="flex items-center mb-6  text-gray-900">
                    <img className="h-10 mb-3 md:h-12" src="
https://www.panteon.games/wp-content/themes/panteon/assets/img/logo.png" alt="logo" />

                </a>
                <Card className='bg-palette-4 border-none sm:px-4 sm:py-8 lg:w-96'>
                    <form onSubmit={handleSubmit}>

                        <Label className='flex justify-center mt-4 mb-2 text-gray-800 sm:text-lg lg:text-xl font-custom' htmlFor="username" value='Username' />
                        <TextInput className='mb-3 ' id='username' type='text' required />


                        <Label className='flex justify-center mt-4 mb-2 text-gray-800 sm:text-lg lg:text-xl font-custom' htmlFor="password" value='Password' />
                        <TextInput className='mb-3' id='password' type='password' required />

                        <div className='flex justify-center items-center mb-3 font-custom'>
                            <button type='submit1' className='mt-3 px-16 py-3 rounded-md ease-out duration-500 text-gray-100 bg-gray-700 hover:bg-white hover:text-gray-700'>
                                Sign in
                            </button>
                        </div>
                        <p className="flex justify-center mx-auto pt-4 pb-1 font-custom text-gray-800">
                            Don’t have an account yet?
                        </p>
                        <div className='flex justify-center items-center mb-3'>
                            <Link to='/register'>
                                <button className='bg-gray-400 hover:bg-gray-100 hover:text-gray-900 mt-3 px-5 py-2 font-medium  ease-out duration-300 font-custom border rounded-md'>
                                    Sign Up
                                </button>
                                </Link>
                        </div>

                    </form>

                </Card>
            </div>

        </section>
        //         <section className='bg-palette-2 h-100'>
        //             <div className='flex flex-col items-center justify-center px-6 py-8 sm:mx-auto md:h-screen lg:py-0'>
        //                 <a href="https://www.panteon.games" className="flex items-center mb-6  text-gray-900">
        //                     <img className="h-10 mb-3 md:h-12" src="
        //  https://www.panteon.games/wp-content/themes/panteon/assets/img/logo.png" alt="logo" />

        //                 </a>
        //                 <Card className='w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md '>
        //                     <div className='lg:py-10 lg:px-5 text-4'>
        //                         <form action="" className='flex flex-col gap-4'>

        //                                 <Label htmlFor="username" value='Username' className='text-lg md:text-2xl' />
        //                                 <TextInput id='username' type='text' required className=''/>


        //                                 <Label htmlFor="password" value='Password' className='text-lg md:text-2xl' />
        //                                 <TextInput id='password' type='password' required />


        //                                 <Button type='submit' className='mt-3'>
        //                                     Sign in
        //                                 </Button>

        //                             <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        //                                 Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
        //                             </p>
        //                         </form>
        //                     </div>
        //                 </Card>
        //             </div>

        //         </section>

        //         <section className="bg-palette-1 h-screen">
        //         <div className="flex flex-col items-center justify-center px-6 py-8 sm:mx-auto md:h-screen lg:py-0">
        //           <a href="https://www.panteon.games" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        //             <img className="h-14 mr-2" src="
        // https://www.panteon.games/wp-content/themes/panteon/assets/img/logo.png" alt="logo" />

        //           </a>
        //           <Card className="w-full bg-white rounded-lg shadow dark:border  md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        //             <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

        //               <form className="space-y-4 md:space-y-6" action="#">
        //                 <div>
        //                   <Label htmlFor="email" value="Your email" />
        //                   <TextInput
        //                     id="email"
        //                     type="email"
        //                     placeholder="name@company.com"
        //                     required
        //                   />
        //                 </div>
        //                 <div>
        //                   <Label htmlFor="password" value="Password" />
        //                   <TextInput
        //                     id="password"
        //                     type="password"
        //                     placeholder="••••••••"
        //                     required
        //                   />
        //                 </div>
        //                 <div className="flex items-center justify-between">
        //                   <div className="flex items-start">
        //                     <Checkbox id="remember" />
        //                     <Label htmlFor="remember" className="ml-3 text-sm text-gray-500 dark:text-gray-300">
        //                       Remember me
        //                     </Label>
        //                   </div>
        //                   <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
        //                 </div>
        //                 <Button type="submit" className="w-full">
        //                   Sign in
        //                 </Button>
        //                 <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        //                   Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
        //                 </p>
        //               </form>
        //             </div>
        //           </Card>
        //         </div>
        //       </section>
    );

}

export default Login