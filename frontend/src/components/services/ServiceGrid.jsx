import { useState, useRef, useEffect, useCallback } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Mouse } from 'lucide-react'
import * as Icons from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../common/Button'
import { useLanguage } from '../../hooks/useLanguage'

// 12 distinct scroll-driven motion graphics entrance effects
const SERVICE_MOTION_VARIANTS = [
  // 1. Web Development: Slide from Left
  {
    initial: { opacity: 0, x: -140, y: 0, scale: 0.94 },
    animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    exit: { opacity: 0, x: 90, scale: 0.96 },
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
  // 2. Mobile App Development: Slide from Right
  {
    initial: { opacity: 0, x: 140, y: 0, scale: 0.94 },
    animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    exit: { opacity: 0, x: -90, scale: 0.96 },
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
  // 3. Custom Software: Slide Up (from below)
  {
    initial: { opacity: 0, y: 130, scale: 0.93 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -80, scale: 0.96 },
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
  // 4. AI Solutions: Slide Down (from above)
  {
    initial: { opacity: 0, y: -130, scale: 0.93 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 80, scale: 0.96 },
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
  // 5. AI Automation: Zigzag Bottom-Left (diagonal up-right)
  {
    initial: { opacity: 0, x: -120, y: 80, rotate: -4, scale: 0.92 },
    animate: { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 },
    exit: { opacity: 0, x: 80, y: -60, rotate: 2, scale: 0.96 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
  // 6. Cloud Solutions: Zigzag Bottom-Right (diagonal up-left)
  {
    initial: { opacity: 0, x: 120, y: 80, rotate: 4, scale: 0.92 },
    animate: { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 },
    exit: { opacity: 0, x: -80, y: -60, rotate: -2, scale: 0.96 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
  // 7. API Development: Circle / Spiral Sweep In
  {
    initial: { opacity: 0, scale: 0.72, rotate: -22, x: -40, y: 35 },
    animate: { opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 },
    exit: { opacity: 0, scale: 0.85, rotate: 12 },
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
  },
  // 8. E-Commerce Development: 3D Perspective Flip
  {
    initial: { opacity: 0, rotateX: 35, y: 70, scale: 0.92 },
    animate: { opacity: 1, rotateX: 0, y: 0, scale: 1 },
    exit: { opacity: 0, rotateX: -25, y: -50, scale: 0.96 },
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
  },
  // 9. SaaS Development: Center Zoom & Radiant Expand
  {
    initial: { opacity: 0, scale: 0.65 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.15 },
    transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] },
  },
  // 10. UI/UX Design: Zigzag Top-Left Drop-In
  {
    initial: { opacity: 0, x: -110, y: -70, rotate: 3, scale: 0.93 },
    animate: { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 },
    exit: { opacity: 0, x: 70, y: 60, rotate: -2, scale: 0.96 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
  // 11. Software Maintenance: Zigzag Top-Right Drop-In
  {
    initial: { opacity: 0, x: 110, y: -70, rotate: -3, scale: 0.93 },
    animate: { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 },
    exit: { opacity: 0, x: -70, y: 60, rotate: 2, scale: 0.96 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
  // 12. Digital Transformation: Circular Swirl Finale
  {
    initial: { opacity: 0, scale: 0.75, rotate: 25, y: 45 },
    animate: { opacity: 1, scale: 1, rotate: 0, y: 0 },
    exit: { opacity: 0, scale: 0.8, rotate: -15, y: -35 },
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
]

export function ServiceGrid({ services, type = 'software' }) {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const activeIndexRef = useRef(0)
  const trackRef = useRef(null)
  const stageRef = useRef(null)
  const isTransitioningRef = useRef(false)
  const touchStartRef = useRef({ x: 0, y: 0 })

  const totalServices = services?.length || 0

  // Keep ref in sync
  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  // Direct card jump with scroll synchronisation
  const goToCard = useCallback((targetIndex) => {
    if (targetIndex < 0 || targetIndex >= totalServices) return
    setActiveIndex(targetIndex)
    activeIndexRef.current = targetIndex

    if (trackRef.current) {
      const trackRect = trackRef.current.getBoundingClientRect()
      const trackTopInDoc = trackRect.top + window.scrollY
      const maxScroll = trackRef.current.offsetHeight - window.innerHeight
      if (maxScroll > 0) {
        const targetScroll = trackTopInDoc + (targetIndex / (totalServices - 1)) * maxScroll
        window.scrollTo({ top: targetScroll, behavior: 'instant' })
      }
    }
  }, [totalServices])

  // Scroll listener: sync activeIndex if user drags native scrollbar or scrolls document
  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current || isTransitioningRef.current || totalServices <= 1) return
      const trackRect = trackRef.current.getBoundingClientRect()
      const trackHeight = trackRef.current.offsetHeight - window.innerHeight
      if (trackHeight <= 0) return

      const scrolled = -trackRect.top
      if (scrolled <= 0) {
        if (activeIndexRef.current !== 0) {
          setActiveIndex(0)
          activeIndexRef.current = 0
        }
      } else if (scrolled >= trackHeight) {
        if (activeIndexRef.current !== totalServices - 1) {
          setActiveIndex(totalServices - 1)
          activeIndexRef.current = totalServices - 1
        }
      } else {
        const progress = Math.max(0, Math.min(1, scrolled / trackHeight))
        const computedIndex = Math.min(
          totalServices - 1,
          Math.max(0, Math.floor(progress * totalServices))
        )
        if (computedIndex !== activeIndexRef.current) {
          setActiveIndex(computedIndex)
          activeIndexRef.current = computedIndex
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [totalServices])

  // Wheel listener: when stage is pinned, advance card discretely
  useEffect(() => {
    const onWheel = (e) => {
      if (!trackRef.current || totalServices <= 1) return
      const trackRect = trackRef.current.getBoundingClientRect()
      
      // Pinned condition: top has reached sticky offset and bottom is still below viewport
      const isPinned = trackRect.top <= 85 && trackRect.bottom >= window.innerHeight
      if (!isPinned) return

      // Delta down
      if (e.deltaY > 15) {
        if (activeIndexRef.current < totalServices - 1) {
          e.preventDefault()
          if (!isTransitioningRef.current) {
            isTransitioningRef.current = true
            goToCard(activeIndexRef.current + 1)
            setTimeout(() => {
              isTransitioningRef.current = false
            }, 460)
          }
        }
        // At the last card (index === totalServices - 1), no preventDefault, naturally scrolls to footer
      } else if (e.deltaY < -15) {
        if (activeIndexRef.current > 0) {
          e.preventDefault()
          if (!isTransitioningRef.current) {
            isTransitioningRef.current = true
            goToCard(activeIndexRef.current - 1)
            setTimeout(() => {
              isTransitioningRef.current = false
            }, 460)
          }
        }
        // At the first card (index === 0), no preventDefault, naturally scrolls back to hero
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [totalServices, goToCard])

  // Keyboard navigation when showcase is pinned
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!trackRef.current || totalServices <= 1) return
      const trackRect = trackRef.current.getBoundingClientRect()
      const isPinned = trackRect.top <= 85 && trackRect.bottom >= window.innerHeight
      if (!isPinned) return

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (activeIndexRef.current < totalServices - 1) {
          e.preventDefault()
          goToCard(activeIndexRef.current + 1)
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (activeIndexRef.current > 0) {
          e.preventDefault()
          goToCard(activeIndexRef.current - 1)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [totalServices, goToCard])

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }
  }

  const handleTouchEnd = (e) => {
    if (isTransitioningRef.current || totalServices <= 1) return
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y

    if (Math.abs(deltaX) > 40 || Math.abs(deltaY) > 40) {
      if (deltaX < -40 || deltaY < -40) {
        if (activeIndexRef.current < totalServices - 1) {
          isTransitioningRef.current = true
          goToCard(activeIndexRef.current + 1)
          setTimeout(() => {
            isTransitioningRef.current = false
          }, 450)
        }
      } else if (deltaX > 40 || deltaY > 40) {
        if (activeIndexRef.current > 0) {
          isTransitioningRef.current = true
          goToCard(activeIndexRef.current - 1)
          setTimeout(() => {
            isTransitioningRef.current = false
          }, 450)
        }
      }
    }
  }

  if (!services || services.length === 0) return null

  const activeService = services[activeIndex] || services[0]
  const title = activeService.title || activeService
  const icon = activeService.icon || (type === 'electrical' ? 'Zap' : 'Cpu')
  const category = activeService.category || type
  const categoryLabel = type === 'electrical' ? t.common.nav.electrical : t.common.nav.software
  const IconComponent = Icons[icon] || Icons.Cpu
  const description = t.services.descriptions?.[title] || t.services.cardDescription
  const variant = SERVICE_MOTION_VARIANTS[activeIndex % SERVICE_MOTION_VARIANTS.length]

  return (
    <div
      ref={trackRef}
      className="service-showcase-track"
      style={{ height: `${totalServices * 48}vh` }}
    >
      <div
        ref={stageRef}
        className="service-showcase-stage"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Showcase Header Controls */}
        <div className="service-showcase-header">
          <div className="service-showcase-counter">
            <span className="service-counter-badge">
              {String(activeIndex + 1).padStart(2, '0')} / {String(totalServices).padStart(2, '0')}
            </span>
            <span className="service-current-title">
              {t.services.items[title] || title}
            </span>
          </div>

          {/* Direct Jump Pagination Dots */}
          <div className="service-showcase-dots">
            {services.map((svc, idx) => {
              const dotTitle = svc.title || svc
              return (
                <button
                  key={`dot-${idx}-${dotTitle}`}
                  className={`service-showcase-dot ${idx === activeIndex ? 'active' : ''}`}
                  onClick={() => goToCard(idx)}
                  title={`${idx + 1}. ${t.services.items[dotTitle] || dotTitle}`}
                  aria-label={`Go to service ${idx + 1}: ${t.services.items[dotTitle] || dotTitle}`}
                />
              )
            })}
          </div>

          {/* Prev / Next Buttons */}
          <div className="service-showcase-controls">
            <button
              className="service-showcase-btn"
              onClick={() => goToCard(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous service"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="service-showcase-btn"
              onClick={() => goToCard(activeIndex + 1)}
              disabled={activeIndex === totalServices - 1}
              aria-label="Next service"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="service-showcase-progress-bar">
          <div
            className="service-showcase-progress-fill"
            style={{ width: `${((activeIndex + 1) / totalServices) * 100}%` }}
          />
        </div>

        {/* Center Stage: Exactly ONE card rendered with distinct entrance motion graphics */}
        <div className="service-showcase-card-stage">
          <AnimatePresence mode="wait">
            <motion.article
              key={`${category}-${title}`}
              className={`service-card ${activeService.videoUrl ? 'service-card-with-video' : ''} service-showcase-card`}
              initial={variant.initial}
              animate={variant.animate}
              exit={variant.exit}
              transition={variant.transition}
            >
              {activeService.videoUrl ? (
                <div className="service-card-container">
                  <div className="service-card-content">
                    <div className="service-card-meta">
                      <div className="service-card-icon-wrap">
                        <IconComponent />
                      </div>
                      <span>{categoryLabel}</span>
                      <h3>{t.services.items[title] || title}</h3>
                      <p>{description}</p>
                    </div>
                    <div className="card-actions">
                      <Button to="/contact" variant="secondary">
                        {t.services.learnMore}
                      </Button>
                      <Button to="/service-request" variant="ghost">
                        {t.services.requestService} <ArrowRight size={16} />
                      </Button>
                    </div>
                  </div>
                  <div className="service-card-video">
                    <video
                      key={activeService.videoUrl}
                      src={activeService.videoUrl}
                      controls
                      playsInline
                      preload="metadata"
                      width="100%"
                      height="100%"
                    />
                  </div>
                </div>
              ) : (
                <div className="service-card-content-single">
                  <div className="service-card-icon-wrap">
                    <IconComponent />
                  </div>
                  <span>{categoryLabel}</span>
                  <h3>{t.services.items[title] || title}</h3>
                  <p>{description}</p>
                  <div className="card-actions">
                    <Button to="/contact" variant="secondary">
                      {t.services.learnMore}
                    </Button>
                    <Button to="/service-request" variant="ghost">
                      {t.services.requestService} <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              )}
            </motion.article>
          </AnimatePresence>
        </div>

        {/* Scroll Helper Hint */}
        <div className="service-showcase-hint">
          <Mouse size={14} className="hint-icon" />
          <span>{t.services.scrollHint || 'Scroll or use arrows to discover each service'}</span>
        </div>
      </div>
    </div>
  )
}
