import { useEffect } from 'react'
import { CheckCircle, XCircle, Info } from 'lucide-react'

export default function Toast({ message, type = 'info', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />
  }

  return (
    <div className={`toast toast-${type}`}>
      {icons[type]}
      <span>{message}</span>
    </div>
  )
}
