import { Button, FormControl, Heading, Input, VStack } from '@hope-ui/solid'
import { createForm } from '@felte/solid'
import { validator } from '@felte/validator-yup'
import { string, object } from 'yup'
import toast from 'solid-toast'

const schema = object({
  email: string().email().required(),
  password: string().required()
})

function Login () {
  const { form, errors, isValid } = createForm({
    extend: validator({ schema }),
    onSubmit: async (inputs) => {
      for (const value of Object.values(inputs)) {
        if (!value) return
      }

      try {
        const response = await fetch('http://localhost:8080/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(inputs),
          credentials: 'include'
        })

        if (!response.ok) {
          const error = await response.text()
          toast.error(error)
          return
        }

        const result = await response.json()
        console.log(result)
      } catch (e) {
        console.error(e)
        toast.error('Something went wrong')
      }
    }
  })

  return (
    <VStack as='form' ref={form} alignSelf='center' borderRadius='25px' maxW='400px' h='max-content' mx='auto' mb='10%' spacing='17px' p='45px' backgroundColor='rgba(245, 245, 245, 0.9)'>
      <Heading size='2xl' color='$neutral12'>Login</Heading>
      <FormControl required invalid={!!errors.email}>
        <Input border='1px solid $neutral10' type='email' name='email' placeholder='Email' />
      </FormControl>
      <FormControl required invalid={!!errors.password}>
        <Input border='1px solid $neutral10' type='password' name='password' placeholder='Password' />
      </FormControl>
      <Button type='submit' disabled={!isValid()}>Login</Button>
    </VStack>
  )
}

export default Login
