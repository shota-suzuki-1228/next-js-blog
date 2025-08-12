import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '../ui/navigation-menu'
import Link from 'next/link'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const PublicHeader = () => {
  return (
    <div>
        <header className='vorder-b bg-blue-200'>
            <div className='container mx-auto px-4 flex items-center justify-between'>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href={"/"} legacyBehavior passHref>
                             <NavigationMenuLink className='font-bold text-xl'>
                                Blog
                             </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <div className='flex items-center gap-4'>
                    <Input placeholder='記事を検索' className='w-[200] lg:w-[300]'/>
                    <Button asChild variant={"outline"}>
                        <Link href={"/login"}>
                        ログイン
                        </Link>
                    </Button>
                    <Button asChild >
                        <Link href={"/register"}>
                        登録
                        </Link>
                    </Button>
                </div>
            </div>

        </header>
    </div>
  )
}

export default PublicHeader