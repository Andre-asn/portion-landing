import { useEffect, useState } from 'react'
import { CheckCircle, X } from 'phosphor-react'
import { useSearchParams, useNavigate } from 'react-router-dom'

const Verification = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [isValidAccess, setIsValidAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const validateVerificationCode = () => {
      const code = searchParams.get('code')
      
      console.log('=== DEBUG INFO ===')
      console.log('Code from URL:', code)
      console.log('Current URL:', window.location.href)
      
      if (!code) {
        console.log('No code found, redirecting to home')
        setTimeout(() => navigate('/'), 2000)
        setIsLoading(false)
        return
      }

      // Basic format validation - check if it looks like a valid UUID
      const isValidFormat = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(code)
      
      console.log('Code format valid:', isValidFormat)

      if (isValidFormat) {
        console.log('✅ Validation successful!')
        setIsValidAccess(true)
      } else {
        console.log('❌ Invalid code format')
        // Invalid code, redirect to home after showing error
        setTimeout(() => navigate('/'), 3000)
      }
      
      setIsLoading(false)
    }

    validateVerificationCode()
  }, [searchParams, navigate])

  // Loading state while validating
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/30 flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-border/20">
            <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
            </div>
            
            <h1 className="text-2xl font-bold text-primary mb-4">
              Verifying...
            </h1>
            
            <p className="text-text-secondary leading-relaxed">
              Please wait while we verify your email confirmation.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Show error message for invalid access
  if (!isValidAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/30 flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-border/20">
            <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <X size={48} className="text-error" weight="fill" />
            </div>
            
            <h1 className="text-2xl font-bold text-primary mb-4">
              Access Denied
            </h1>
            
            <p className="text-text-secondary leading-relaxed">
              Invalid or expired verification link. Redirecting to homepage...
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Success state - valid verification
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/30 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-border/20">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-success" weight="fill" />
          </div>
          
          {/* Main Message */}
          <h1 className="text-2xl font-bold text-primary mb-4">
            You're all verified!
          </h1>
          
          <p className="text-text-secondary leading-relaxed">
            Your email has been successfully verified. You can now close this page and return to the Portion app to sign in.
          </p>
        </div>
        
        {/* Branding */}
        <div className="text-center mt-8">
          <div className="text-primary font-bold text-lg mb-2">Portion</div>
          <div className="text-text-tertiary text-sm">Split bills effortlessly, Share moments endlessly</div>
        </div>
      </div>
    </div>
  )
}

export default Verification