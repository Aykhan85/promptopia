'use client'

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard';

export default function Feed() {
    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState('')

    const handleSearch = async (e) => {
        setSearchText(e.target.value)
    }

    const handleTag = (tagName) => {
        setSearchText(tagName)
    }

    useEffect(() => {
        const searchValue = posts?.filter(post => post.prompt.includes(searchText) || post.tag.includes(searchText))
        setSearch(searchValue)
    }, [searchText])

    const PromptCardList = ({ data, handleTagClick }) => {
        return (
            <div className='mt-16 prompt_layout'>
                {data.map(post => (
                    <PromptCard
                        key={post._id}
                        post={post}
                        handleTagClick={handleTagClick}
                    />

                ))}
            </div>
        )
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/prompt')
            const data = await res.json()
            setPosts(data)
        }

        fetchPosts()
    }, [])

    return (
        <section className='feed'>
            <form className='relative w-full flex-center' onSubmit={e => e.preventDefault()}>
                <input
                    type="text"
                    placeholder='Search tag or username'
                    value={searchText}
                    required
                    onChange={handleSearch}
                    className='search_input peer'
                />
            </form>

            <PromptCardList
                data={searchText ? search : posts}
                handleTagClick={handleTag}
            />
        </section>
    )
}
