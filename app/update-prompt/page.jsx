'use client'
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Form from "@/components/Form"

export default function UpdatePrompt() {

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });

    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')
    const router = useRouter()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`api/prompt/${promptId}`)
                const data = await res.json()

                setPost({
                    prompt: data.prompt,
                    tag: data.tag
                })
            } catch (error) {
                console.log(error);
            }
        }
        if (promptId) fetchData()
    }, [promptId])

    const updatePromt = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        if (!promptId) return alert('Promt id not found!')

        try {
            const res = await fetch(`api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })

            })

            if (res.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false)
        }
    }

    return <Form submitting={submitting} post={post} setPost={setPost} handleSubmit={updatePromt} type='Edit' />
}
