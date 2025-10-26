"use client"
import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Trash2 } from "lucide-react"
import Image from "next/image"
import icon from "../../public/images/logout-icon.png"

const DeleteDialog = () => {
  const [open, setOpen] = useState(false)

  const handleDelete = () => {
    console.log("Chat deleted ✅")
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-[450px] rounded-2xl p-6 shadow-lg 
          bg-white text-gray-900 
          dark:bg-[#1A1D21] dark:text-gray-100"
        >
          {/* Title */}
          <h2 className="text-lg font-semibold mb-4">Delete chat?</h2>

          {/* Info Box */}
          <div
            className="p-3 mb-4 flex items-center gap-3 rounded-xl text-sm 
            bg-gray-100 text-gray-700 
            dark:bg-[#212B36] dark:text-gray-300"
          >
            <Image src={icon} alt="warning" width={22} height={22} />
            <span>
              This chat will be permanently deleted. Do you still want to
              proceed?
            </span>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded-md border 
              bg-gray-200 text-gray-800 hover:bg-gray-300
              dark:bg-[#161C24] dark:text-gray-200 dark:border-gray-600 dark:hover:bg-[#1f2730]"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dropdown Item */}
      <DropdownMenuItem
        onClick={(e) => {
          e.preventDefault()
          setOpen(true)
        }}
        className="flex items-center gap-2 text-red-600 hover:text-red-700 
        dark:text-red-500 dark:hover:text-red-400"
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </DropdownMenuItem>
    </div>
  )
}

export default DeleteDialog
