"use client"

import { useState } from "react"
import { X } from "lucide-react"
import toast from "react-hot-toast"

export default function LeadModal({
  setShowPopup,
  setIsDetailsSubmitted,
  setHasSubmittedPrompt,
  handleSubmit,
  feedId,
  userId,
}: {
  setShowPopup: (value: boolean) => void
  setIsDetailsSubmitted: (value: boolean) => void
  setHasSubmittedPrompt: (value: boolean) => void
  handleSubmit: any
  feedId: string
  userId: string
}) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("") // Track validation errors
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFormSubmit = async (e) => {
    if (!name.trim() || !email.trim()) {
      setError("Please fill in both Name and Email.")
      return
    }

    try {
      setIsSubmitting(true)
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, userId, feedId }),
      })
      setIsDetailsSubmitted(true)
      setShowPopup(false)
      handleSubmit(e)
      setHasSubmittedPrompt(true)
    } catch (error) {
      toast.error("Error saving details:", error)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 animate-in fade-in duration-300">
      <div className="bg-gradient-to-b from-[#1a1730] to-[#151221] p-8 rounded-xl shadow-2xl border border-purple-900/30 w-full max-w-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-violet-500 to-purple-600"></div>

        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="mb-6 text-center">
          <h4 className="text-purple-300/80 text-sm">Enter your details to get started</h4>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-lg">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-purple-200 block">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#211c35] border border-purple-900/50 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-purple-200 block">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#211c35] border border-purple-900/50 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
            />
          </div>

          <button
            onClick={(e) => handleFormSubmit(e)}
            disabled={isSubmitting}
            className="w-full mt-2 bg-gradient-to-r from-purple-700 to-violet-600 hover:from-purple-600 hover:to-violet-500 text-white font-medium py-3 px-4 rounded-lg shadow-lg shadow-purple-900/30 transition-all duration-200 flex items-center justify-center disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Submit"
            )}
          </button>

          <p className="text-center text-xs text-purple-300/60 mt-4">
            By submitting, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}

