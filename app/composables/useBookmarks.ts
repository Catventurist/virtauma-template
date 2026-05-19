export interface Bookmark {
  path: string
  label: string
}

export function useBookmarks() {
  const bookmarks = ref<Bookmark[]>([])

  function load() {
    bookmarks.value = JSON.parse(localStorage.getItem('bookmarks') || '[]')
  }

  function isBookmarked(path: string) {
    return bookmarks.value.some(b => b.path === path)
  }

  function toggle(path: string, label: string) {
    if (isBookmarked(path)) {
      bookmarks.value = bookmarks.value.filter(b => b.path !== path)
    } else {
      bookmarks.value = [...bookmarks.value, { path, label }]
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks.value))
  }

  function remove(path: string) {
    bookmarks.value = bookmarks.value.filter(b => b.path !== path)
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks.value))
  }

  onMounted(load)

  return { bookmarks, isBookmarked, toggle, remove }
}
