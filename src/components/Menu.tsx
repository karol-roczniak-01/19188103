import { useState, useEffect } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import useMobile from '../hooks/useMobile'
import { t, getLang } from '../languages'
import type { Language } from '../languages/texts'

const Menu: React.FC = () => {
  const isMobile = useMobile()
  const [selected, setSelected] = useState(0)
  const [lang, setLang] = useState<Language>('en')
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    setLang(getLang())
  }, [])

  useEffect(() => {
    const parts = ['help', '19188103', 'com']
    setEmail(`${parts[0]}@${parts[1]}.${parts[2]}`)
  }, [])

  const options = [
    { label: '53-95',   desc: t('accountDesc'),   href: 'https://5395.19188103.com' },
    { label: '13-3-99', desc: t('directoryDesc'), href: 'https://13399.19188103.com' },
    { label: '9-13-34', desc: t('refuteDesc'),    href: 'https://91334.19188103.com' },
    { label: '5-92-39', desc: t('tendersDesc'),   href: 'https://59239.19188103.com' },
    { label: '1-8-74',  desc: t('docsDesc'),      href: 'https://1874.19188103.com' },
  ]

  const handleSelect = (index: number) => {
    window.location.href = options[index].href
  }

  useHotkeys('down',  (e) => { e.preventDefault(); setSelected((p) => (p + 1) % options.length) })
  useHotkeys('up',    (e) => { e.preventDefault(); setSelected((p) => (p - 1 + options.length) % options.length) })
  useHotkeys('enter', (e) => { e.preventDefault(); handleSelect(selected) })

  return (
    <>
      <p className="border-b-4 border-double pb-2">
        {t('welcome')}
      </p>
      <ul>
        {options.map((option, index) => (
          <li
            key={index}
            onMouseEnter={() => setSelected(index)}
            onClick={() => handleSelect(index)}
            className={!isMobile && selected === index ? 'bg-primary text-background cursor-default' : 'cursor-default'}
          >
            {option.label} · {option.desc}
          </li>
        ))}
      </ul>
      <p className='opacity-70'>
        [Contact] {email ? <a href={`mailto:${email}`}>{email}</a> : ''}
      </p>
    </>
  )
}

export default Menu