import { FilePenLineIcon, LoaderCircleIcon, PencilIcon, PlusIcon, Trash2Icon, UploadCloudIcon, UploadIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { dummyResumeData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import api from '../configs/api';
import toast from 'react-hot-toast';
import pdfToText from 'react-pdftotext';
import { useSelector } from 'react-redux';

const Dashboard = () => {

  const {user, token} = useSelector(state => state.auth)

  const colors = [
    "from-blue-200 to-blue-300",
    "from-purple-200 to-purple-300",
    "from-green-200 to-green-300",
    "from-pink-200 to-pink-300",
    "from-orange-200 to-orange-300"
  ];

  const [allResume, setAllResume] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState('');
  const [resume,setResume] = useState(null);
  const [editResumeId,setEditResumeId] = useState('');
  const [isloading, setIsloading] = useState(false)

  const navigate = useNavigate();

  const loadAllResume = async () => {
    try {
      const {data} = await api.get('/api/users/resumes', {headers:{Authorization : token}})
      setAllResume(data.resumes)
    } catch (error) {
       toast.error(error?.response?.data?.message || error.message)
    }
  }

  const createResume = async (event) => {
   try { 
    event.preventDefault()
    const {data} = await api.post('/api/resumes/create', {title}, {headers: {Authorization : token}})
    setAllResume([...allResume, data.resume])
    setTitle('')
    setShowCreateResume(false)
    navigate(`/app/builder/${data.resume._id}`)
   } catch (error) {
    toast.error(error?.response?.data?.message || error.message)
   }
  }

  const uploadResume = async (event) => {
    event.preventDefault()
    setIsloading(true)
    try {
      const resumeText = await pdfToText(resume)
      const {data} = await api.post('/api/ai/upload-resume', {title, resumeText}, {headers:{Authorization : token}})
      setTitle('')
      setResume(null)
      setShowUploadResume(false)
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    finally{
      setIsloading(false)
    }
  }
  const editTitle = async (event) => {
     try {
      event.preventDefault()
      const {data} = await api.put('/api/resumes/update', {resumeId: editResumeId, resumeData: {title}}, {headers:{Authorization : token}})
      setAllResume(allResume.map(resume => resume._id === editResumeId ?{...resume, title} : resume))
      setTitle('')
      setEditResumeId('')
      toast.success(data.message)
     } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
     }

  }
  const deleteResume = async (resumeId) => {
     try {
      const confirm = window.confirm('Are you sure you want to delete this resume?');
     if(confirm){
      const {data} = await api.delete(`/api/resumes/delete/${resumeId}`, {headers:{Authorization : token}})
      setAllResume(allResume.filter(resume => resume._id !== resumeId))
      toast.success(data.message)
     }
     } catch (error) {
       toast.error(error?.response?.data?.message || error.message)
     }

  }

  useEffect(() => {
   loadAllResume();
  }, [])

  return (
    <div className='mx-10'>
      <div className='max-w-7xl mx-10 px-4 py-8'>
        <p className='text-2xl font-medium  bg-gradient-to-r from-slate-600 to-slate-700
      bg-clip-text text-transparent sm:hidden'>Welocome, Haroon</p>
      </div>

      <div className='flex mr-5 gap-4'>
        <button onClick={() => setShowCreateResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center
          justify-center rounded-lg gap-2 text-slate-600 border border-dashed
          border-slate-300 group hover:border-indigo-500 transition-all
          duration-300 cursor-pointer'>
          <PlusIcon className='size-11 transition-all duration-300 p-2.5
          bg-gradient-to-r from-indigo-300 to-indigo-500 rounded-full text-white' />
          <p className='text-sm group-hover:text-indigo-600 transition-all duration-300'>Create Resume</p>
        </button>
        <button onClick={() => setShowUploadResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center
          justify-center rounded-lg gap-2 text-slate-600 border border-dashed
          border-slate-300 group hover:border-purple-500 transition-all
          duration-300 cursor-pointer'>
          <UploadIcon className='size-11 transition-all duration-300 p-2.5
          bg-gradient-to-r from-purple-300 to-purple-500 rounded-full text-white' />
          <p className='text-sm group-hover:text-indigo-600 transition-all duration-300'>Upload Existing</p>
        </button>
      </div>

      <hr className='border-slate-300 my-6 sm:w-[305px]' />
      <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
        {allResume.map((resume, index) =>{
          const baseColor = colors[index % colors.length];
          return (
            <button key={index} onClick={()=>navigate(`/app/builder/${resume._id}`)}  className={`relative w-full sm:max-w-36 h-48 flex flex-col items-center
              justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300
              cursor-pointer bg-gradient-to-r ${baseColor}`}>
              <FilePenLineIcon className='size-7 group-hover:scale-105
                transition-all'/>
              <p className='text-sm group-hover:scale-105 transition-all px-2 text-center'>{resume.title}</p>
              <p className='absolute bottom-1 text-[11px] text-slate-500
                group-hover:text-slate-700 transition-all duration-300 px-2 text-center'
              >Update on {new Date(resume.updatedAt).toLocaleDateString()}</p>
              <div onClick={(e)=> e.stopPropagation()} className='absolute top-1 right-1 group-hover:flex items-center hidden'>
                <Trash2Icon onClick={()=>deleteResume(resume._id)} className='size-7 p-1.5 hover:bg-white/50 rounded
                  text-slate-800 transition-colors'/>
                <PencilIcon onClick={()=>{setEditResumeId(resume._id); setTitle(resume.title)}} className='size-7 p-1.5 hover:bg-white/50 rounded
                  text-slate-800 transition-colors'/>
              </div>
            </button>
          )
        })}
      </div>

      {showCreateResume && (
        <form onSubmit={createResume}>
          <div className="fixed inset-0 flex items-center justify-center bg-black/40">
            <div className="relative bg-white p-6 rounded-lg w-80">
              <h2 className="text-lg font-semibold mb-4">
                Create Resume
              </h2>

              <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" 
              placeholder="Enter resume title" className="w-full border p-2 rounded mb-4" required />

              <div className="flex justify-center">
                <button className="px-10 py-1 bg-green-500 hover:bg-green-600 text-white  transition-all duration-300 rounded">
                  Create Resume
                </button>
              </div>
              <XIcon onClick={() => { setShowCreateResume(false) }} className='absolute top-[26px] right-4 text-slate-500 hover:text-slate-600 cursor-pointer' />
            </div>
          </div>
        </form>
      )}

      {showUploadResume && (
        <form onSubmit={uploadResume}>
          <div className="fixed inset-0 flex items-center justify-center bg-black/40">
            <div className="relative bg-white p-6 rounded-lg w-80">
              <h2 className="text-lg font-semibold mb-4">
                Upload Resume
              </h2>

              <input onChange={(e) => setTitle(e.target.value)} value={title} 
              type="text" placeholder="Enter resume title" 
              className="w-full border p-2 rounded mb-4" required />
              <div>
                <label htmlFor="resume-input" className='block text-sm text-slate-700' >
                  Select resume file
                  <div className='flex flex-col items-center justify-center gap-2
                border text-slate-400 border-slate-400 rounded-md 
                p-4 py-10 my-4 hover:text-green-700'>
                  {
                    resume ? (
                      <p className='text-green-700'>{resume.name}</p>
                    ) : (
                      <>
                      <UploadCloudIcon className='size-14 stroke-1'/>
                      <p>Upload resume</p>
                      </>
                    )
                  }

                  </div>
                </label>
                <input type="file" id='resume-input' accept='.pdf' hidden 
                onChange={(e)=>{setResume(e.target.files[0])}} />
              </div>


              <div className="flex justify-center">
                <button disabled={isloading} className="px-10 py-1 bg-green-500 hover:bg-green-600 text-white duration-300 rounded transition-colors flex justify-center items-center gap-2">
                  {isloading && <LoaderCircleIcon className='animate-spin size-4 text-white' />}
                  {isloading ? 'Uploading...' : 'Upload Resume'}

                </button>
              </div>
              <XIcon onClick={() => { setShowUploadResume(false) }} className='absolute top-[26px] right-4 text-slate-500 hover:text-slate-600 cursor-pointer' />
            </div>
          </div>
        </form>
      )}

      {editResumeId && (
        <form onSubmit={editTitle}>
          <div className="fixed inset-0 flex items-center justify-center bg-black/40">
            <div className="relative bg-white p-6 rounded-lg w-80">
              <h2 className="text-lg font-semibold mb-4">
                Create Resume
              </h2>

              <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" 
              placeholder="Enter resume title" className="w-full border p-2 rounded mb-4" required />

              <div className="flex justify-center">
                <button className="px-10 py-1 bg-green-500 hover:bg-green-600 text-white  transition-all duration-300 rounded">
                  Updated
                </button>
              </div>
              <XIcon onClick={() => { setEditResumeId('') }} className='absolute top-[26px] right-4 text-slate-500 hover:text-slate-600 cursor-pointer' />
            </div>
          </div>
        </form>
      )}

    </div>
  )
}

export default Dashboard
