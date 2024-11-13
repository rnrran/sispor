"use client";


import Image from 'next/image';
import Link from 'next/link';

import React, { useState } from 'react'

import {auth} from '../firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { redirect, useRouter } from 'next/navigation';


// import Image from 'next/image'
const RegisPage = () => {
    // console.log(auth)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordValidator, setValidator] = useState('');

    const red = useRouter()

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleValidator = (e) => {
        setValidator(e.target.value)
    }
    

    const handleRegis = async (event) => {
        event.preventDefault(); // Mencegah perilaku default form

        // alert(email + password + passwordValidator)
        if (!email) {
            alert("Email belum diisi");
            return;
        }
        if (!password) {
            alert("Password belum diisi");
            return;
        }

        if (!passwordValidator) {
            alert("Verifikasi password anda !");
            return;
        }

        if (password != passwordValidator){
            alert("Kedua password tidak sama !")
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password)
            alert("Registrasi sukses !");
            red.push('/login')

        } catch(e){
            alert('email sudah terdaftar')
        }
    }
    return (
        <>
            <div className='flex flex-col justify-center items-center mx-auto p-8 mt-4 rounder-lg shadow-lg'>
                <div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <div className="card-body">
                        <div className='flex flex-col items-center'>
                            <h2 className="card-title items-center">Daftar</h2>
                        </div>
                        <figure>
                            <Image
                                
                                width='500'
                                height='500'    
                                src="/resources/images/buatregis.gif"
                                alt="sepatu" 
                            />
                        </figure>
                        <div className='card-body'>
                            <p className='text-center mb-5 text-sm'>
                               daftar aja
                            </p>
                            <form onSubmit={handleRegis}>
                                <label className="input input-bordered flex items-center gap-2 mb-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70">
                                        <path
                                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                        <path
                                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                    </svg>
                                    <input type="email" className="grow" placeholder="email" onChange={handleEmail}/>
                                </label>

                                <label className="input input-bordered flex items-center gap-2 mb-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70">
                                        <path
                                        fillRule="evenodd"
                                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                        clipRule="evenodd" />
                                    </svg>
                                    <input type="password" className="grow" placeholder='password' onChange={handlePassword}/>
                                </label>

                                <label className="input input-bordered flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70">
                                        <path
                                        fillRule="evenodd"
                                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                        clipRule="evenodd" />
                                    </svg>
                                    <input type="password" className="grow" placeholder='verif password' onChange={handleValidator}/>
                                </label>
                                <div className="card-actions flex flex-auto flex-col items-center mt-5">
                                    <button className="btn btn-block bg-green-700 text-white hover:bg-green-800">Daftar</button>
                                    <p className='text-gray-600 text-sm'>
                                        ada akun ? <Link href={'/login'} className='text-blue-300 hover:text-blue-500 underline'>
                                                        login
                                                    </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                        
                    </div>
                </div>

            </div>
        </>
    )
}

export default RegisPage;

