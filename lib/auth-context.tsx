'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface User {
  id: string
  username: string
  email: string
  minecraftUsername?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (email: string, password: string, username: string, minecraftUsername?: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('killermc_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem('killermc_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    try {
      // Simulate login - in production, this would be an API call
      const users = JSON.parse(localStorage.getItem('killermc_users') || '[]')
      const foundUser = users.find((u: User & { password: string }) => u.email === email && u.password === password)
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        localStorage.setItem('killermc_user', JSON.stringify(userWithoutPassword))
        return { success: true }
      }
      return { success: false, error: 'Invalid email or password' }
    } catch {
      return { success: false, error: 'An error occurred during login' }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (
    email: string,
    password: string,
    username: string,
    minecraftUsername?: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    try {
      const users = JSON.parse(localStorage.getItem('killermc_users') || '[]')
      
      // Check if user already exists
      if (users.some((u: User) => u.email === email)) {
        return { success: false, error: 'Email already registered' }
      }
      
      if (users.some((u: User) => u.username === username)) {
        return { success: false, error: 'Username already taken' }
      }

      const newUser = {
        id: crypto.randomUUID(),
        email,
        password,
        username,
        minecraftUsername: minecraftUsername || username,
      }

      users.push(newUser)
      localStorage.setItem('killermc_users', JSON.stringify(users))

      const { password: _, ...userWithoutPassword } = newUser
      setUser(userWithoutPassword)
      localStorage.setItem('killermc_user', JSON.stringify(userWithoutPassword))

      return { success: true }
    } catch {
      return { success: false, error: 'An error occurred during registration' }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('killermc_user')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
