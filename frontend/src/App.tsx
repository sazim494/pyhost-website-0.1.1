import React from 'react'
import ProjectCreateWizard from './pages/ProjectCreateWizard'

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b1020] text-white font-sans">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl mb-4">PyHost Cloud — Dashboard (dev)</h1>
        <ProjectCreateWizard />
      </div>
    </div>
  )
}
