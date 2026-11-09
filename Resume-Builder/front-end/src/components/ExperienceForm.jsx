import { BriefcaseBusiness, Loader2, PlusIcon, Sparkles, Trash, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import api from '../configs/api'

const ExperienceForm = ({ data, onChange }) => {

    const {token} = useSelector(state => state.auth)
    const [generatingIndex, setgeneratingIndex] = useState(-1);
    const addExperience = () => {
        const newExperience = {
            company: '',
            position: '',
            start_date: '',
            end_date: '',
            description: '',
            is_current: false
        };
        onChange([...data, newExperience]);
    }

    const removeExperience = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    };
    const updateExperience = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }

    const generateJobDescription = async (index) => {
        setgeneratingIndex(index)
        const experience = data[index];
        const prompt = `enhance this job description ${experience.description} for the position of ${experience.position}
        at ${experience.company}.`
        try {
            const {data} = await api.post('/api/ai/job-des', {userContent: prompt}, {headers:{Authorization: token}})
            updateExperience(index, 'description', data.enhancedContent)
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to enhance job description")
        }
        finally{
            setgeneratingIndex(-1);
        }

        
    }
    return (
        <div className='space-y-4'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='flex items-center gap-2 text-lg text-gray-900 font-semibold'>
                        Professional Experience
                    </h3>
                    <p className='text-sm text-gray-500'>Add your job experience</p>
                </div>
                <button onClick={addExperience} className='flex items-center gap-2 px-3 
                py-1 text-sm rounded bg-green-100 hover:bg-green-200 text-green-700'>
                    <PlusIcon className='size-4' />
                    Add Experience</button>
            </div>
            {data.length === 0 ? (
                <div className='text-center py-8 text-gray-500'>
                    <BriefcaseBusiness className='w-12 h-12 mx-auto mb-3 text-gray-300' />
                    <p>No work experience added yet.</p>
                    <p className='text-sm'>Click "Add Experience" to get started.</p>
                </div>
            ) : (
                <div className='space-y-4'>
                    {data.map((experience, index) => (
                        <div key={index} className='p-4 border border-gray-300 rounded-lg 
                    space-y-3'>
                            <div className='flex justify-between items-start'>
                                <h4>Experience # {index + 1}</h4>
                                <button onClick={()=> removeExperience(index)} className='text-red-500 hover:text-red-700 
                                transition-colors'>
                                    <Trash2 className='size-4' />
                                </button>
                            </div>
                            <div className='grid md:grid-cols-2 gap-3'>
                                <input value={experience.company || ""} onChange={(e)=>{
                                    updateExperience(index,"company", e.target.value )
                                }} type='text' placeholder='Company Name' className='px-3 py-2
                                 rounded-lg text-sm border border-gray-200' />

                                <input value={experience.position || ""} onChange={(e)=>{
                                    updateExperience(index,"position", e.target.value )
                                }} type='text' placeholder='Job Title' className='px-3 py-2
                                 rounded-lg text-sm border border-gray-200' />

                                <input value={experience.start_date || ""} onChange={(e)=>{
                                    updateExperience(index,"start_date", e.target.value )
                                }} type='month' className='px-3 py-2 rounded-lg text-sm
                                 border border-gray-200' />

                                <input value={experience.end_date || ""} onChange={(e)=>{
                                    updateExperience(index,"end_date", e.target.value )
                                }} type='month' disabled={experience.is_current} className='px-3 py-2
                                 rounded-lg text-sm disabled:bg-gray-100 border border-gray-200' />

                            </div>
                            <label className='flex items-center gap-2'>
                                <input type="checkbox" checked={experience.is_current || false}
                                onChange={(e)=>{updateExperience(index ,"is_current",
                                    e.target.checked ? true
                                    : false
                                )}} className='rounded border-gray-300 text-blue-600' />
                                <span className='text-sm text-gray-700'>Currently working here</span>
                            </label>
                            <div className='space-y-2'>
                                <div className='flex items-center justify-between'>
                                    <h3 className='text-sm text-gray-700
                                     font-medium'>Job Description</h3>
                                     <button onClick={()=>{generateJobDescription(index)}}
                                     disabled={generatingIndex === index || !experience.position || !experience.company}
                                     className='flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700
                                     rounded hover:bg-purple-200 transition-colors disabled:opacity-50'>
                                        {generatingIndex === index ?
                                        (<Loader2 className='w-3 h-3 animate-spin'/>)
                                        : (<Sparkles className='w-3 h-3'/>)
                                    }
                                    AI Enhance
                                     </button>
                                </div>
                                <textarea value={experience.description || ""} onChange={(e)=>{
                                    updateExperience(index,"description",e.target.value)
                                }} rows={4} className='w-full text-sm px-3 py-2 rounded-lg
                                resize-none border border-gray-200' placeholder='Describe your key responsibilities and achievement...'/>

                            </div>
                        </div>
                    ))}
                </div>
            )
            }

        </div>
    )
}

export default ExperienceForm
