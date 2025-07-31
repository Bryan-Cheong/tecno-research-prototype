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
    subItems?: {
        category: string
        items: string[]
    }[]
}

interface ResearchAgentProps {
    setMessages?: React.Dispatch<React.SetStateAction<AgentChatMemory[]>>
    chatId?: string
}

export default function ResearchAgent({ setMessages, chatId }: ResearchAgentProps) {
    const [isResearching, setIsResearching] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const [currentStep, setCurrentStep] = useState(-1)
    const [completedSubItems, setCompletedSubItems] = useState<Set<string>>(new Set())
    const router = useRouter()

    const researchSteps: ResearchStep[] = [
        {
            icon: <FileText className={styles.step_icon} />,
            title: "Filter for Relevant Internal Documents",
            description: "Scan and filter the company profile and research checklist to identify relevant strategy goals related to Sunshine Resort.",
            status: "pending"
        },
        {
            icon: <BarChart3 className={styles.step_icon} />,
            title: "Design Strategy Foundations",
            description: "Lay the groundwork for Sunshine Resort's ESG strategy by defining ambition level, engaging stakeholders, and identifying key areas for sustainability innovation and impact.",
            status: "pending",
            subItems: [
        {
            category: "Strategic Foundations",
            items: ["Ambition", "Double Materiality", "Stakeholder Co-creation"]
        },
        {
            category: "Sustainability Initiatives",
            items: [
                "Systemic Impact",
                "Monetisation",
                "Sustainability-oriented Innovation"
            ]
        }
                    ]
        },
        {
            icon: <PenTool className={styles.step_icon} />,
            title: "Create Comprehensive Report",
            description: "Synthesize findings into a tailored ESG strategy for Sunshine Resort, including benchmarks, improvement recommendations, and implementation roadmap.",
            status: 'pending'
        }
    ]

    const startResearch = () => {
        setIsResearching(true)
        setIsCompleted(false)
        setCurrentStep(0)
        setCompletedSubItems(new Set())
        simulateResearchProgress()
    }

    const simulateResearchProgress = () => {
        // Step 1: Documents (10 seconds)
        setTimeout(() => {
            setCurrentStep(0)
        }, 0)

        // Step 2: Trends and Value at Stake with sub-items (30 seconds total)
        setTimeout(() => {
            setCurrentStep(1)
            // Simulate sub-item completion for step 2
            const step2SubItems = [
                "Ambition", "Double Materiality", "Stakeholder Co-creation",
                "Systemic Impact", "Monetisation", "Sustainability-oriented Innovation"
            ]
            
            step2SubItems.forEach((item, index) => {
                setTimeout(() => {
                    setCompletedSubItems(prev => new Set([...prev, item]))
                }, (index + 1) * 1000) // 1 second per sub-item
            })
        }, 3000)

        // Step 3: Report creation (10 seconds)
        setTimeout(() => {
            setCurrentStep(2)
        }, 10000)
        
        // Complete research
        setTimeout(() => {
            setIsResearching(false)
            setIsCompleted(true)
            setCurrentStep(-1)
            
            if (setMessages && chatId) {
                const completionMessage: AgentChatMemory = {
                    user_id: 'mock_user',
                    chat_id: `${chatId}-completion`,
                    content: "🎯 Great! Your ESG strategy report is ready. Click the button in the top-right to view a curated list of initiatives designed to kick-start Sunshine Resort's sustainability journey. The report includes goal alignment, phased action plans, and tailored strategies across environmental, social, and governance dimensions.",
                    source: 'agent',
                    agent_name: 'Assistant',
                    assets: [],
                    timestamp: new Date().toISOString()
                }
                setMessages(prev => [...prev, completionMessage])
            }
        }, 20000)
    }

    const getStepStatus = (index: number) => {
        if (isCompleted) return 'completed'
        if (index === currentStep) return 'active'
        if (index < currentStep) return 'completed'
        return 'pending'
    }

    const renderSubItems = (step: ResearchStep, stepIndex: number) => {
    if (!step.subItems || stepIndex !== 1) return null
    
    const isStepActive = currentStep === stepIndex
    const isStepCompleted = getStepStatus(stepIndex) === 'completed'
    
    if (!isStepActive && !isStepCompleted) return null

    return (
        <div className={styles.sub_items}>
            <div className={styles.sub_items_grid}>
                {step.subItems.map((category, categoryIndex) => (
                    <div 
                        key={categoryIndex} 
                        className={styles.sub_category}
                    >
                        <h4 className={`${styles.sub_category_title} ${fonts.body}`}>
                            {category.category}
                        </h4>
                        <div className={styles.sub_items_list}>
                            {category.items.map((item, itemIndex) => {
                                const isCompleted = completedSubItems.has(item) || isStepCompleted
                                return (
                                    <div 
                                        key={itemIndex} 
                                        className={`${styles.sub_item} ${isCompleted ? styles.completed : ''}`}
                                    >
                                        <div className={styles.checkbox}>
                                            {isCompleted && <CheckCircle className={styles.check_small} />}
                                        </div>
                                        <span className={fonts.body}>{item}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {isCompleted ? (
                    <div className={styles.completion_header}>
                        <CheckCircle className={styles.check_icon} />
                        <div>
                            <h2 className={`${styles.title} ${fonts.body}`}>ESG Strategy Complete!</h2>
                            <p className={`${styles.completion_text} ${fonts.body}`}>
                                Your tailored ESG strategy is ready to view.
                            </p>
                        </div>
                    </div>
                ) : (
                    <h2 className={`${styles.title} ${fonts.body}`}>ESG Strategy Research</h2>
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
                        {renderSubItems(step, index)}
                    </div>
                ))}
            </div>

            <div className={styles.footer}>
                <div className={styles.time_estimate}>
                    <Clock className={styles.clock_icon} />
                    <span className={fonts.body}>
                        {isCompleted ? 'Analysis complete' : isResearching ? 'Researching...' : 'Estimated time: 1 minute'}
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
                            {isResearching ? 'Creating...' : 'Create strategy'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}