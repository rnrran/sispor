import React from 'react';
import Image from 'next/image';
import { LinkProfile } from './LinkProfile';
import Link from 'next/link';
const UserProfile = () => {
  return (
    <div className="container">
      <section className="flex flex-col mt-10 mr-20 flex-shrink-0 relative w-full ">
        <div className="profile-picture flex flex-row gap-7 ">
          <Image
            src="/resources/images/profile.jpg" 
            alt="Profile"
            className="profile-img rounded-full "
            width={200}
            height={200}
          />
          <div className="profile-info">
            <h2 style={{ fontSize: '50px', fontWeight: 'bold' }}>Nanami Kento</h2>
            <p style={{ fontSize: '20px', color: '#666' }}>D1212212212</p>
          </div>
        </div>
        <div className='w-full text-right justify-end items-end'>
           <Link href={"/profile/update"} className="bg-[#00a46e] text-white rounded-md mt-10 px-8 py-2 text-[16px] w-fit">Edit Mode</Link>
        </div>
      </section> 

      <section className="notes-section flex flex-row gap-4 mt-10">
      {LinkProfile.map((item)=>(

<div className="note-card w-full border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center" key={item.id}>
            <div className="note-title">
              <p>{item.title}</p>
            </div>
            <Image
              src={item.img} 
              alt={item.title}
              className="note-img"
              width={250}
              height={250}
              />
          </div>
            ))}
      </section>
    </div>
  );
};

export default UserProfile;
