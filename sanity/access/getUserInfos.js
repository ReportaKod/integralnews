// access.js
import userStore from 'part:@sanity/base/user'

export const EDITOR_TYPES = ['blogPost']

export const getUserStore = () => {
    return userStore;
}

export const getCurrentUser = () => {
    userStore.me.subscribe(user => {
        window._sanityUser = user || undefined
    })
}

export const isAdmin = (user = window._sanityUser) =>
    user?.roles.map(role => role.name).includes('administrator')

export const isNotAdmin = user => !isAdmin(user)