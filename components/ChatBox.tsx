'use client'
/**
 * @description This component is the 
 * chat box for the application. Used 
 * to enter messages.
 */

import { useState, useRef } from 'react'
import { ArrowUp, Paperclip, FileText, X } from 'lucide-react'

// Types
import { AgentChatMemory } from '@/types/app.types'

// Styles
import styles from '@/styles/components/ChatBox.module.css'
import fonts from '@/styles/common/typography.module.css'

interface ChatBoxProps {
    messages: AgentChatMemory[]
    setMessages: React.Dispatch<React.SetStateAction<AgentChatMemory[]>>
}

export default function ChatBox(
    { messages, setMessages }: ChatBoxProps
) {
    const userId = 'user_001'
    const agentName = 'Assistant'
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<string>('')
    const [files, setFiles] = useState<File[]>([])
    const inputRef = useRef<HTMLTextAreaElement>(null)

    // Mock response generator based on user input
    const generateMockResponse = (userInput: string): string => {
        const input = userInput.toLowerCase().trim()

        // Research
        if (input.includes('research')) {
            // Instead of returning text, you'll want to trigger the ResearchAgent component
            return "TRIGGER_RESEARCH_AGENT" // Special flag
        }
    
        // Comprehensive response for the full answer
        if (input.includes('competitors: probably areias do seixo') || 
            (input.includes('areias') && input.includes('sextantio') && input.includes('finca') && 
            input.includes('stakeholder') && input.includes('opportunities') && input.includes('cultural') && 
            input.includes('strengths'))) {
            return "Thank you for providing so much comprehensive information! I have recorded your competitor preferences (Areias do Seixo, Sextantio, and Finca Serena), stakeholder expectations from travel agents and banks, exciting opportunities in climate-positive retreats and artisan collaborations, your strong connection to Puglian traditions, and your current strengths in energy and local engagement as well as areas for improvement like waste tracking. This gives me an excellent foundation to develop a tailored ESG strategy for Borgo Egnazia. Send 'Research' and I will research the trends and drivers as well as their value at stake!"
        }

        // Competitors
        if (input.includes('areias') || input.includes('sextantio') || input.includes('finca') || 
            input.includes('competitor') || input.includes('benchmark')) {
            return "Great! I've noted your competitor selection. These are excellent hospitality brands to benchmark against. I'll analyze their ESG practices and create comparisons that will help identify best practices and improvement opportunities for Borgo Egnazia."
        }
        
        // Stakeholder expectations
        if (input.includes('travel') || input.includes('carbon') || input.includes('plastic') || 
            input.includes('bank') || input.includes('roadmap') || input.includes('stakeholder') ||
            input.includes('agent') || input.includes('data') || input.includes('framework')) {
            return "Thank you for sharing those stakeholder requirements. I understand the various expectations you're facing from different partners and institutions. I'll help you develop comprehensive ESG metrics and reporting frameworks that address these stakeholder needs while strengthening your market position."
        }
        
        // Opportunities
        if (input.includes('climate') || input.includes('retreat') || input.includes('season') || 
            input.includes('eco') || input.includes('tourism') || input.includes('artisan') || 
            input.includes('collaboration') || input.includes('opportunities') || input.includes('exploring')) {
            return "Those are innovative sustainability opportunities! I can see you're thinking strategically about new offerings and partnerships. I'll research market trends and develop implementation strategies for these sustainability-focused initiatives that align with your brand values."
        }
        
        // Cultural values
        if (input.includes('puglian') || input.includes('tradition') || input.includes('local') || 
            input.includes('cultural') || input.includes('heritage') || input.includes('community') ||
            input.includes('values') || input.includes('approach')) {
            return "Your commitment to local culture and community is a powerful foundation for your sustainability strategy. This authentic connection to place and people can be a key differentiator. I'll explore how these values can enhance your ESG narrative and stakeholder appeal."
        }
        
        // Strengths and gaps
        if (input.includes('energy') || input.includes('engagement') || input.includes('waste') || 
            input.includes('tracking') || input.includes('strength') || input.includes('gap') || 
            input.includes('improve') || input.includes('good') || input.includes('great')) {
            return "Thanks for that honest assessment of your current ESG position. Understanding both strengths and improvement areas is crucial for developing an effective strategy. I'll research best practices and systems that can help address the gaps while building on your existing strengths."
        }
        
        // General ESG/sustainability
        if (input.includes('esg') || input.includes('sustainability')) {
            return "ESG integration is crucial for hospitality leaders like Borgo Egnazia. I can help you develop comprehensive strategies that align with your values while meeting modern sustainability standards."
        }
        
        // Greetings
        if (input.includes('hello') || input.includes('hi')) {
            return "Hello! I'm ready to help analyze ESG opportunities for Borgo Egnazia. Feel free to share your thoughts on any of the questions I asked!"
        }
        
        // Thanks
        if (input.includes('thank') || input.includes('thanks')) {
            return "You're welcome! Your insights are very helpful for developing tailored ESG strategies. Is there anything specific you'd like me to dive deeper into?"
        }
        
        // Default response
        return "That's valuable information! I'm processing your input to develop tailored ESG insights for Borgo Egnazia. Could you elaborate on any specific aspects you'd like me to focus on?"
    }

    const chatInput = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const textArea = event.currentTarget
        
        // Reset height to auto to get the correct scrollHeight
        textArea.style.height = 'auto'
        
        // Set height based on scroll height, but respect min and max heights
        const maxHeight = parseInt(getComputedStyle(textArea).maxHeight)
        const newHeight = Math.min(textArea.scrollHeight, maxHeight)
        textArea.style.height = `${newHeight}px`

        setMessage(event.target.value)
    }

    const fileInput = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const selectedFiles = Array.from(event.target.files || [])
        setFiles(prev=> [...prev, ...selectedFiles])
        // Reset input value to allow re-uploading the same file
        event.target.value = ''
    }

    const sendMessage = async () => {
        
        if (!message.trim() || isLoading) {
            return
        }

        const userMessage: AgentChatMemory = {
            user_id: userId,
            chat_id: `${userId}-${agentName}-${Date.now()}`,
            timestamp: new Date().toISOString(),
            content: message.trim(),
            source: 'user',
            agent_name: agentName,
            assets: (files.length > 0) ? files.map(file => file.name) : null
        }
        const messageToSend = message.trim()

        // Add user message to the chat
        setMessages(prev => [...prev, userMessage])
        
        // Clear input and reset height
        setMessage('')
        if (inputRef.current) {
            inputRef.current.style.height = 'auto'
        }

        setIsLoading(true)

        try {
            // Fake 2000ms delay to show loading
            await new Promise(resolve => setTimeout(resolve, 2000))
            
            // Generate mock response
            const responseContent = generateMockResponse(messageToSend)
            
            const responseMessage: AgentChatMemory = {
                user_id: userId,
                chat_id: `${userId}-${agentName}-${Date.now()}`,
                timestamp: new Date().toISOString(),
                content: responseContent,
                source: 'agent',
                agent_name: agentName,
                assets: null
            }

            // Add response message to the chat
            setMessages(prev => [...prev, responseMessage])
            setFiles([]) // Clear files after sending
            
        } catch (error) {
            console.error('Error sending message:', error)
            // For prototype, we'll just show a generic error response
            const errorResponse: AgentChatMemory = {
                user_id: userId,
                chat_id: `${userId}-${agentName}-${Date.now()}`,
                timestamp: new Date().toISOString(),
                content: "I'm having trouble processing your request right now. Please try again.",
                source: 'agent',
                agent_name: agentName,
                assets: null
            }
            setMessages(prev => [...prev, errorResponse])
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyPress = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            sendMessage()
        }
    }

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index))
    }

    const renderFilesPreview = () => {
        if (files.length === 0) {
            return <></>
        }

        return (
            <div className={styles.files_preview}>
                {files.map((file, index) => (
                    <div key={index} className={styles.file_item}>
                        <FileText className={styles.file_icon} />
                        <span className={fonts.body}>{file.name}</span>
                        <X 
                            className={styles.remove_file_button}
                            onClick={() => removeFile(index)}
                        />
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className={styles.main_container}>
            {/* Selected files */}
            <div className={styles.selected_files_container}>
                {renderFilesPreview()}
            </div>
            <div className={styles.sub_container}>
                {/* File Upload */}
                <div className={styles.file_upload_container}>
                    <Paperclip className={styles.file_upload_icon} />
                    <input
                        type="file"
                        multiple={true}
                        accept=".doc,.docx,.pdf,.txt"
                        onChange={fileInput}
                        className={styles.file_input}
                    />
                </div>
                {/* Input */}
                <textarea
                    ref={inputRef}
                    className={`${styles.chat_input} ${fonts.body}`}
                    placeholder='Type your message here...'
                    value={message}
                    onChange={chatInput}
                    onKeyDown={handleKeyPress}
                    disabled={isLoading}
                    rows={1}
                />
                {/* Icon */}
                <div 
                    className={styles.icon_container}
                    onClick={sendMessage}
                    style={{ 
                        cursor: message.trim() && !isLoading ? 'pointer' : 'default',
                        opacity: message.trim() && !isLoading ? 1 : 0.5 
                    }}
                >
                    {isLoading ? (
                        <div className={styles.loading_square} />
                    ) : (
                        <ArrowUp className={styles.icon_con} />
                    )}
                </div>
            </div>
        </div>
    )
}