'use client'
/**
 * @description This is the main page of the
 * Tecno ESG application. It displays the chat
 * messages and the chat box for user input.
 * The messages are loaded from the server and
 * displayed in the chat section.
 */
import { PanelRightOpen } from 'lucide-react'

// Context
import { useAppContext } from '@/contexts/AppContext'

// Components
import ChatPage from '@/components/pages/ChatPage'
import DocumentPage from '@/components/pages/DocumentPage'

// Styles
import styles from '@/styles/pages/MainPage.module.css'
import { useEffect } from 'react'

export default function MainPage() {

    const {isDocumentPanelOpen, setIsDocumentPanelOpen} = useAppContext()
    
    const toggleDocumentPanel = () => {
        setIsDocumentPanelOpen(!isDocumentPanelOpen)
    }
    
    return (
        <div className={styles.container}>
            <button 
                className={styles.panel_toggle}
                onClick={toggleDocumentPanel}
            >
                <PanelRightOpen className={styles.panel_icon} />
            </button>
            
            <div 
                className={`
                    ${styles.chat_section} 
                    ${isDocumentPanelOpen? styles.chat_section_narrow : ''}
                `}
            >
                <ChatPage />
            </div>
            
            {isDocumentPanelOpen && (
                <div className={styles.document_panel}>
                    <DocumentPage />
                </div>
            )}
        </div>
    )
}