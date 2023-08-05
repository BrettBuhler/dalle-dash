import React, { createContext, useContext, useState } from 'react'

import UserObject from '../utils/userObject'

interface AppContextProps {
	darkMode: boolean
	toggleDarkMode: () => void
	user: UserObject | null
	setUser: (user: UserObject | null) => void
}

interface AppProviderProps {
    children: React.ReactNode
  }

const AppContext = createContext<AppContextProps | undefined>(undefined)

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	const [darkMode, setDarkMode] = useState(false)
	const [user, setUser] = useState<UserObject | null>(null)

	const toggleDarkMode = () => {
		setDarkMode((prevDarkMode) => !prevDarkMode)
	}

	return (
		<AppContext.Provider value={{ darkMode, toggleDarkMode, user, setUser }}>
			{children}
		</AppContext.Provider>
	)
}

export const useAppContext = () => {
	const context = useContext(AppContext)
	if (!context) {
		throw new Error('useAppContext must be used within an AppProvider')
	}
	return context
}