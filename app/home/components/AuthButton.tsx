import { signIn, signOut, useSession } from 'next-auth/react';
import {Button, ButtonGroup} from '@nextui-org/react';

export const AuthButton = () => {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className='absolute top-10 right-10 z-10 flex items-center'>
        <p className='text-sm pr-4'>Signed in as {session.user?.email}</p>
        <ButtonGroup>
            <Button onClick={() => signOut()}>Sign out</Button>
        </ButtonGroup>
      </div>
    )
  }
  return (
    <ButtonGroup className='absolute top-10 right-10'>
        <Button onClick={() => signIn('github')}>Sign in with GitHub</Button>
    </ButtonGroup>
  )
}
