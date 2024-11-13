'use client';

import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase'; // Your Firebase app configuration

const UploadPage = () => {
    const [note, setNote] = useState('');
    const [uploading, setUploading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Get current user from Firebase Authentication
    const auth = getAuth(app);
    const user = auth.currentUser;

    const handleNoteChange = (event) => {
        setNote(event.target.value);
    };

    const handleUpload = async () => {
        if (!note.trim()) return alert("Please enter a note to upload.");

        if (!user) {
            alert('You must be logged in to upload a note.');
            return;
        }

        setUploading(true);

        try {
            // Get Firestore instance
            const db = getFirestore(app);
            const notesCollection = collection(db, 'notes'); // 'notes' is your Firestore collection name

            // Add the note to Firestore with the userId (uid)
            await addDoc(notesCollection, {
                content: note,
                timestamp: new Date(),
                userId: user.uid,  // Store the user's unique ID with the note
            });

            setSuccessMessage('Note uploaded successfully!');
            setNote(''); // Clear the note input field
        } catch (error) {
            console.error('Error uploading note:', error);
            alert('Failed to upload the note.');
        }

        setUploading(false);
    };

    return (
        <div className="flex flex-col justify-center items-center mx-auto p-8 mt-4 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold">Upload Note</h1>
            <p className="text-gray-500 mt-2">Ketik notes anda dibawah:</p>

            <textarea
                value={note}
                onChange={handleNoteChange}
                className="mt-4 mb-2 p-4 border rounded-md w-[50rem] md:w-[60rem] h-[20rem] md:h-[18rem] md:h-66 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your note here..."
            />

            <button
                onClick={handleUpload}
                className={`btn ${uploading ? 'bg-gray-400' : 'bg-blue-500'} text-white hover:bg-blue-700 mt-4`}
                disabled={uploading}
            >
                {uploading ? 'Uploading...' : 'Upload Note'}
            </button>

            {/* Show success message */}
            {successMessage && (
                <div className="mt-4 text-green-500">
                    <p>{successMessage}</p>
                </div>
            )}
        </div>
    );
};

export default UploadPage;