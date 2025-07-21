'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Clock, FileText, BarChart3, PenTool, Play, CheckCircle } from 'lucide-react'
import styles from '@/styles/components/ResearchAgent.module.css'
import fonts from '@/styles/common/typography.module.css'
import { AgentChatMemory } from '@/types/app.types'

interface ResearchStep {
    icon: React.ReactNode
    title: string
    description: string
    status: 'pending' | 'active' | 'completed'
}

interface ResearchAgentProps {
    setMessages?: React.Dispatch<React.SetStateAction<AgentChatMemory[]>>
    chatId?: string
}

export default function ResearchAgent({ setMessages, chatId }: ResearchAgentProps) {
    const [isResearching, setIsResearching] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const [currentStep, setCurrentStep] = useState(-1)
    const router = useRouter()

    const researchSteps: ResearchStep[] = [
        {
          icon: <FileText className={styles.step_icon} />,
          title: "Filter for Relevant Internal Documents",
          description:
            "Identify and filter Tecno's document repository for relevant information related to Borgo Egnazia's company profile, ESG goals and benchmark setup.",
          status: "pending"
        },
        {
          icon: <BarChart3 className={styles.step_icon} />,
          title: "Research Trends and Value at Stake",
          description:
            "Research for key ESG trends and drivers relevant to Borgo Egnazia. Work out the risks, opportunities and likely value at stake for the business.",
          status: "pending"
        },
        {
            icon: <PenTool className={styles.step_icon} />,
            title: "Create Comprehensive Report",
            description: "Synthesize findings into a tailored report for Borgo Egnazia, including trends & drivers and value at stake.",
            status: 'pending'
        }
    ]

    const startResearch = () => {
        setIsResearching(true)
        setIsCompleted(false)
        setCurrentStep(0)
        simulateResearchProgress()
    }

    const simulateResearchProgress = () => {
        // Step through each research phase
        researchSteps.forEach((step, index) => {
            setTimeout(() => {
                setCurrentStep(index)
            }, index * 5000) // 5 seconds per step
        })
        
        // Complete research after all steps
        setTimeout(() => {
            setIsResearching(false)
            setIsCompleted(true)
            setCurrentStep(-1) // No active step when completed
            
            // Add completion message to chat
            if (setMessages && chatId) {
                const completionMessage: AgentChatMemory = {
                    user_id: 'mock_user',
                    chat_id: `${chatId}-completion`,
                    content: "🎉 Great! Your ESG research report is complete. Click the button in the top-right to view your analysis covering ESG trends & drivers, value at stake assessment, and competitor benchmarking for Borgo Egnazia. Ready to develop your implementation strategy?",
                    source: 'agent',
                    agent_name: 'Assistant',
                    assets: [],
                    timestamp: new Date().toISOString()
                }
                setMessages(prev => [...prev, completionMessage])
            }
        }, researchSteps.length * 4000)
    }

    const getStepStatus = (index: number) => {
        if (isCompleted) return 'completed'
        if (index === currentStep) return 'active'
        if (index < currentStep) return 'completed'
        return 'pending'
    }

    const viewReport = () => {
        // Navigate to the existing document page
        router.push('/document')
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {isCompleted ? (
                    <div className={styles.completion_header}>
                        <CheckCircle className={styles.check_icon} />
                        <div>
                            <h2 className={`${styles.title} ${fonts.body}`}>ESG Research Complete!</h2>
                            <p className={`${styles.completion_text} ${fonts.body}`}>
                                Your comprehensive ESG analysis is ready to view.
                            </p>
                        </div>
                    </div>
                ) : (
                    <h2 className={`${styles.title} ${fonts.body}`}>ESG Best Practices Research</h2>
                )}
            </div>

            <div className={styles.research_plan}>
                {researchSteps.map((step, index) => (
                    <div 
                        key={index}
                        className={`${styles.step} ${styles[getStepStatus(index)]}`}
                    >
                        <div className={styles.step_header}>
                            {step.icon}
                            <h3 className={`${styles.step_title} ${fonts.body}`}>{step.title}</h3>
                        </div>
                        <p className={`${styles.step_description} ${fonts.body}`}>{step.description}</p>
                    </div>
                ))}
            </div>

            <div className={styles.footer}>
                <div className={styles.time_estimate}>
                    <Clock className={styles.clock_icon} />
                    <span className={fonts.body}>
                        {isCompleted ? 'Analysis complete' : isResearching ? 'Researching...' : 'Ready in a few minutes'}
                    </span>
                </div>
                
                <div className={styles.actions}>
                    {!isCompleted && (
                        <button 
                            className={`${styles.start_button} ${fonts.body}`}
                            onClick={startResearch}
                            disabled={isResearching}
                        >
                            <Play className={styles.play_icon} />
                            {isResearching ? 'Researching...' : 'Start research'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}