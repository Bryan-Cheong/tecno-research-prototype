'use client'
/**
 * @description This is the root layout 
 * for the Tecno ESG application. Metadata
 * and global styles are defined here.
 */

import type { Metadata } from "next"
import { useState } from "react"

// Styles
import styles from "@/styles/common/root.module.css"
import '@styles/common/globals.css'
import Overlay from '@/components/Overlay'


// Context
import AppProvider from "@/contexts/AppContext"
// export const metadata: Metadata = {
//     title: "Tecno ESG",
// }

export default function RootLayout(
    { children }: Readonly<{children: React.ReactNode}>
) {
    const [showOverlay, setShowOverlay] = useState(false)

    return (
        <html lang="en" className={styles.html}>
            <body>
                <AppProvider>
                    {/* Arrow trigger button */}
                    <button
                        style={{
                            position: 'fixed',
                            left: 0,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 100,
                            width: '3rem',
                            height: '3rem',
                            background: '#fff',
                            border: 'none',
                            borderRadius: '0 1.5rem 1.5rem 0',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                        onClick={() => setShowOverlay(true)}
                        aria-label="Open Overlay"
                    >
                        {/* Simple right arrow SVG */}
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path d="M8 4l8 8-8 8" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    {/* Overlay itself */}
                    {showOverlay && (
                        <Overlay onClose={() => setShowOverlay(false)}>
                             <img 
                                src="/InternalWorkflow.png" 
                                alt="Overlay Image" 
                                style={{ width: '1000px', marginBottom: '1rem' }} 
                            />
                        </Overlay>
                    )}
                    {children}
                </AppProvider>
            </body>
        </html>
    )
}