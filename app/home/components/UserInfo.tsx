import { useSession } from 'next-auth/react';
import {User} from '@nextui-org/react';

export const UserInfo = () => {
    const {data: session} = useSession();

    return (session && 
        <User
            avatarProps={{
                src: session.user?.image as string,
            }}
            description={session.user?.email}
            name={session.user?.name }
        />
    );
};