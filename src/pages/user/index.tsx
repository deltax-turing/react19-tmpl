import { useParams, useSearchParams } from 'react-router-dom'

const User = () => {
  const { id } = useParams<{ id: string }>()

  const [searchParams] = useSearchParams()
  const name = searchParams.get('name')

  return (
    <div>
      user: {id}, name: {name}
    </div>
  )
}

export default User
