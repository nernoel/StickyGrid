'use client'

import React, { useState, useEffect } from 'react';
import { createClient } from '@/app/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Header from "@/app/components/layout/navbar";
import StickyNote from "@/app/components/features/stickynote";
import { User } from '@supabase/supabase-js';

interface StickyNoteType {
  id: string;
  title: string;
  content: string;
  color: number;
}

const ProtectedPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [stickyNotes, setStickyNotes] = useState<StickyNoteType[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newNoteTitle, setNewNoteTitle] = useState<string>('');
  const [newNoteContent, setNewNoteContent] = useState<string>('');
  const [newNoteColor, setNewNoteColor] = useState<number>(0);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        router.push('/login');
      } else {
        setUser(session.user);
        fetchStickyNotes(session.user.id);
      }
    };

    getSession();
  }, []);

  const fetchStickyNotes = async (userId: string) => {
    console.log(userId)
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching sticky notes:', error);
      } else {
        setStickyNotes(data || []);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const handleAddNote = async () => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .insert([{ title: newNoteTitle, content: newNoteContent, color: newNoteColor, user_id: user!.id }]);

      if (error) {
        console.error('Error adding sticky note:', error);
      } else {
        setModalOpen(false);
        setNewNoteTitle('');
        setNewNoteContent('');
        setNewNoteColor(0);
        fetchStickyNotes(user!.id);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const updateStickyNote = (updatedNote: StickyNoteType) => {
    setStickyNotes(prevNotes => prevNotes.map(note => note.id === updatedNote.id ? updatedNote : note));
  };

  if (!user) {
    return (
  <div role="status">
    <svg aria-hidden="true" className="-mt-24 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
    )
  }

  return (
    <div>
      <Header />
      <h1 className="ml-30 fade-in mb-12 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Welcome to your <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">Sticky Grid!</span>
      </h1>
      <div className=" container mx-auto">
        <div className="sticky top-0 left-0 z-10 mt-4 ml-4">
          <div className="h-12 w-12 -mb-6 bg-blue-800 rounded-full cursor-pointer flex justify-center items-center text-white font-bold text-4xl" onClick={() => setModalOpen(true)}>
            +
          </div>
        </div>
        <div className="p-6 rounded-lg mt-4">
          <div className="grid grid-cols-4 gap-4">
            {stickyNotes.map(note => (
              <StickyNote key={note.id} id={note.id} title={note.title} content={note.content} color={note.color} onUpdate={updateStickyNote} />
            ))}
          </div>
        </div>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-slate-700 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Note To Grid!</h2>
            <input type="text" placeholder="Title" className="text-white border border-gray-300 mb-2 p-2 w-full" value={newNoteTitle} onChange={(e) => setNewNoteTitle(e.target.value)} />
            <textarea placeholder="Content" className="text-white border border-gray-300 mb-2 p-2 w-full" rows={4} value={newNoteContent} onChange={(e) => setNewNoteContent(e.target.value)}></textarea>
            <div className="flex mt-2 mb-2 gap-1">
              {[0, 1, 2, 3].map((color) => (
                <button
                  key={color}
                  className={`h-4 w-4 rounded-full cursor-pointer ${getColorClass(color)}`}
                  onClick={() => setNewNoteColor(color)}
                ></button>
              ))}
            </div>
            <button onClick={handleAddNote} className="bg-blue-500 text-white rounded px-4 py-2">Add Note</button>
            <button onClick={() => setModalOpen(false)} className="hover:bg-gray-600 bg-gray-200 text-gray-800 px-4 py-2 rounded ml-2">Cancel</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProtectedPage;

const getColorClass = (color: number) => {
  switch (color) {
    case 0:
      return 'bg-yellow-500';
    case 1:
      return 'bg-blue-500';
    case 2:
      return 'bg-green-500';
    case 3:
      return 'bg-red-500';
    default:
      return 'bg-gray-900';
  }
};