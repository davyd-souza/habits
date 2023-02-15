// DEPENDENCY
import React from 'react'
import './lib/dayjs'

// COMPONENT
import { Header } from './components/Header'
import { SummaryTable } from './components/SummaryTable'

// STYLE
import './styles/global.css'

export function App() {
  return (
    <div className='w-screen min-h-screen grid place-items-center'>
      <div className='w-full max-w-5xl px-6 grid gap-16'>
        <Header />
        <SummaryTable />
      </div>
    </div>
  )
}
