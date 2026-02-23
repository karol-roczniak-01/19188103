import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

interface MenuItem {
  label: string
  desc: string
  href: string
}

const options: MenuItem[] = [
  { label: 'Site One', desc: '', href: 'https://example.com' },
  { label: 'Site Two', desc: '', href: 'https://example.org' },
]

const Menu: React.FC = () => {
  const [selected, setSelected] = useState(0)

  const handleSelect = (index: number) => {
    window.location.href = options[index].href
  }

  useHotkeys('down', (e) => {
    e.preventDefault()
    setSelected((prev) => (prev + 1) % options.length)
  })

  useHotkeys('up', (e) => {
    e.preventDefault()
    setSelected((prev) => (prev - 1 + options.length) % options.length)
  })

  useHotkeys('enter', (e) => {
    e.preventDefault()
    handleSelect(selected)
  })

  return (
    <ul>
      {options.map((option, index) => (
        <li
          key={index}
          onMouseEnter={() => setSelected(index)}
          onClick={() => handleSelect(index)}
          className={selected === index ? 'bg-primary text-background cursor-default' : ''}
        >
          {option.label}
        </li>
      ))}
    </ul>
  )
}

export default Menu