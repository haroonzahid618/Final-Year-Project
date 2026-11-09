import { Plus, PlusIcon, Sparkles, X } from 'lucide-react';
import React, { useState } from 'react'
import { data } from 'react-router-dom';

const SkillsForm = ({data,onChange}) => {

    const [newSkills,setNewSkills] = useState("");

    const addSkills=()=>{
        if (newSkills.trim() && !data.includes(newSkills.trim())) {
            onChange([...data,newSkills.trim()]);
            setNewSkills("");
            
        }
    }
 
     const removeSkills = (index) => {
        onChange( data.filter((_, i) => i !== index));
    };

    const handleKeyPress=(e)=>{
        if (e.key === "Enter") {
            e.preventDefault();
            addSkills();
            
        }

    }
  return (
    <div className='space-y-4'>
        <div>
            <h3 className='flex items-center gap-2 text-lg font-semibold
            text-gray-900'>Skills</h3>
            <p className='text-gray-500 text-sm'>Add your technical and soft skills</p>
        </div>

        <div className='flex gap-2'>
            <input type="text" placeholder='Enter a Skills...' className='flex-1 px-3 py-2 text-sm'
            onChange={(e)=>{setNewSkills(e.target.value)}} value={newSkills}
            onKeyDown={handleKeyPress} />

            <button onClick={addSkills} disabled={!newSkills.trim()} className='flex items-center gap-2
            px-3 py-2 text-sm bg-blue-600 text-white rounded-lg'>
                <PlusIcon className='size-4'/> Add
            </button>
        </div>

        {data.length > 0 ? (
            <div className='flex flex-wrap gap-2'>
                {data.map((skills,index)=>(
                    <span key={index} className='flex items-center gap-1 px-3 py-1 bg-blue-100
                    text-blue-900 rounded-full text-sm'>
                        {skills}
                        <button onClick={()=>{removeSkills(index)}} className='ml-1 rounded-full
                        p-0.5 hover:bg-blue-200'>
                            <X className='w-3 h-3'/>

                        </button>
                    </span>

                ))}

            </div>
        ):(
            <div className='text-center py-6 text-gray-500'>
                <Sparkles className='w-10 h-10 mx-auto mb-2 text-gray-300'/>
                <p>No skills add yet.</p>
                <p className='text-sm'>Add your technical and soft skills.</p>
            </div>
        )
    }
      
    </div>
  )
}

export default SkillsForm
