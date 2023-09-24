"use client"

import { signIn } from 'next-auth/react'
import { Roboto } from 'next/font/google'


const my_font = Roboto({ subsets: ['cyrillic'], weight: "900" });

export default function SignInButton() {
    return (
        <div className="innerleft ">
            <button id="sign" className={my_font.className} onClick={() => {signIn('google')}}>Sign In</button>
        </div>
    )
}
