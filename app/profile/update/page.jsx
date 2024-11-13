"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { setDoc, doc, serverTimestamp, getDoc, getDocs } from 'firebase/firestore';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/app/context/AuthContext';

const UpdatePage = () => {
    const { currentUser } = useContext(AuthContext)

    const [password, setPassword]                   = useState('');
    const [passwordValidator, setValidator]         = useState('');
    const [username, setUsername]                   = useState('');
    const [angkatan, setAngkatan]                   = useState('');
    const [jurusan, setJurusan]                     = useState('');
    const [alamat, setAlamat]                       = useState('');
    const [bio, setBio]                             = useState('');
    const [profileImage, setProfileImage]           = useState(null);
    const [isChangePassword, setIsChangedPassword]  = useState(false);
    const [oldPassword, setOldPassword]             = useState('')


    const handleValidator                   = (e) => setValidator(e.target.value);
    const handleUsername                    = (e) => setUsername(e.target.value);
    const handleAngkatan                    = (e) => setAngkatan(e.target.value);
    const handleJurusan                     = (e) => setJurusan(e.target.value);
    const handleAlamat                      = (e) => setAlamat(e.target.value);
    const handleBio                         = (e) => setBio(e.target.value);
    const handleOldPassword                 = (e) => setOldPassword(e.target.value)
    const handlePassword                    = (event) => {
        setPassword(event.target.value);
        password.length > 6 ? setIsChangedPassword(true) : setIsChangedPassword(false)
    }

    console.log(password+":"+isChangePassword)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (currentUser) {
                    // Ambil dokumen spesifik berdasarkan UID dari currentUser
                    const userDocRef = doc(db, "users", currentUser.uid);
                    const userSnapshot = await getDoc(userDocRef);
                    
                    if (userSnapshot.exists()) {
                        const userData = userSnapshot.data();
                        console.log("User Data:", userData);
    
                        // Set state berdasarkan data yang diambil
                        setUsername(userData.username || '');
                        setAngkatan(userData.angkatan || '');
                        setJurusan(userData.jurusan || '');
                        setAlamat(userData.alamat || '');
                        setBio(userData.bio || '');
                        setProfileImage(userData.profileImage || null);
                    } else {
                        console.log("No such document!");
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
    
        fetchUser();
    }, [currentUser]);


    const handleImageUpload = (event) => {
        alert('belum ada storage!')
        // const file = event.target.files[0];
        // if (file) {
        //     setProfileImage(URL.createObjectURL(file));
        // }
    };


const handleUpdatePassword = async () => {
    const user = auth.currentUser;

    try {
        if (!user) {
            alert('Pengguna tidak ditemukan.');
            return;
        }

        if (password !== passwordValidator) {
            alert("Kedua password tidak sama!");
            return;
        }

        if (!oldPassword) {
            alert("Password lama diperlukan untuk verifikasi.");
            return;
        }

        // Re-authenticate user
        const credential = EmailAuthProvider.credential(user.email, oldPassword);
        await reauthenticateWithCredential(user, credential);

        // Jika re-authenticate berhasil, lakukan update password
        await updatePassword(user, password);
        alert("Password berhasil diperbarui!");

        // Reset input
        setPassword('');
        setValidator('');

    } catch (error) {
        if (error.code === 'auth/wrong-password') {
            alert('Password lama yang Anda masukkan salah.');
        } else if (error.code === 'auth/user-mismatch') {
            alert('Akun pengguna tidak cocok.');
        } else if (error.code === 'auth/requires-recent-login') {
            alert('Sesi Anda sudah lama, silakan login ulang.');
        } else {
            console.error("Error updating password:", error);
            alert('Gagal memperbarui password. Coba lagi nanti.');
        }
    }
};


    const handleUpdate = async (event) => {
        event.preventDefault(); // Mencegah perilaku default form

        if (password) {
            handleUpdatePassword()
        }
        
        
        try {
            await setDoc(doc(db, "users", currentUser.uid), {
                username     : username,
                angkatan     : angkatan,
                jurusan      : jurusan,
                bio          : bio, 
                lastEditedAt : serverTimestamp(),
                // img          : null,
            });

            alert("Update Berhasil !");
        } catch (e) {
            alert(e);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center mx-auto p-8 mt-4 rounded-lg shadow-lg'>
            <div className="card card-compact bg-base-100 w-10/12 shadow-xl">
                <div className="card-body">
                    <div className='flex flex-col items-center'>
                        <h2 className="card-title items-center">Update Profil</h2>
                    </div>
                    <figure>
                        <Image
                            className='object-fill rounded-xl'
                            width='500'
                            height='500'
                            src="/resources/images/buatupdate2.gif"
                            alt="sepatu"
                        />
                    </figure>
                    <div className='card-body'>
                        <p className='text-center mb-5 text-sm'>update disini</p>
                        <form onSubmit={handleUpdate}>
                            {/* Bagian ini sekarang menjadi dua kolom */}
                            <div className='flex flex-row items-center'>
                                {/* Kolom kiri untuk input teks */}
                                <div className='flex flex-col w-8/12 pr-4'>
                                    <div className='flex mt-3'>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text">Username</span>
                                            </div>
                                            <input
                                                type="text"
                                                value={username}
                                                onChange={handleUsername}
                                                placeholder="usernmae masih kosong nih.."
                                                className="input input-sm input-bordered"
                                            />
                                        </label>
                                    </div>

                                    <div className='flex mt-3'>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text">Angkatan</span>
                                            </div>
                                            <input
                                                type="number"
                                                min="2000"
                                                value={angkatan}
                                                onChange={handleAngkatan}
                                                placeholder="angkatan berapa kamu 🤬"
                                                className="input input-sm input-bordered"
                                            />
                                        </label>
                                    </div>

                                    <div className='flex mt-3'>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text">Jurusan</span>
                                            </div>
                                            <input
                                                type="text"
                                                value={jurusan}
                                                onChange={handleJurusan}
                                                placeholder="juransan apa"
                                                className="input input-sm input-bordered"
                                            />
                                        </label>
                                    </div>

                                    <div className='flex mt-3'>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text">Alamat</span>
                                            </div>
                                            <input
                                                type="text"
                                                value={alamat}
                                                onChange={handleAlamat}
                                                placeholder="tinggal dimana ?"
                                                className="input input-sm input-bordered"
                                            />
                                        </label>
                                    </div>

                                    <div className='flex mt-3'>
                                        {/* <label className={"form-control mr-2 " + isChangePassword ? "w-2/6" : "1/2"}> */}
                                        <label className={"form-control mr-2 w-1/2"}>

                                            <div className="label">
                                                <span className="label-text">Password <sup className='text-red-600'>*</sup></span>
                                            </div>
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={handlePassword}
                                                placeholder="rahasia 🤫"
                                                className="input input-sm input-bordered"
                                            />
                                        </label>
                                        <label className={"form-control mr-2 w-1/2"}>
                                        {/* <label className={"form-control mr-2 " + isChangePassword ? "w-2/6" : "1/2"}> */}
                                            <div className="label">
                                                <span className="label-text">Verif Password <sup className='text-red-600'>*</sup></span>
                                            </div>
                                            <input
                                                type="password"
                                                value={passwordValidator}
                                                onChange={handleValidator}
                                                placeholder="verif rahasianya 🤫"
                                                className="input input-sm input-bordered"
                                            />
                                        </label>

                                        {isChangePassword ? <label className="form-control w-2/6">
                                            <div className="label">
                                                <span className="label-text">Password Lama <sup className='text-red-600'>*</sup></span>
                                            </div>
                                            <input
                                                type="password"
                                                value={oldPassword}
                                                onChange={handleOldPassword}
                                                placeholder="verif lagi rahasianya hhh.."
                                                className="input input-sm input-bordered"
                                            />
                                        </label> : null}
                                    </div>
                                </div>

                                {/* Kolom kanan untuk upload gambar */}

                                <div className='flex flex-col items-center w-4/12 '>
                                    <div className="avatar">
                                        <div className="w-50 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img
                                                src={profileImage || '/resources/images/konodioda.jpg'}
                                                alt="Profile"
                                                className="object-cover cursor-pointer"
                                                onClick={() => document.getElementById('fileInput').click()}
                                                
                                            />
                                        </div>
                                    </div>
                                    <input
                                        id="fileInput"
                                        type="file"
                                        style={{ display: 'none' }}
                                        onChange={handleImageUpload}
                                    />
                                    <p className='text-sm mt-3 text-gray-500'>Klik gambar untuk mengupload</p>
                                </div>
                            </div>

                            <div>
                            <textarea
                                onChange={handleBio}
                                className="mt-4 mb-2 p-4 border rounded-md w-[50rem] md:w-[60rem] h-[20rem] md:h-[18rem] md:h-66 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="bio..."
                            />
                            </div>

                            <div className="card-actions flex flex-auto flex-col items-center mt-5">
                                <button className="btn btn-block bg-green-700 text-white hover:bg-green-800">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default UpdatePage;
                           
