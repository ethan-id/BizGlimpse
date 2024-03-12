'use client';

import {HomePage} from '@/app/home/components/HomePage';
import {MyParticles} from '@/app/home/components/particles';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, User } from '@nextui-org/react';
import Image from 'next/image';
import Logo from '@/public/images/FullNameLogoWhite.png';
import { signOut } from 'next-auth/react';
import { UserInfo } from './components/UserInfo';

export default function Home() {
	return (
		<section>
			<Navbar isBordered className='absolute py-2 bg-transparent'>
				<NavbarBrand>
					<UserInfo/>
				</NavbarBrand>

				<NavbarContent justify='end'>
					<NavbarItem className='flex items-center gap-4'>
						<Button onClick={() => signOut()}>Sign out</Button>
					</NavbarItem>
				</NavbarContent>
			</Navbar>

			<MyParticles/>
			<HomePage/>
		</section>
	);
}