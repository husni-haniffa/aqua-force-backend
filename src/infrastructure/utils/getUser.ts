import { clerkClient } from '@clerk/express'

export const getUser = async (userId: string) => {
    try {
        const response = await clerkClient.users.getUser(userId)
        const primaryEmail = response.emailAddresses.find(
            (e) => e.id === response.primaryEmailAddressId
        )?.emailAddress ?? null

        return {
            userName: `${response.firstName ?? ''} ${response.lastName ?? ''}`.trim(),
            userEmail: primaryEmail
        }
    } catch (error) {
        console.error('Failed to fetch Clerk user:', error)
        throw error
    }
}