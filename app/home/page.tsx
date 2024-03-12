'use client';

import {HomePage} from '@/app/home/components/HomePage';
import {MyParticles} from '@/app/home/components/particles';

export const Home = () => (
	<section>
		<MyParticles/>
		<HomePage/>
	</section>
);
