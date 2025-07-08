'use client'
import photo from '../public/login.jpg'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image';
import { Github } from 'lucide-react';
import { LogOut, User, Shield, Settings, FilmIcon } from 'lucide-react';

function Login() {
  const { data: session } = useSession();

  if (session) {
    // return (
    //   <div className='min-h-screen flex justify-center items-center'>
    //     <div className='flex flex-col h-fit justify-center items-center border-3 border-amber-300 w-fit py-19 px-24 gap-3 rounded-2xl'>
    //       <div><span className='text-3xl text-black/70 pr-2'>Hello,</span><span className='capitalize'>{session.user?.name}! </span></div>
    //       <img className='rounded-full' alt="asdk" src={session.user?.image} width={100} height={75} ></img>
    //       {console.log(session.user)}
    //       <button onClick={() => signOut()} className='bg-green-600 h-2xl cursor-pointer rounded-lg text-lg font-semibold py-3 px-7 m-2 hover:font-medium'>Sign out</button>
    //     </div>
    //   </div>
    // )
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex justify-center items-center p-4">
        <div className="relative bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 w-full max-w-md transform transition-all duration-300 hover:scale-105 hover:shadow-3xl border border-white/20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-400/10 to-blue-400/10 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="relative z-10 flex flex-col items-center text-center space-y-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1 shadow-lg">
                <img
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                  alt="Profile"
                  src={session.user?.image}
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome back,
              </h1>
              <h2 className="text-xl font-semibold text-blue-600 capitalize">
                {session.user?.name}!
              </h2>
              <p className="text-sm text-gray-500">
                {session.user?.email}
              </p>
            </div>

            <div className="flex space-x-4 text-center">
              <div className="bg-blue-50 rounded-xl p-3 flex-1">
                <div className="text-lg font-bold text-blue-600">24</div>
                <div className="text-xs text-gray-600">Projects</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-3 flex-1">
                <div className="text-lg font-bold text-purple-600">12</div>
                <div className="text-xs text-gray-600">Teams</div>
              </div>
              <div className="bg-green-50 rounded-xl p-3 flex-1">
                <div className="text-lg font-bold text-green-600">98%</div>
                <div className="text-xs text-gray-600">Uptime</div>
              </div>
            </div>

            <div className="flex space-x-3 w-full">
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center flex-row space-x-2 hover:scale-105 active:scale-95">
                <Link href={`/movies`} className='flex gap-2 items-center'>
                  <FilmIcon size={18} />
                  <span>Movies</span>
                </Link>
              </button>
              <button className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-105 active:scale-95">
                <User size={18} />
                <span>Profile</span>
              </button>
            </div>

            <button
              onClick={() => signOut()}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 group"
            >
              <LogOut size={18} className="group-hover:rotate-12 transition-transform duration-200" />
              <span>Sign Out</span>
            </button>

            <div className="flex items-center space-x-2 text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-full">
              <Shield size={14} className="text-green-500" />
              <span>Secure Session</span>
            </div>
          </div>
        </div>
      </div>
    );


  }
  return (
    <div>
      {/* <button onClick={() => signIn('google')} className='bg-amber-200 px-1 py-2 m-2 cursor-pointer rounded hover:bg-amber-400'>Sign In with Google</button>
            <button onClick={() => signIn('github')} className='bg-amber-200 px-1 py-2 m-2 cursor-pointer rounded hover:bg-amber-400'>Sign In with Github</button>
            <Github className="border-2 border-amber-400 rounded w-10 h-10 p-1 cursor-pointer" onClick={() => signIn('github')} /> */}
      <FormLogin />
    </div>
  )
}


import React from "react";
import Link from 'next/link';
const FormLogin = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
      <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
        <div
          className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
          style={{
            backgroundImage: `url(${photo.src})`,
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="email"
              required
            />
          </div>
          <div className="mt-4 flex flex-col justify-between">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
            </div>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="password"
            />
            <a
              href="#"
              className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
            >
              Forget Password?
            </a>
          </div>
          <div className="mt-8">
            <button className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
              Login
            </button>
          </div>
          <button
            className=" flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100 w-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex px-5 justify-center w-full py-3 cursor-pointer" type='button' onClick={() => signIn('google')}>
              <div className="min-w-[30px]">
                <svg className="h-6 w-6" viewBox="0 0 40 40">
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#1976D2"
                  />
                </svg>
              </div>
              <div className="flex w-full justify-center">
                <h1 className="whitespace-nowrap text-gray-600 font-bold" >
                  Sign in with Google
                </h1>
              </div>
            </div>
          </button>
          <div className="mt-4 flex items-center w-full text-center">
            <a
              href="#"
              className="text-xs text-gray-500 capitalize text-center w-full"
            >
              Don&apos;t have any account yet?
              <span className="text-blue-700"> Sign Up</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login
