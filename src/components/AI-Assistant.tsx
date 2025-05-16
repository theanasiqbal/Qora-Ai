"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X, Send, Bot, Sparkles } from "lucide-react"

type Message = {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

const AIAssistant = () => {
  const [open, setOpen] = useState(false)
  const [userMessage, setUserMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Detect system theme preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(isDark ? "dark" : "light")

      // Listen for theme changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      const handleChange = (e: MediaQueryListEvent) => {
        setTheme(e.matches ? "dark" : "light")
      }
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [open])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSendMessage = () => {
    if (!userMessage.trim()) return

    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: userMessage,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newUserMessage])
    setUserMessage("")

    // Simulate AI typing
    setIsTyping(true)
    setTimeout(() => {
      // Add AI response
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `I'm your AI assistant. I'm here to help with any questions about leads or feeds.`,
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      {/* AI Assistant Button */}
      <button
        className="fixed bottom-5 right-5 z-10 flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group dark:bg-gradient-to-br dark:from-indigo-600 dark:to-purple-700 bg-gradient-to-br from-blue-400 to-indigo-500"
        onClick={handleOpen}
        aria-label="Open AI Assistant"
      >
        <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 animate-ping bg-white dark:bg-indigo-400"></span>
        <Bot className="text-white" size={24} />
      </button>

      {/* Chat Modal */}
      <div
        className={`fixed inset-0 z-50 flex justify-end items-end p-4 md:p-6 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`w-full max-w-md h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-transform duration-500 dark:bg-gray-900 bg-white dark:text-gray-100 text-gray-800 ${
            open ? "translate-y-0" : "translate-y-full"
          }`}
          style={{
            boxShadow:
              theme === "dark"
                ? "0 0 20px rgba(128, 0, 128, 0.3), 0 0 40px rgba(128, 0, 128, 0.1)"
                : "0 10px 25px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Header */}
          <div className="relative p-4 flex items-center justify-between border-b dark:border-gray-700 border-gray-200">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Sparkles className="text-indigo-500 dark:text-indigo-400" size={24} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              </div>
              <h2 className="text-xl font-semibold">AI Assistant</h2>
            </div>
            <div className="flex items-center gap-3">
              
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close AI Assistant"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b dark:from-gray-900 dark:to-gray-950 from-gray-50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-tr-none"
                      : "bg-gradient-to-r dark:from-gray-800 dark:to-gray-700 from-gray-100 to-gray-200 dark:text-gray-100 text-gray-800 rounded-tl-none"
                  }`}
                >
                  <p>{message.content}</p>
                  <div
                    className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-fadeIn">
                <div className="max-w-[80%] p-3 rounded-2xl bg-gradient-to-r dark:from-gray-800 dark:to-gray-700 from-gray-100 to-gray-200 dark:text-gray-100 text-gray-800 rounded-tl-none">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t dark:border-gray-700 border-gray-200 bg-white dark:bg-gray-900">
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask about sales..."
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full p-3 pr-12 rounded-full border dark:border-gray-600 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 bg-gray-50 dark:text-white transition-all duration-200"
              />
              <button
                disabled={!userMessage.trim()}
                onClick={handleSendMessage}
                className={`absolute right-2 p-2 rounded-full transition-all duration-300 ${
                  userMessage.trim()
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:scale-105"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                }`}
                aria-label="Send message"
              >
                <Send size={18} className={userMessage.trim() ? "animate-pulse" : ""} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIAssistant
