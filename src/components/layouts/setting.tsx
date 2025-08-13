import { signOut } from '@/auth';
import { Session } from 'next-auth'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';

const Setting = ({session}:{session : Session}) => {
    const handleLogout = async () => {
        'use server';
        await signOut();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className='font-medium'>
                    {session.user?.name}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end' className='w-48'>
                <DropdownMenuItem onClick={handleLogout} className='cursor-point'>
                    ログアウト
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Setting