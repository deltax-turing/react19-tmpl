import { useNavigate } from 'react-router'
import { useUserStore } from '@/stores/user.store'

const ESSComp = () => {
  const navigate = useNavigate()

  const users = useUserStore((state) => state.users)
  const currentUserId = useUserStore((state) => state.currentUserId)
  const addUser = useUserStore((state) => state.addUser)
  const updateUserCity = useUserStore((state) => state.updateUserCity)
  const updateUserName = useUserStore((state) => state.updateUserName)
  const addTodo = useUserStore((state) => state.addTodo)
  const toggleTodo = useUserStore((state) => state.toggleTodo)
  const deleteTodo = useUserStore((state) => state.deleteTodo)
  const setCurrentUser = useUserStore((state) => state.setCurrentUser)

  const currentUser = currentUserId ? users[currentUserId] : null

  const handleAddUser = () => {
    const newUser = {
      id: Date.now().toString(),
      name: 'John Doe',
      age: 25,
      address: {
        city: 'New York',
        country: 'USA',
        zipCode: '10001',
      },
      todos: [],
    }
    addUser(newUser)
    setCurrentUser(newUser.id)
    console.log('User added:', newUser)
  }

  const handleUpdateCity = () => {
    if (currentUserId) {
      updateUserCity(currentUserId, 'Los Angeles')
      console.log('City updated to Los Angeles')
    }
  }

  const handleAddTodo = () => {
    if (currentUserId && currentUser) {
      const newTodo = {
        id: Date.now().toString(),
        text: `Todo ${currentUser.todos.length + 1}`,
        completed: false,
      }
      addTodo(currentUserId, newTodo)
      console.log('Todo added:', newTodo)
    }
  }

  const handleToggleTodo = (todoId: string) => {
    if (currentUserId) {
      toggleTodo(currentUserId, todoId)
      console.log('Todo toggled:', todoId)
    }
  }

  return (
    <div className="h-full w-full bg-amber-300 p-8">
      <h1 className="mb-4 text-2xl font-bold">Immer Test</h1>
      <button
        onClick={() => navigate('/about/ai')}
        className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        go AI
      </button>

      <div className="space-y-4">
        <button onClick={handleAddUser} className="rounded bg-green-500 px-4 py-2 text-white">
          Add User
        </button>

        {currentUser && (
          <div className="rounded bg-white p-4 shadow">
            <h2 className="mb-2 text-xl font-bold">Current User</h2>
            <p>Name: {currentUser.name}</p>
            <p>Age: {currentUser.age}</p>
            <p>
              Address: {currentUser.address.city}, {currentUser.address.country}
            </p>

            <div className="mt-4 space-x-2">
              <button
                onClick={handleUpdateCity}
                className="rounded bg-purple-500 px-4 py-2 text-white"
              >
                Update City (Deep Nested)
              </button>
              <button
                onClick={() => updateUserName(currentUserId!, 'Jane Smith')}
                className="rounded bg-orange-500 px-4 py-2 text-white"
              >
                Update Name
              </button>
              <button
                onClick={handleAddTodo}
                className="rounded bg-indigo-500 px-4 py-2 text-white"
              >
                Add Todo
              </button>
            </div>

            <div className="mt-4">
              <h3 className="mb-2 font-bold">Todos:</h3>
              {currentUser.todos.length === 0 ? (
                <p className="text-gray-500">No todos yet</p>
              ) : (
                <ul className="space-y-2">
                  {currentUser.todos.map((todo) => (
                    <li
                      key={todo.id}
                      className="flex cursor-pointer items-center gap-2"
                      onClick={() => handleToggleTodo(todo.id)}
                    >
                      <input type="checkbox" checked={todo.completed} readOnly />
                      <span className={todo.completed ? 'line-through' : ''}>{todo.text}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteTodo(currentUserId!, todo.id)
                        }}
                        className="ml-auto rounded bg-red-500 px-2 py-1 text-sm text-white"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ESSComp
