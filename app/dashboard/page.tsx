'use client'

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Header from "@/components/page/Header";
import StickyNote from "@/components/StickyNote";
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <h1 className="fade-in mb-12 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
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
            <h2 className="text-xl font-semibold mb-4">Add New Sticky Note</h2>
            <input type="text" placeholder="Title" className="text-black border border-gray-300 mb-2 p-2 w-full" value={newNoteTitle} onChange={(e) => setNewNoteTitle(e.target.value)} />
            <textarea placeholder="Content" className="text-black border border-gray-300 mb-2 p-2 w-full" rows={4} value={newNoteContent} onChange={(e) => setNewNoteContent(e.target.value)}></textarea>
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
            <button onClick={() => setModalOpen(false)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded ml-2">Cancel</button>
          </div>
        </div>
      )}
      <hr className="mt-96 border-t border-gray-800 w-full mb-4 mt-10" />
      <footer className="p-8 flex justify-center text-center text-xs">
        <p className="-mt-9">StickyGrid @2025 </p>
      </footer>
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
