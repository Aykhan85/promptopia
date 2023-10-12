'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Profile from '@/components/Profile'

export default function MyProfile() {

    const [posts, setPosts] = useState([])
    const { data: session } = useSession()
    const router = useRouter()



    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await res.json()

            setPosts(data)
        }

        if (session?.user.id) fetchPosts()
    }, [session])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const isConfirmed = confirm('Are you sure you want to delete this prompt?')

        if (isConfirmed) {
            try {
                const res = await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                })

                const filteredPosts = posts.filter(prompt => prompt._id !== post._id)

                setPosts(filteredPosts)

            } catch (error) {

            }
        }
    }
    return (
        <Profile
            name='My'
            desc='Welcome to your personalized profile page'
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}
