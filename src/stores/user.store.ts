import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools, persist } from 'zustand/middleware'

interface Todo {
  id: string
  text: string
  completed: boolean
}

interface User {
  id: string
  name: string
  age: number
  address: {
    city: string
    country: string
    zipCode: string
  }
  todos: Todo[]
}

interface PersistedState {
  users: Record<string, User>
}

interface TemporaryState {
  currentUserId: string | null
  currentFilter: string
  isLoading: boolean
}

interface UserState extends PersistedState, TemporaryState {
  addUser: (user: User) => void
  updateUserName: (id: string, name: string) => void
  updateUserAge: (id: string, age: number) => void
  updateUserCity: (id: string, city: string) => void
  addTodo: (userId: string, todo: Todo) => void
  toggleTodo: (userId: string, todoId: string) => void
  deleteTodo: (userId: string, todoId: string) => void
  setCurrentUser: (id: string) => void
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      immer<UserState>(set => ({
        // 持久化的数据
        users: {},

        // 临时数据（不会被持久化）
        currentUserId: null,
        currentFilter: 'all',
        isLoading: false,

        addUser: user =>
          set(state => {
            state.users[user.id] = user
            console.log('Added user with immer')
          }),

        updateUserName: (id, name) =>
          set(state => {
            if (state.users[id]) {
              state.users[id].name = name
              console.log('Updated name with immer')
            }
          }),

        updateUserAge: (id, age) =>
          set(state => {
            if (state.users[id]) {
              state.users[id].age = age
            }
          }),

        updateUserCity: (id, city) =>
          set(state => {
            if (state.users[id]) {
              state.users[id].address.city = city
              console.log('Updated city with immer (nested object)')
            }
          }),

        addTodo: (userId, todo) =>
          set(state => {
            if (state.users[userId]) {
              state.users[userId].todos.push(todo)
              console.log('Added todo with immer (array push)')
            }
          }),

        toggleTodo: (userId, todoId) =>
          set(state => {
            const user = state.users[userId]
            if (user) {
              const todo = user.todos.find(t => t.id === todoId)
              if (todo) {
                todo.completed = !todo.completed
                console.log('Toggled todo with immer')
              }
            }
          }),

        deleteTodo: (userId, todoId) =>
          set(state => {
            const user = state.users[userId]
            if (user) {
              user.todos = user.todos.filter(t => t.id !== todoId)
              console.log('Deleted todo with immer')
            }
          }),

        setCurrentUser: id =>
          set(state => {
            state.currentUserId = id
          }),
      })),
      {
        name: 'user-storage',
        partialize: (state): PersistedState => ({
          users: state.users,
        }),
      }
    ),
    { name: 'UserStore' }
  )
)
