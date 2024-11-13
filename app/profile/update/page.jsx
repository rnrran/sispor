"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const UpdatePage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordValidator, setValidator] = useState('');
    const [username, setUsername] = useState('');
    const [angkatan, setAngkatan] = useState('');
    const [jurusan, setJurusan] = useState('');
    const [alamat, setAlamat] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    const red = useRouter();

    const handleEmail = (event) => setEmail(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);
    const handleValidator = (e) => setValidator(e.target.value);
    const handleUsername = (e) => setUsername(e.target.value);
    const handleAngkatan = (e) => setAngkatan(e.target.value);
    const handleJurusan = (e) => setJurusan(e.target.value);
    const handleAlamat = (e) => setAlamat(e.target.value);

    const handleImageUpload = (event) => {
        alert('belum ada storage!')
        // const file = event.target.files[0];
        // if (file) {
        //     setProfileImage(URL.createObjectURL(file));
        // }
    };

    const handleUpdate = async (event) => {
        event.preventDefault(); // Mencegah perilaku default form

        if (!email) {
            alert("Email belum diisi");
            return;
        }
        if (!password) {
            alert("Password belum diisi");
            return;
        }
        if (!passwordValidator) {
            alert("Verifikasi password anda!");
            return;
        }
        if (password !== passwordValidator) {
            alert("Kedua password tidak sama!");
            return;
        }

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            await setDoc(doc(db, "users", res.user.uid), {
                username: email.slice(0, email.indexOf("@")),
                angkatan: null,
                jurusan: null,
                bio: null, 
                createdAt: serverTimestamp(),
                lastEditedAt: serverTimestamp(),
                img: null,
                poin: 0,
            });

            alert("Registrasi sukses!");
            red.push('/login');
        } catch (e) {
            alert('Email sudah terdaftar');
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
                                                placeholder="belum belajar fetching"
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
                                                placeholder="belum belajar fetching"
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
                                                placeholder="belum belajar fetching"
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
                                                placeholder="belum belajar fetching"
                                                className="input input-sm input-bordered"
                                            />
                                        </label>
                                    </div>

                                    <div className='flex mt-3'>
                                        <label className="form-control w-1/2 mr-2">
                                            <div className="label">
                                                <span className="label-text">Password</span>
                                            </div>
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={handlePassword}
                                                placeholder="* * * * * * * *"
                                                className="input input-sm input-bordered"
                                            />
                                        </label>
                                        <label className="form-control w-1/2">
                                            <div className="label">
                                                <span className="label-text">Verif Password</span>
                                            </div>
                                            <input
                                                type="password"
                                                value={passwordValidator}
                                                onChange={handleValidator}
                                                placeholder="* * * * * * * *"
                                                className="input input-sm input-bordered"
                                            />
                                        </label>
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