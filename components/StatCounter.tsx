'use client'

import { useEffect, useState } from 'react'

export function StatCounter({ value, duration = 1600 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const start = performance.now()
    let animationFrame = 0

    const step = (currentTime: number) => {
      const progress = Math.min((currentTime - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Number((value * eased).toFixed(1)))

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step)
      }
    }

    animationFrame = window.requestAnimationFrame(step)

    return () => window.cancelAnimationFrame(animationFrame)
  }, [duration, value])

  return <>{displayValue.toFixed(1)}%</>
}
