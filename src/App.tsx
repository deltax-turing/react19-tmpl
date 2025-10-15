import { useTranslation } from 'react-i18next'

export default function App() {
  const { t, i18n } = useTranslation()

  return (
    <div>
      <h1>{t('title')}</h1>
      <button onClick={() => i18n.changeLanguage('en')}>English</button>
      <button onClick={() => i18n.changeLanguage('ko')}>한국어</button>
    </div>
  )
}
