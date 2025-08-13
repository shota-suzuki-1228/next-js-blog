'use server'

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // バリデーション
    if (!email || !password) {
      return 'メールアドレスとパスワードを入力してください';
    }

    // バリデーション（メールアドレス形式チェック）
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'メールアドレスの形式が正しくありません';
    }

    // パスワードの長さチェック（あなたのauth.tsに合わせて8文字以上）
    if (password.length < 8) {
      return 'パスワードは8文字以上で入力してください';
    }

    // 認証実行（リダイレクトはしない）
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    // 認証成功時、手動でリダイレクト
    if (result && !result.error) {
      redirect('/dashboard');
    }

    // ここに到達した場合は認証失敗
    return 'ログインに失敗しました';
    
  } catch (error) {
    // NEXT_REDIRECT エラー（手動リダイレクトの正常動作）の場合は再throw
    if (error && typeof error === 'object' && 'digest' in error && 
        typeof error.digest === 'string' && error.digest.includes('NEXT_REDIRECT')) {
      throw error;
    }

    // NextAuthのエラーハンドリング
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'メールアドレスまたはパスワードが正しくありません';
        default:
          return 'ログインに失敗しました。しばらく時間をおいて再度お試しください';
      }
    }

    // その他の予期しないエラー
    console.error('Authentication error:', error);
    return '予期しないエラーが発生しました';
  }
}