import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import useMobile from '../hooks/useMobile'

interface MenuItem {
  label: string
  desc: string
  href: string
}

const options: MenuItem[] = [
  { label: '53-95', desc: 'Manage your account...', href: 'https://5395.19188103.com' },
  { label: '5-92-39', desc: 'AI-powered tender platform...', href: 'https://5395.19188103.com' },
]

const Menu: React.FC = () => {
  const isMobile = useMobile()
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
          className={!isMobile && selected === index ? 'bg-primary text-background cursor-default' : ''}
        >
          {option.label} · {option.desc}
        </li>
      ))}
    </ul>
  )
}

export default Menu