import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Login } from './Login'
import { Register } from './Register'

import './AuthPage.css'

export function AuthPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(location.pathname === '/login')

  useEffect(() => {
    setIsLogin(location.pathname === '/login')
  }, [location.pathname])

  const handleSwitchPage = (toLogin) => {
    navigate(toLogin ? '/login' : '/register')
  }

  const pageVariants = {
    initial: (direction) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      rotateY: direction > 0 ? -90 : 90,
      opacity: 0,
    }),
  }

  const transition = {
    duration: 0.6,
    ease: [0.43, 0.13, 0.23, 0.96],
  }

  return (
    <div className="auth-page-container">
      <AnimatePresence mode="wait" custom={isLogin ? 1 : -1}>
        {isLogin ? (
          <motion.div
            key="login"
            className="auth-page-wrapper"
            variants={pageVariants}
            initial="initial"
            animate="center"
            exit="exit"
            custom={isLogin ? 1 : -1}
            transition={transition}
            style={{ perspective: '1200px' }}
          >
            <Login onSwitchToRegister={() => handleSwitchPage(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="register"
            className="auth-page-wrapper"
            variants={pageVariants}
            initial="initial"
            animate="center"
            exit="exit"
            custom={isLogin ? 1 : -1}
            transition={transition}
            style={{ perspective: '1200px' }}
          >
            <Register onSwitchToLogin={() => handleSwitchPage(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
