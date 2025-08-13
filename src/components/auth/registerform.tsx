"use client"

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions/authenticate';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from "@/components/ui/label"
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import createUser from '@/lib/actions/createuser';


const RegisterForm = () => {
  const [state, formAction] = useActionState(createUser,

    {success:false,errors:{}
});

  return (
    <Card className='w-full max-w-md mx-auto'>
        <CardHeader>
            <CardTitle>ユーザー登録</CardTitle>
        </CardHeader>

        <CardContent>
           <form action={formAction} className='space-y-4'>
            <div>
                <Label htmlFor='name'>名前</Label>
                <Input id='name' type='text' name='name' required/>
                {state.errors.name && (
                    <p className='text-red-500 text-sm mt-1'>{state.errors.name.join(",")}</p>
                )}
            </div>
            <div>
                <Label htmlFor='email'>メールアドレス</Label>
                <Input id='email' type='text' name='email' required/>
                {state.errors.email && (
                    <p className='text-red-500 text-sm mt-1'>{state.errors.email.join(",")}</p>
                )}
            </div>
            <div>
                <Label htmlFor='password'>パスワード</Label>
                <Input id='password' type='password' name='password' required/>
                {state.errors.password && (
                    <p className='text-red-500 text-sm mt-1'>{state.errors.password.join(",")}</p>
                )}
            </div>
            <div>
                <Label htmlFor='confirmPassword'>パスワード（確認）</Label>
                <Input id='confirmPassword' type='password' name='confirmPassword' required/>
                {state.errors.confirmPassword && (
                    <p className='text-red-500 text-sm mt-1'>{state.errors.confirmPassword.join(",")}</p>
                )}
            </div>
            <Button type='submit' className='w-full'>登録</Button>
           </form>
        </CardContent>
    </Card>
  )
    
}

export default RegisterForm