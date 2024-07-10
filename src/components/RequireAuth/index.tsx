import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

const requireAuth = (WrappedComponent: React.FC) => {
  const Wrapper = (props: any) => {
    const router = useRouter()

    const isLogin = useSelector((state: RootState) => state.auth.isLogin)

    useEffect(() => {
      if (!isLogin && router.pathname !== '/') {
        router.push('/login')
      }
    }, [isLogin, router])

    return <WrappedComponent {...props} />
  }

  return Wrapper
}

export default requireAuth
