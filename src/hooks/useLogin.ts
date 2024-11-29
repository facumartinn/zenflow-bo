/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  rememberMe: z.boolean()
})

type LoginForm = z.infer<typeof loginSchema>

export const useLoginForm = () => {
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
    rememberMe: false
  })

  const [errors, setErrors] = useState<Partial<LoginForm>>({})

  const validateField = (name: keyof LoginForm, value: string | boolean) => {
    try {
      loginSchema.shape[name].parse(value)
      setErrors((prev: any) => ({ ...prev, [name]: undefined }))
      return true
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        setErrors((prev: any) => ({ ...prev, [name]: error.errors[0].message }))
      }
      return false
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value

    validateField(name as keyof LoginForm, newValue)
    setForm((prev: any) => ({ ...prev, [name]: newValue }))
  }

  const isValid = !errors.email && !errors.password && form.email && form.password

  return {
    form,
    errors,
    handleChange,
    isValid
  }
}
