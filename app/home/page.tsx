'use client';

import {HomePage} from '@/app/home/components/HomePage';
import {MyParticles} from '@/app/home/components/particles';

export default function Home() {

	return (
		<section>
			<MyParticles/>
			<HomePage/>
		</section>
	);
}
