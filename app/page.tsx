'use client';

import {Button, ButtonGroup} from '@nextui-org/react';
import {signIn, useSession} from 'next-auth/react';
import Home from './home/page';

export default function SignIn() {
	const { data: session } = useSession();

	return (
		<section className=''>
			{session ? <>
				<Home/>
			</> : (
				<ButtonGroup className='flex justify-center items-center h-[80vh]'>
					<Button onClick={() => signIn('github')}>
						Sign in with GitHub
					</Button>
				</ButtonGroup>
			)}
		</section>
	);
}
