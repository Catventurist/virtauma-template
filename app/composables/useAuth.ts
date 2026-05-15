export const useAuth = () => {
  const user = useState('user', () => null as User | null)
  const token = useCookie('auth-token', { maxAge: 60 * 60 * 24 * 7 })

  interface User {
    id: string
    username: string
    email: string
    avatar?: string
    role: 'admin' | 'member' | 'guest'
  }

  const mockUsers = [
    {
      id: '1',
      username: 'admin',
      email: 'admin@example.com',
      role: 'admin' as const,
      avatar: '/catbirchdark.webp'
    },
    {
      id: '2',
      username: 'member',
      email: 'member@example.com',
      role: 'member' as const,
      avatar: '/catbirch.webp'
    }
  ]

  async function login(email: string, password: string) {
    await new Promise(r => setTimeout(r, 500))

    const found = mockUsers.find(u => u.email === email)
    if (!found || password !== 'password') {
      throw new Error('Invalid credentials')
    }

    user.value = found
    token.value = `mock-token-${found.id}`
    return user.value
  }

  async function logout() {
    user.value = null
    token.value = null
    await navigateTo('/')
  }

  async function fetchUser() {
    // Later: replace with $fetch('/api/auth/me')
    if (!token.value) return null
    const id = token.value.replace('mock-token-', '')
    user.value = mockUsers.find(u => u.id === id) ?? null
    return user.value
  }

  const isLoggedIn = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isMember = computed(() => user.value?.role === 'member' || isAdmin.value)

  return {
    user,
    isLoggedIn,
    isAdmin,
    isMember,
    login,
    logout,
    fetchUser
  }
}
