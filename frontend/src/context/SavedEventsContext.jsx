import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useAuth } from './AuthContext'
import { getMockSavedEvents } from '../data/attendee'

const SavedEventsContext = createContext(null)

function getStorageKey(userId) {
  return userId ? `festflow-saved-events-${userId}` : 'festflow-saved-events-guest'
}

export function SavedEventsProvider({ children }) {
  const { user } = useAuth()
  const [savedEvents, setSavedEvents] = useState([])

  useEffect(() => {
    const key = getStorageKey(user?._id || user?.id)
    const savedValue = localStorage.getItem(key)

    if (savedValue) {
      try {
        setSavedEvents(JSON.parse(savedValue))
        return
      } catch {
        localStorage.removeItem(key)
      }
    }

    setSavedEvents(user ? getMockSavedEvents() : [])
  }, [user])

  useEffect(() => {
    const key = getStorageKey(user?._id || user?.id)
    localStorage.setItem(key, JSON.stringify(savedEvents))
  }, [savedEvents, user])

  const value = useMemo(
    () => ({
      savedEvents,
      isSaved(eventId) {
        return savedEvents.some((item) => item.event?._id === eventId)
      },
      toggleSavedEvent(event) {
        setSavedEvents((current) => {
          const exists = current.some((item) => item.event?._id === event._id)

          if (exists) {
            return current.filter((item) => item.event?._id !== event._id)
          }

          return [
            {
              _id: `saved-${event._id}`,
              event,
              savedAt: new Date().toISOString(),
            },
            ...current,
          ]
        })
      },
    }),
    [savedEvents],
  )

  return <SavedEventsContext.Provider value={value}>{children}</SavedEventsContext.Provider>
}

export function useSavedEvents() {
  const context = useContext(SavedEventsContext)

  if (!context) {
    throw new Error('useSavedEvents must be used inside SavedEventsProvider')
  }

  return context
}
