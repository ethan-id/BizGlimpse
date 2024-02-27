'use client';

import {Grabber} from '@/app/home/components/grabber';
import {MyParticles} from '@/app/home/components/particles';
import {Button, ButtonGroup} from '@nextui-org/react';
import {signIn, useSession} from 'next-auth/react';

export default function Home() {
	const { data: session } = useSession();

	console.log(session);

	return (
		<section className='flex items-center text-6xl justify-center'>
			{session ? <>
				<MyParticles/>
				<Grabber/>
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
