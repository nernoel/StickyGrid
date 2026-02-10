"use client"

import React, { useState } from 'react';
import ReactMarkdown from "react-markdown";
import { createClient } from '@/app/lib/supabase/client'; // Assuming you have imported supabase correctly

interface StickyNoteProps {
    id: string;
    title: string;
    content: string;
    color: number;
    onUpdate: (updatedNote: { id: string; title: string; content: string; color: number }) => void;
}

const StickyNote: React.FC<StickyNoteProps> = ({ id, title, content, color, onUpdate }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedContent, setEditedContent] = useState(content);
    const [editedColor, setEditedColor] = useState(color); // Track selected color
    const supabase = createClient();

    const handleDelete: React.MouseEventHandler<HTMLButtonElement> = async () => {
        try {
            setIsDeleting(true);
            const { error } = await supabase
                .from('notes')
                .delete()
                .eq('id', id);
            if (error) {
                throw error;
            }
            setTimeout(() => {
                setIsDeleting(false);
                window.location.reload();
            }, 10);
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const handleEditClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        setIsEditing(true);
    };

    const handleSaveEdit: React.MouseEventHandler<HTMLButtonElement> = async () => {
        try {
            const { error } = await supabase
                .from('notes')
                .update({ title: editedTitle, content: editedContent, color: editedColor })
                .eq('id', id);
            if (error) {
                throw error;
            }
            setIsEditing(false);
            onUpdate({ id, title: editedTitle, content: editedContent, color: editedColor });
        } catch (error) {
            console.error('Error editing note:', error);
        }
    };

    return (
        <div className={`relative flex flex-col mt-6 text-gray-700 shadow-md bg-clip-border rounded-xl max-w-xs p-4 bg-${getColorName(editedColor)}`}>
            <div className="relative">
                <div className="absolute top-2 left-2 flex gap-1">
                    <button onClick={handleDelete} className="h-4 w-4 bg-red-500 rounded-full cursor-pointer flex justify-center items-center text-slate-800 font-bold text-xs">x</button>
                    <button onClick={handleEditClick} className="h-4 w-4 bg-green-500 rounded-full cursor-pointer"></button>
                </div>
            </div>
            <div className="mt-10">
                <h3 className="text-lg text-black-500 font-semibold">{title}</h3>
                <div className="mt-2 text-gray-900 prose prose-invert">
                    <ReactMarkdown>
                        {content}
                    </ReactMarkdown>
                </div>
            </div>
            {isEditing && (
                <div className=" fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-gray-200 p-8 rounded-xl max-w-md">
                        <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} className="block w-full mb-4 border border-black-100 rounded px-2 py-1" />
                        <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} className="block w-full mb-4 border border-black-100 rounded px-2 py-1"></textarea>
                        <div className="flex mt-2 mb-2 gap-1">
                            <button className={`h-4 w-4 rounded-full cursor-pointer flex w-3 h-3 me-3 bg-yellow-200 rounded-full ${editedColor === 0 ? 'bg-yellow-200' : ''}`} onClick={() => setEditedColor(0)}></button>
                            <button className={`h-4 w-4 rounded-full cursor-pointer flex w-3 h-3 me-3 bg-blue-200 rounded-full ${editedColor === 1 ? 'bg-blue-200' : ''}`} onClick={() => setEditedColor(1)}></button>
                            <button className={`h-4 w-4 rounded-full cursor-pointer flex w-3 h-3 me-3 bg-green-200 rounded-full ${editedColor === 2 ? 'bg-green-200' : ''}`} onClick={() => setEditedColor(2)}></button>
                            <button className={`h-4 w-4 rounded-full cursor-pointer flex w-3 h-3 me-3 bg-red-200 rounded-full ${editedColor === 3 ? 'bg-red-200' : ''}`} onClick={() => setEditedColor(3)}></button>
                            <button className={`h-4 w-4 rounded-full cursor-pointer flex w-3 h-3 me-3 bg-gray-200 rounded-full ${editedColor === 4 ? 'bg-gray-200' : ''}`} onClick={() => setEditedColor(4)}></button>
                        </div>
                        <button onClick={handleSaveEdit} className="bg-blue-500 text-white rounded px-4 py-2">Save</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const getColorName = (color: number) => {
    switch (color) {
        case 0:
            return 'yellow-200';
        case 1:
            return 'blue-200';
        case 2:
            return 'green-200';
        case 3:
            return 'red-200';
        default:
            return 'gray-200';
    }
};

export default StickyNote;