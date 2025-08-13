"use client"

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions/authenticate';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from "@/components/ui/label"
import { Input } from '../ui/input';
import { Button } from '../ui/button';


const LoginForm = () => {
  const [errorMessage, formAction] = useActionState(
    authenticate,
    undefined,
    );
  return (
    <Card className='w-full max-w-md mx-auto'>
        <CardHeader>
            <CardTitle className="text-3xl font-bold">ログイン</CardTitle>
        </CardHeader>

        <CardContent>
            <form action={formAction} className='space-y-4'>
             <div className='space-y-4'>
                <Label htmlFor="email">メールアドレス</Label>
                <Input id='email' type='email' name='email' required/>
             </div>
             <div className='space-y-4'>
                <Label htmlFor="password">パスワード</Label>
                <Input id='password' type='password' name='password' required/>
             </div>

             <Button type='submit' className='w-full'>ログイン</Button>

             <div className="flex h-8 items-end space-x-1">
               {errorMessage && (
                <>
                <div className="text-red-500">
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </div>
                </>
                )}
             </div>
            </form>
        </CardContent>
    </Card>
  )
    
}

export default LoginForm