"use client"
import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Edit3 } from "lucide-react"

const RenameDialog = () => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-[400px] rounded-2xl p-6 shadow-lg 
          bg-white text-gray-900 
          dark:bg-[#1A1D21] dark:text-gray-100"
        >
          <h2 className="text-lg font-semibold mb-4">Rename this chat</h2>

          {/* Input Field */}
          <div className="mb-4">
            <label
              htmlFor="chatName"
              className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
            >
              Name:
            </label>
            <input
              id="chatName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter chat name"
              className="w-full border rounded-md px-3 py-2 
              bg-gray-50 text-gray-800 
              dark:bg-[#161C24] dark:text-gray-200 dark:border-gray-700"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={() => {
              console.log("Saved Name:", name)
              setOpen(false)
            }}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Save
          </button>
        </DialogContent>
      </Dialog>

      {/* Dropdown Item */}
      <DropdownMenuItem
        onClick={(e) => {
          e.preventDefault()
          setOpen(true)
        }}
        className="flex items-center gap-2 text-green-600 hover:text-green-700 
        dark:text-green-400 dark:hover:text-green-500"
      >
        <Edit3 className="mr-2 h-4 w-4" />
        Rename
      </DropdownMenuItem>
    </div>
  )
}

export default RenameDialog
