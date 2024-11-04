"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { GoHomeFill } from "react-icons/go"
import { FaRegObjectGroup } from "react-icons/fa6"
import { RiChat1Line } from "react-icons/ri"
import { BiSolidWidget } from "react-icons/bi"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

const menuItems = [
  { href: "/", icon: GoHomeFill, label: "Home" },
  { href: "/classification", icon: FaRegObjectGroup, label: "Classification" },
  { href: "/chat", icon: RiChat1Line, label: "Chat" },
  { href: "/dashboard", icon: BiSolidWidget, label: "Dashboard" },
]

export default function FloatingMenu() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])


  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light")
  

  return (
    <div className="flex justify-center w-full">
      <motion.div
        className="fixed z-20 bottom-5"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.div
          className="flex items-center gap-3 bg-background/80 backdrop-blur-md px-5 py-2 rounded-full shadow-lg border border-border"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} passHref>
              <motion.div
                className={`p-2 rounded-full transition-colors ${
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={item.label}
              >
                <item.icon className="w-5 h-5" />
              </motion.div>
            </Link>
          ))}
          {mounted && (
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}