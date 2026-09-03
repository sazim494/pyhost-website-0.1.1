import React, { useState } from 'react'
import axios from 'axios'

type Step = 1|2|3|4|5

export default function ProjectCreateWizard(){
  const [step,setStep] = useState<Step>(1)
  const [form, setForm] = useState({
    name: '',
    runtime: 'python',
    region: 'us-east-1',
    start_command: 'python main.py'
  })
  const api = (path: string) => `${import.meta.env.VITE_API_BASE || 'http://localhost:8000/api/v1'}${path}`

  async function submit(){
    try{
      const res = await axios.post(api('/projects'), form)
      alert('Project created: ' + res.data.id)
    }catch(e:any){
      alert('Error: ' + (e?.response?.data?.message || e.message))
    }
  }

  return (
    <div className="bg-[#0f1724] p-6 rounded-lg shadow">
      <div className="mb-4">
        <div className="text-sm text-[#94a3b8]">Step {step} of 5</div>
        <h2 className="text-xl mt-2">Create Project</h2>
      </div>

      {step === 1 && (
        <div>
          <label className="block mb-2">Project name</label>
          <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full p-2 rounded bg-[#0b1220] border" />
          <div className="mt-4">
            <button onClick={()=>setStep(2)} className="px-4 py-2 bg-accent rounded">Next</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <label className="block mb-2">Runtime</label>
          <select value={form.runtime} onChange={e=>setForm({...form,runtime:e.target.value})} className="w-full p-2 rounded bg-[#0b1220] border">
            <option value="python">Python</option>
            <option value="node">Node.js (coming soon)</option>
            <option value="php">PHP (coming soon)</option>
          </select>
          <div className="mt-4">
            <button onClick={()=>setStep(1)} className="px-4 py-2 mr-2 border rounded">Back</button>
            <button onClick={()=>setStep(3)} className="px-4 py-2 bg-accent rounded">Next</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <label className="block mb-2">Region</label>
          <select value={form.region} onChange={e=>setForm({...form,region:e.target.value})} className="w-full p-2 rounded bg-[#0b1220] border">
            <option value="us-east-1">US East (N. Virginia)</option>
            <option value="eu-west-1">EU West</option>
          </select>
          <div className="mt-4">
            <button onClick={()=>setStep(2)} className="px-4 py-2 mr-2 border rounded">Back</button>
            <button onClick={()=>setStep(4)} className="px-4 py-2 bg-accent rounded">Next</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <label className="block mb-2">Start command</label>
          <input value={form.start_command} onChange={e=>setForm({...form,start_command:e.target.value})} className="w-full p-2 rounded bg-[#0b1220] border" />
          <div className="mt-4">
            <button onClick={()=>setStep(3)} className="px-4 py-2 mr-2 border rounded">Back</button>
            <button onClick={()=>setStep(5)} className="px-4 py-2 bg-accent rounded">Next</button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div>
          <h3 className="mb-2">Review</h3>
          <pre className="bg-[#06101b] p-4 rounded">{JSON.stringify(form,null,2)}</pre>
          <div className="mt-4">
            <button onClick={()=>setStep(4)} className="px-4 py-2 mr-2 border rounded">Back</button>
            <button onClick={submit} className="px-4 py-2 bg-accent rounded">Create Project</button>
          </div>
        </div>
      )}
    </div>
  )
}
