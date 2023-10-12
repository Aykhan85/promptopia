'use client'

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Profile from '@/components/Profile'

export default function UserProfile({ params }) {

    const [userPosts, setUserPosts] = useState()

    const searchParams = useSearchParams();

    const userName = searchParams.get('name')


    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/users/${params?.id}/posts`)
            const data = await res.json()
            setUserPosts(data)
        }

        if (params?.id) fetchPosts()
    }, [params.id])


    return (
        <Profile
            name={userName}
            desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
            data={userPosts}
        />
    )
}
