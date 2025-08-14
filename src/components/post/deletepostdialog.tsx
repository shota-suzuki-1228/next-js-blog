import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import deletePost from '@/lib/actions/deletepost';

type DeletePostProps = {
    postId:string;
    isOpen:boolean;
    onOpenChange:(open:boolean) => void
  }

const DeletePostDialog = ({postId,isOpen,onOpenChange}:DeletePostProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>記事の削除</AlertDialogTitle>
                <AlertDialogDescription>
                    この記事を削除してもよろしいでしょうか。
                    <br/>
                    この操作は取り消しができません。
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>キャンセル</AlertDialogCancel>
                <AlertDialogAction onClick={() => deletePost(postId)}
                    className='bg-red-500 hover:bg-red-600'>削除する</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeletePostDialog