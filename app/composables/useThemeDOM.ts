export function useThemeDOM() {
  function applyRadius(value: number) {
    document.documentElement.style.setProperty('--ui-radius', `${value}rem`)
  }

  function applyFont(name: string) {
    let link = document.getElementById('dynamic-font') as HTMLLinkElement | null
    if (!link) {
      link = document.createElement('link')
      link.id = 'dynamic-font'
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }
    const family = name.toLowerCase().replace(/ /g, '-')
    link.href = `https://fonts.bunny.net/css?family=${family}:400,500,600,700&display=swap`
    document.documentElement.style.setProperty('--font-sans', `'${name}', sans-serif`)
  }

  return { applyRadius, applyFont }
}
