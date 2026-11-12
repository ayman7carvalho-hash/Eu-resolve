import { useState, useEffect } from 'react'

let listeners = []
let toasts = []
let count = 0

function emit() {
  listeners.forEach((l) => l(toasts))
}

export function toast({ title, description, variant, duration = 4000 }) {
  const id = ++count
  toasts = [...toasts, { id, title, description, variant }]
  emit()
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id)
    emit()
  }, duration)
  return id
}

export function useToast() {
  const [state, setState] = useState(toasts)
  useEffect(() => {
    listeners.push(setState)
    return () => {
      listeners = listeners.filter((l) => l !== setState)
    }
  }, [])
  return { toasts: state, toast }
}
