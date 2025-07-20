import { useEffect, useRef } from 'react'
import styles from '@/styles/components/Overlay.module.css'

export default function Overlay({ children, onClose }: { children: React.ReactNode, onClose: () => void }) {
    const overlayRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Handle ESC key press
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        // Handle click outside
        const handleClickOutside = (event: MouseEvent) => {
            if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
                onClose()
            }
        }

        document.addEventListener('keydown', handleEsc)
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('keydown', handleEsc)
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [onClose])

    return (
        <div className={styles.overlay}>
            <div ref={overlayRef} className={styles.content}>
                {children}
            </div>
        </div>
    )
}