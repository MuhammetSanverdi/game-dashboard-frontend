import { Card, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from '../services/AuthService'
import ToastService from '../services/ToastService'

const Register = ({setIsLoading}) => {
    const navigate = useNavigate();

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/;

        setIsLoading(true)

        const registerData = {
            username: e.target.username.value,
            email:e.target.email.value,
            password: e.target.password.value,
            confirmPassword:e.target.confirmPassword.value
        }
        let errors = [];
        console.log(errors.length);
        console.log(registerData);        
        
        
        if(registerData.username.length<4){
            errors.push("Username length don't must be less than 4.")
        }
        if(registerData.password.length<8){
            errors.push("Password length don't must be less than 8.")
        }
        if(registerData.password!==registerData.confirmPassword){
            errors.push("Passwords not matched.")
        }
        if(!passwordRegex.test(registerData.password))
        {
            errors.push("The password must contain at least one uppercase letter, one lowercase letter and one punctuation mark.")
        }

        console.log(errors);
        console.log(errors.length);
        
        if(errors.length===0){
            console.log(errors);
            
            const response = await AuthService.register(registerData);
    
            if(response.status===200 && response.data.accessToken!==null)
            {
                setIsLoading(false)
                ToastService.toastSuccess("You are redirected to the login page. Please wait.");
                setTimeout(()=>{
                    navigate("login")
                },600)
            }
            setIsLoading(false)
        }
        else
        {
        console.log(errors);
        console.log();
            
            setIsLoading(false)
            ToastService.toastWarning(<div> {errors[0]??""}<br/>{errors[1]??""}<br/>{errors[2]??""}<br/>{errors[3]??""}  </div>,"dark");
        }
    }

  return (
    <section className='bg-slate-900 h-100'>
    <div className='flex flex-col items-center justify-center px-6 py-8 md:max-w-sm lg:max-w-lg sm:mx-auto h-screen lg:py-0 lg:px-12 font-body'>
        <a href="https://www.panteon.games" className="flex items-center mb-6  text-gray-900">
            <img className="h-10 mb-3 md:h-12" src="https://www.panteon.games/wp-content/themes/panteon/assets/img/logo.png" alt="logo" />

        </a>
        <Card className='bg-palette-4 border-none sm:px-4 sm:py-8 lg:w-96'>
            <form onSubmit={handleSubmit}>

            <Label className='flex justify-center mt-4 mb-2 text-gray-800 sm:text-lg lg:text-xl font-custom' htmlFor="username" value='Username' />
            <TextInput className='mb-3 ' id='username' type='text' required />

            <Label className='flex justify-center mt-4 mb-2 text-gray-800 sm:text-lg lg:text-xl font-custom' htmlFor="email" value='Email' />
                <TextInput className='mb-3 ' id='email' type='email' required />

                <Label className='flex justify-center mt-4 mb-2 text-gray-800 sm:text-lg lg:text-xl font-custom' htmlFor="password" value='Password' />
                <TextInput className='mb-3' id='password' type='password' required />

                <Label className='flex justify-center mt-4 mb-2 text-gray-800 sm:text-lg lg:text-xl font-custom' htmlFor="confirmPassword" value='Confirm Password' />
                <TextInput className='mb-3' id='confirmPassword' type='password' required />

                <div className='flex justify-center items-center mb-3 font-custom'>
                   
                      <button type='submit1' className='mt-3 px-16 py-3 rounded-md ease-out duration-500 text-gray-100 bg-gray-700 hover:bg-white hover:text-gray-700'>
                        Sign Up
                    </button>
                    
                  
                </div>
                <p className="flex justify-center mx-auto pt-4 pb-1 font-custom text-gray-800">
                    Do you have an account?
                </p>
                <div className='flex justify-center items-center mb-3'>
                <Link to='/login'>
                    <button  className='bg-gray-400 hover:bg-gray-100 hover:text-gray-900 mt-3 px-5 py-2 font-medium  ease-out duration-300 font-custom border rounded-md'>
                        Sign In
                    </button>
                    </Link>
                </div>

            </form>

        </Card>
    </div>

</section>
  )
}

export default Register