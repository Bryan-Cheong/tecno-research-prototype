'use client'
/**
 * @description This is the chat page for the ESG 
 * application. It displays the chat messages
 * and the chat box for user input. The messages
 * are loaded from the server and displayed in the
 * chat section. The user can send messages and
 * receive responses from the agent.
 */

import { useState, useEffect, useRef } from 'react'

// Components
import ChatBox from '@/components/ChatBox'
import UserMessage from '@/components/UserMessage'
import AgentMessage from '@/components/AgentMessage'
import ErrorMessage from '@/components/ErrorMessage'
import ResponseLoader from '@/components/ResponseLoader'

// Types
import { AgentChatMemory } from '@/types/app.types'

// Styles
import styles from '@/styles/components/pages/ChatPage.module.css'

const INITIAL_AGENT_MESSAGE = `👋 Hello! I'm your Research Agent for Borgo Egnazia.
I'd like to ask a few quick questions to tailor my analysis, feel free to skip anything you're unsure of!
1. Who are 2-3 competitors you'd like to benchmark against?
2. What ESG expectations have you received from stakeholders?
3. Any new sustainability opportunities you're exploring?
4. What cultural values shape your sustainability approach?
5. Which ESG areas are you strongest in, and where would you like to improve?`

export default function ChatPage({ mockMessages }: { mockMessages?: AgentChatMemory[] }) {
    const [isLoading, setIsLoading] = useState(true)
    const [messages, setMessages] = useState<AgentChatMemory[]>([])
    const chatSectionRef = useRef<HTMLDivElement>(null)

useEffect(() => {
    // Use mock messages if provided, otherwise use hardcoded message
    const timer = setTimeout(() => {
        if (mockMessages) {
            setMessages(mockMessages)
        } else {
            setMessages([
                {
                    user_id: 'mock_user',
                    chat_id: '1',
                    content: INITIAL_AGENT_MESSAGE,
                    source: 'agent',
                    agent_name: 'Assistant',
                    assets: [],
                    timestamp: new Date().toISOString()
                }
            ])
        }
        setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
}, [mockMessages])

    const renderMessages = () => {
        return (
            messages.map((message: AgentChatMemory) => {
                if (message.source === 'user') {
                    return (
                        <UserMessage 
                            key={message.chat_id} 
                            message={message.content}
                            assets={message.assets || []}
                        />
                    )
                } else if (message.source === 'agent') {
                    return (
                        <AgentMessage 
                            key={message.chat_id} 
                            message={message.content}
                            assets={message.assets || []}
                        />
                    )
                }
            })
        )
    }

    // Auto-scroll to bottom when new messages are added
    useEffect(() => {
        if (chatSectionRef.current) {
            chatSectionRef.current.scrollTop = chatSectionRef.current.scrollHeight
        }
    }, [messages])
    
    return (
        <div className={styles.main_container}>
            {/* Messages */}
            <div 
                ref={chatSectionRef}
                className={styles.chat_section}
            >
                {renderMessages()}
                {isLoading && <ResponseLoader />}
            </div>
            {/* Chat Box */}
            <ChatBox 
                messages={messages} 
                setMessages={setMessages}
            />
        </div>
    )
}