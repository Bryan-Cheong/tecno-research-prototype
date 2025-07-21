/**
 * @description This file acts as an interface
 * to the backend services.
 */

// Types
import { AgentChatMemory, BackendResponse, UserData } from '@/types/app.types';

// --- Generic Service ---

/**
 * Generic function to make backend 
 * requests.
 * @param endpoint 
 * @param method 
 * @param body 
 * @returns BackendResponse<T>
 */
export async function backendRequest<T>(
    endpoint: string,
    method: 'GET' | 'POST' = 'GET',
    body?: any
): Promise<BackendResponse<T>> {
    const response = await fetch(
        `http://127.0.0.1:3001${endpoint}`, 
        {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : undefined,
        }
    )

    if (!response.ok) {
        throw new Error('Network response was not ok')
    }

    return await response.json() as BackendResponse<T>
}

/**
 * Used to upload files to the backend.
 * @param files 
 * @param userId 
 * @returns 
 */
export async function uploadFiles(
    userId: string = 'user_001',
    message: string,
    files: File[]
): Promise<AgentChatMemory> {
    const formData = new FormData()
    
    files.forEach(file => formData.append('files', file))
    formData.append('message', message)

    const response_fetch = (await fetch(
        `http://127.0.0.1:3001/onboarding/upload/${userId}`,
        {
            method: 'POST',
            body: formData,
        }
    ))

    const response = (
        await response_fetch.json() as BackendResponse<AgentChatMemory>
    )

    if (!response.success || !response.data) {
        throw new Error(response.error || 'File upload failed')
    }
    return response.data
}

// --- Onboarding Service ---

/**
 * Start a new onboarding chat for a user.
 * @param userId 
 * @returns 
 */
async function startOnboardingChat(
    userId: string = 'user_001'
): Promise<AgentChatMemory> {
    const response = await backendRequest<AgentChatMemory>(
        `/onboarding/start/${userId}`,
        'POST'
    )

    if (!response.success || !response.data) {
        throw new Error(
            response.error || 'Failed to start onboarding chat'
        )
    }

    return response.data
}

/**
 * Fetch chat history for a user.
 * @param userId 
 * @returns 
 */
export async function getOnboardingChatHistory(
    userId: string = 'user_001'
): Promise<AgentChatMemory[]> {
    const response = await backendRequest<AgentChatMemory[]>(
        `/onboarding/history/${userId}`
    )
    
    if (!response.success || !response.data) {
        throw new Error(
            response.error || 'Failed to fetch chat history'
        )
    }

    const messages = response.data || []

    // If no messages, start onboarding chat
    if (messages.length === 0) {
        const firstMessage = await startOnboardingChat(userId)
        return [firstMessage]
    } else {
        return messages
    }
}

/**
 * Send a message to the onboarding chatbot.
 * @param message 
 * @returns 
 */
export async function messageOnboardingChat(
    userId: string = 'user_001',
    message: string
): Promise<AgentChatMemory | null> {
    
    const response = await backendRequest<AgentChatMemory>(
        `/onboarding/chat/${userId}`,
        'POST',
        { message: message }
    )

    if (!response.success || !response.data) {
        throw new Error(
            response.error || 'Failed to send message'
        )
    }

    return response.data 
}

// --- User Service ---

/**
 * Fetch user data.
 * @param userId 
 * @returns 
 */
export async function getUserData(
    userId: string = 'user_001'
): Promise<UserData> {
    const response = await backendRequest<UserData>(
        `/user/data/${userId}`
    )

    if (!response.success || !response.data) {
        throw new Error(
            response.error || 'Failed to fetch user data'
        )
    }

    return response.data
}