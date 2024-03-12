import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from '@nextui-org/react';
import { signOut } from 'next-auth/react';
import { UserInfo } from './UserInfo';

export const NavBar = () => (
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
);
