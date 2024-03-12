'use client';

import { useSession } from 'next-auth/react';
import { Home } from './home/page';
import { SignInPage } from './sign-in/components/SignInPage';

export default function SignIn() {
	const { data: session } = useSession();

	return (
		<section className=''>
			{session ? <Home/> : <SignInPage/>}
		</section>
	);
}
