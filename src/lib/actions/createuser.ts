"use server"

import { registerSchema } from "@/validations/user"
import bcryptjs from "bcryptjs"
import { prisma } from "../prisma"
import { signIn } from "@/auth"
import { redirect } from "next/navigation"
import { ZodError } from "zod"

type ActionState = {
    success: boolean
    errors: Record<string, string[]>
}

const handleValidationError = (error: ZodError): ActionState => {
    const {fieldErrors, formErrors} = error.flatten();
    const castedFieldErrors = fieldErrors as Record<string, string[]>
    if(formErrors.length > 0) {
        return {
            success: false,
            errors: {
                ...fieldErrors,
                confirmPassword: formErrors,
            }
        }
    }
    return {
        success: false,
        errors: castedFieldErrors
    }
}

const handleError = (customError: Record<string, string[]>): ActionState => {
    return {
        success: false,
        errors: customError
    }
}

const createUser = async (
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> => {
    const rawFormData = Object.fromEntries(
        ["name", "email", "password", "confirmPassword"].map(field => [field, formData.get(field) as string])
    ) as Record<string, string>

    const validatedFields = registerSchema.safeParse(rawFormData)
    if(!validatedFields.success) {
        return handleValidationError(validatedFields.error)
    }
    const existingUser = await prisma.user.findUnique({
        where: {email:rawFormData.email}
    })
    if(existingUser) {
        return handleError({email: ["メールアドレスはすでに使用されています"]})
    }

    const hashedPassword = await bcryptjs.hash(rawFormData.password, 12)
    await prisma.user.create({
        data: {
            name: rawFormData.name,
            email: rawFormData.email,
            password: hashedPassword
        }
    })

    await signIn("credentials", {
       ...Object.fromEntries(formData),
       redirect: false,
    })
    redirect("/dashboard")
}

export default createUser