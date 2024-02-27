import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import {
    Button,
    ButtonGroup,
    User
} from '@nextui-org/react';


export const UserInfo = () => {
    const {data: session} = useSession();

    return (session && <div>
        <ButtonGroup className='absolute top-10 right-64 z-10 flex items-center'>
            <Button onClick={() => signOut()}>Sign out</Button>
        </ButtonGroup>
        <User
            avatarProps={{
                src: session.user?.image as string,
            }}
            className='absolute top-10 left-64 ml-4'
            description={session.user?.email}
            name={session.user?.name }
        />
    </div>);
};