'use client'
/**
 * @description This page displays the rendered
 * document for the user to view. It fetches the
 * document content from the server and displays
 * it in a scrollable container. The user can
 * also download the document as a PDF file.
 */
import { useState, useEffect } from 'react'
import { Download } from 'lucide-react'

// Components
import DocumentLoader from '@components/utils/DocumentLoader'

// Styles
import styles from '@/styles/components/pages/DocumentPage.module.css'

export default function DocumentPage() {
    const [isLoading, setIsLoading] = useState(true)
    const reportURL = '/assets/strategy_report.pdf'

    useEffect(() => {
        // Simulate brief loading for smooth UX
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 500)

        return () => clearTimeout(timer)
    }, [])

    const handleDownload = () => {
        const link = document.createElement('a')
        link.href = reportURL
        link.download = 'strategy_report.pdf'
        link.click()
    }

    const renderDocumentContent = () => {
        if (isLoading) {
            return <DocumentLoader />
        }

        return (
            <iframe
                src={`${reportURL}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                className={styles.document_viewer}
                title="Document Viewer"
            />
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.title}>Document View</span>
                <div className={styles.download_button} onClick={handleDownload}>
                    <Download className={styles.download_icon} />
                </div>
            </div>
            {/* Document Content */}
            {renderDocumentContent()}
        </div>
    )
}