'use client'
import { useState } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"


export default function PromptCard({ post, handleTagClick, handleEdit, handleDelete }) {
    const [copied, setCopied] = useState('')

    const handleCopy = () => {
        setCopied(post.prompt)
        navigator.clipboard.writeText(post.prompt)
        setTimeout(() => setCopied(''), 3000);
    };

    const { data: session } = useSession()
    const pathName = usePathname()

    const router = useRouter()

    const handleProfileClick = () => {
        if (post?.creator._id === session?.user.id) {
            return router.push('/profile')
        }

        return router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
    }

    return (
        <div className="prompt_card">
            <div className="flex items-start justify-between gap-5">
                <div className="flex items-center justify-between flex-1 gap-3 cursor-pointer">
                    <Image
                        src={post.creator.image}
                        alt='user image'
                        width={40}
                        height={40}
                        className='object-contain rounded-full'
                        onClick={handleProfileClick}
                    />

                    <div className="flex flex-col" onClick={handleProfileClick}>
                        <h3 className="font-semibold text-gray-900 font-satoshi">{post.creator.username}</h3>
                        <p className="text-sm text-gray-500">{post.creator.email}</p>
                    </div>

                    <div className="copy_btn" onClick={handleCopy}>
                        <Image
                            src={copied === post.prompt
                                ? '/assets/icons/tick.svg'
                                : '/assets/icons/copy.svg'}
                            width={12}
                            height={12}
                            alt='copy icon'
                        />
                    </div>
                </div>
            </div>

            <p className="my-4 text-sm text-gray-700 font-satoshi">{post.prompt}</p>
            <p className="text-sm cursor-pointer blue_gradient"
                onClick={() => handleTagClick && handleTagClick(post.tag)}
            >{post.tag.includes('#') ? post.tag : `#${post.tag}`}</p>

            {session?.user.id === post.creator._id && pathName === '/profile' && (
                <div className="gap-4 pt-3 mt-5 border-t border-gray-100 flex-center">
                    <p className="text-sm cursor-pointer font-inter green_gradient" onClick={handleEdit}>
                        Edit
                    </p>
                    <p className="text-sm cursor-pointer font-inter orange_gradient" onClick={handleDelete}>
                        Delete
                    </p>
                </div>
            )}
        </div>
    )
}
