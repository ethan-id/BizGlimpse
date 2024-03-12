import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { Button, ButtonGroup} from '@nextui-org/react';
import FullNameLogo from '../../../public/images/FullNameLogoWhite.png';

export const SignInPage = () => (
    <section className='flex flex-col justify-center items-center'>
        <Image 
            src={FullNameLogo} 
            className='bg-blend-screen w-3/6 m-auto mb-24' 
            alt='Logo BizGlimpse'
        />
        <ButtonGroup className=''>
            <Button color='secondary' variant='ghost' onClick={() => signIn('github')}>
                Sign in with GitHub
            </Button>
        </ButtonGroup>
    </section>
);