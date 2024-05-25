'use client'

import { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from '@supabase/supabase-js';


export default function AuthButton() {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Get user error:", error);
      }
    };
    getUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return user ? (
    <div className="flex items-center gap-4">
      {user.email}
      <button
        className="flex rounded-md no-underline py-2 px-3 bg-gray-800 bg-btn-background hover:bg-gray-900"
        onClick={handleSignOut}
      >
        Logout
      </button>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-gray-800 bg-btn-background hover:bg-gray-900"
    >
      Login
    </Link>
  );
}
