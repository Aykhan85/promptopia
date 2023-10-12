'use client'
import Link from "next/link"
import Image from "next/image"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { useEffect, useState } from "react";
export default function Navbar() {

    const [providers, setProviders] = useState(null)
    const [toggleDropDown, setToggleDropDown] = useState(false)

    const { data: session } = useSession()

    useEffect(() => {
        const setAllProviders = async () => {
            const response = await getProviders()

            setProviders(response)
        }

        setAllProviders()
    }, [])


    /*  console.log(session); */
    return (
        <nav className="w-full pt-3 mb-16 flex-between">
            <Link className="flex gap-2 flex-center" href='/'>
                <Image src='/assets/images/logo.svg'
                    width={30}
                    height={30}
                    alt='logo'
                    className="object-contain"
                />
                <p className="logo_text">Propmtopia</p>
            </Link>

            <div className="hidden sm:flex">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href='/create-prompt' className="black_btn">
                            Create Post
                        </Link>

                        <button type="button" className="outline_btn" onClick={signOut}>
                            Sign Out
                        </button>

                        <Link href='/profile'>
                            <Image
                                src={session?.user.image}
                                width={37}
                                height={37}
                                alt='profile foto'
                                className="rounded-full"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map(provider => (
                            <button
                                type="button"
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className='black_btn'
                            >
                                Sign In
                            </button>
                        ))}
                    </>
                )}
            </div>

            <div className="relative flex sm:hidden">
                {session?.user ? (
                    <div className="flex">

                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            alt='profile foto'
                            className="rounded-full"
                            onClick={() => setToggleDropDown((prev) => !prev)}
                        />

                        {toggleDropDown && (
                            <div className="dropdown">
                                <Link
                                    href='/profile'
                                    className="dropdown_link"
                                    onClick={() => setToggleDropDown(false)}
                                >
                                    My Profile
                                </Link>

                                <Link
                                    href='/create-prompt'
                                    className="dropdown_link"
                                    onClick={() => setToggleDropDown(false)}
                                >
                                    Create Prompt
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setToggleDropDown(false)
                                        signOut()
                                    }}
                                    className='w-full mt-5 black_btn'
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}

                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map(provider => (
                            <button
                                type="button"
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className='black_btn'
                            >
                                Sign In
                            </button>
                        ))}
                    </>
                )}
            </div>
        </nav>
    )
}
