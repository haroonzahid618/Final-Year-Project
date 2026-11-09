import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api';
import toast from 'react-hot-toast';
import { Loader2, Sparkle } from 'lucide-react';

const ProfessionalSummaryForm = ({data,onChange,setResumeData}) => {

    const {token} = useSelector(state => state.auth)
    const [isgenerating, setIsgenerating] = useState(false);

    const generatingSummary = async () => {
        try {
            setIsgenerating(true);
            const prompt = `enhance my professional summary "${data}"`;
            const response = await api.post('/api/ai/enhance-sum', {userContent: prompt}, {headers:{Authorization: token}})
            setResumeData(prev => ({...prev, professional_summary: response.data.enhancedContent}))
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
        finally{
            setIsgenerating(false)
        }
        
    }
  return (
    <div className='space-y-4'>
        <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex items-center gap-2 text-lg text-gray-900 font-semibold'>
                    Professional Summary
                </h3>
                <p className='text-sm text-gray-500'>Add summary for your resume here</p>
            </div>
            <button disabled={isgenerating} onClick={generatingSummary} className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded
             hover:bg-purple-200 transition-colors disabled:opacity-50'>
                {isgenerating ? (<Loader2 className='animate-spin size-4' />): (
                    <Sparkle className='size-4'/> )}
                    {isgenerating ? 'Enhancing...': 'AI Enhance'}
                    
            </button>
        </div>
        <div className='mt-6'>
            <textarea value={data || ''} onChange={(e)=>{onChange(e.target.value)}} rows={7}
                className='w-full p-3 px-4 mt-2 border text-sm border-gray-300
                rounded-lg hover:border-green-500 outline-none resize-none'
                 placeholder='Write a professional summary that highlight your key strengths and career objectives...'/>
                <p className='text-sm text-gray-500 text-center'>
                    Tip: Keep it concise (3,4 sentence) and focus on your most relvent achievement and
                    skill.
                </p>
            </div>
      
    </div>
  )
}

export default ProfessionalSummaryForm
