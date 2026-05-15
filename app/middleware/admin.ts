export default defineNuxtRouteMiddleware(async () => {
  const { isAdmin, fetchUser } = useAuth()
  if (!isAdmin.value) await fetchUser()
  if (!isAdmin.value) return navigateTo('/')
})
