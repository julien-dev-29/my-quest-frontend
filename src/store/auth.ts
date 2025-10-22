import type { User } from "@/types/types"

export default {
    storeToken: (token: string) => {
        localStorage.setItem("token", token)
    },
    getToken: () => {
        return localStorage.getItem("token") ?? false
    },
    storeUser: (user: User) => {
        localStorage.setItem("user", JSON.stringify(user))
    },
    getUser: () => {
        return JSON.parse(localStorage.getItem("user")!) ?? false
    },
    getUsername: () => {
        const user: User = JSON.parse(localStorage.getItem("user")!) ?? false
        return user.username
    },
    getUserId: () => {
        const user: User = JSON.parse(localStorage.getItem("user")!) ?? false
        return user.id
    }
}