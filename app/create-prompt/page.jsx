'use client'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Form from "@/components/Form"

export default function CreatePromt() {

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });

    const { data: session } = useSession();
    const router = useRouter()

    const createPormt = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            const res = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                    userId: session?.user.id
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

    return <Form submitting={submitting} post={post} setPost={setPost} handleSubmit={createPormt} type='Create' />
}
