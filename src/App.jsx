import { Flex, HopeProvider } from '@hope-ui/solid'
import Login from './userValidation/Login'
import { Toaster } from 'solid-toast'

function App () {
  return (
    <>
      <HopeProvider>
        <Flex w='100vw' h='100vh' css={{ backgroundImage: 'url(https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?cs=srgb&dl=pexels-joyston-judah-933054.jpg)', backgroundSize: 'cover' }}>
          <Login />
        </Flex>
      </HopeProvider>
      <Toaster position='top-center' />
    </>
  )
}

export default App
