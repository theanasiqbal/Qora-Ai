"use client";

import React, { useState } from "react";
import { UserRoundPlus, X } from "lucide-react";
import {clerkClient} from "@clerk/clerk-sdk-node";
import { useUser } from "@clerk/nextjs";

const AddUserModal = () => {
    const { user } = useUser()
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setName("");
    setEmail("");
  };

  const handleAddUser = async () => {
    if (!email || !name) {
      console.error("Name and Email are required");
      return;
    }
  
    try {
      const res = await fetch("/api/add-users", {
        method: "POST",
        body: JSON.stringify({ email, name }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!res.ok) {
        console.error("Failed to add user");
        return;
      }
  
      closeModal();
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        className="rounded-full flex items-center justify-center p-2 hover:bg-purple-600/30"
        onClick={openModal}
      >
        <UserRoundPlus className="" size={20} />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-gradient-to-b from-[#1a1730] to-[#151221] border-purple-900/30 rounded-xl shadow-2xl w-[90%] max-w-md p-6 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-violet-500 to-purple-600"></div>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg text-purple-300/80 font-semibold mb-4">
              Add User
            </h2>

            {/* Name Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-purple-200 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-[#211c35] border border-purple-900/50 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-purple-200 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-[#211c35] border border-purple-900/50 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <button
                className="bg-gradient-to-r from-purple-700 to-violet-600 hover:from-purple-600 hover:to-violet-500 text-white font-medium py-3 px-4 rounded-lg shadow-lg shadow-purple-900/30 transition-all duration-200 flex items-center justify-center disabled:opacity-70"
                onClick={handleAddUser}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUserModal;
