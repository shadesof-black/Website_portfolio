'use client'

import React, { Suspense, lazy, useRef, useEffect } from 'react'

class SplineErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Spline 3D render error caught:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-zinc-950/20 backdrop-blur-md rounded-2xl border border-zinc-800/40">
          <div className="text-center p-6">
            <p className="text-xs text-zinc-500 font-medium">3D Scene Offline</p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const hideWatermark = () => {
      const traverse = (root: DocumentFragment | HTMLElement | ShadowRoot) => {
        if (!root) return

        // 1. Hide matching anchors
        const anchors = root.querySelectorAll('a')
        anchors.forEach((a) => {
          if (
            a.href.includes('spline') || 
            a.innerText.toLowerCase().includes('spline') || 
            a.outerHTML.includes('spline')
          ) {
            a.style.setProperty('display', 'none', 'important')
            a.style.setProperty('opacity', '0', 'important')
            a.style.setProperty('pointer-events', 'none', 'important')
          }
        })

        // 2. Hide absolute positioned bottom-right containers containing spline
        const divs = root.querySelectorAll('div, span, button, a')
        divs.forEach((el) => {
          const htmlEl = el as HTMLElement
          try {
            const style = window.getComputedStyle(htmlEl)
            if (
              style.position === 'absolute' && 
              (style.bottom !== '' && style.bottom !== 'auto') &&
              (style.right !== '' && style.right !== 'auto')
            ) {
              if (
                htmlEl.innerText.toLowerCase().includes('spline') || 
                htmlEl.innerHTML.includes('spline') || 
                htmlEl.outerHTML.includes('spline')
              ) {
                htmlEl.style.setProperty('display', 'none', 'important')
                htmlEl.style.setProperty('opacity', '0', 'important')
                htmlEl.style.setProperty('pointer-events', 'none', 'important')
              }
            }
          } catch (e) {
            // ignore styling errors
          }
        })

        // 3. Recurse into open shadow DOM roots
        const allElements = root.querySelectorAll('*')
        allElements.forEach((el) => {
          if (el.shadowRoot) {
            traverse(el.shadowRoot)
          }
        })
      }

      traverse(container)
    }

    hideWatermark()

    const observer = new MutationObserver(hideWatermark)
    observer.observe(container, {
      childList: true,
      subtree: true,
    })

    // Disconnect the observer after 8 seconds as initial rendering is completed.
    // This stops computed style checks during active animation/pointer-tracking frames.
    const disconnectTimer = setTimeout(() => {
      observer.disconnect()
    }, 8000)

    return () => {
      observer.disconnect()
      clearTimeout(disconnectTimer)
    }
  }, [])

  return (
    <SplineErrorBoundary>
      <Suspense 
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <span className="loader"></span>
          </div>
        }
      >
        <div ref={containerRef} className="relative w-full h-full">
          <Spline
            scene={scene}
            className={className}
          />
        </div>
      </Suspense>
    </SplineErrorBoundary>
  )
}
