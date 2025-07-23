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
import ResponseLoader from '@/components/ResponseLoader'
import ResearchAgent from '@/components/ResearchAgent'

// Types
import { AgentChatMemory } from '@/types/app.types'

// Styles
import styles from '@/styles/components/pages/ChatPage.module.css'

const INITIAL_AGENT_MESSAGE = `👋 Hello, I’m your Strategy & Reporting Agent, designed to help kick-start your ESG journey.
I see that you're operating in the hotel industry, and you're looking to develop actionable 
strategies to meet your Environmental, Social, and Governance (ESG) goals.I'm here 
to guide you through this process, from identifying relevant initiatives to drafting 
tailored ESG strategies and reports aligned with global standards like the SDGs and GRI-lite.
To get started, simply type "Strategy" and I will generate a report containing a curated 
list of practical strategies your company can begin implementing right away. Let’s 
co-create a sustainability roadmap that drives real impact. 🌱`

export default function ChatPage({ mockMessages }: { mockMessages?: AgentChatMemory[] }) {
    const [isLoading, setIsLoading] = useState(true)
    const [messages, setMessages] = useState<AgentChatMemory[]>([])
    const chatSectionRef = useRef<HTMLDivElement>(null)

    const renderMessages = () => {
        return (
            messages.map((message: AgentChatMemory) => {
                // Check if this message should trigger the research agent
                if (message.content === "TRIGGER_RESEARCH_AGENT") {
                    return (
                        <div key={message.chat_id} style={{ margin: '16px 0' }}>
                            <ResearchAgent 
                                setMessages={setMessages}
                                chatId={message.chat_id}
                            />
                        </div>
                    )
                }

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
                {messages && renderMessages()}
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