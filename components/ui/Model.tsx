'use client'
import React from "react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center  justify-center z-50">
      <div className="bg-white py-4 px-5 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-xl font-semibold">Confirm Deletion</h2>
        <p className="text-gray-600 my-3">Are you sure you want to delete this?</p>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2  hover:bg-red-600 transition rounded-2xl"
          >
            Yes, Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
