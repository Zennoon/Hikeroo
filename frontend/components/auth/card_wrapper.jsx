'use client'

import { Card, CardContent, CardHeader, CardFooter } from '../ui/card'
import AuthHeader from './auth_header'
import BackButton from './back_button'


const CardWrapper = ({ title, backButtonHref, backButtonLabel, children }) => {
  return (
    <Card className='xl:w-1/4 md:w-1/2 shadow-md'>
        <CardHeader>
            <AuthHeader title={ title } />
        </CardHeader>
        <CardContent>
            { children }
        </CardContent>
        <CardFooter>
            <BackButton href={backButtonHref} label={ backButtonLabel }/>
        </CardFooter>
    </Card>
  )
}

export default CardWrapper
