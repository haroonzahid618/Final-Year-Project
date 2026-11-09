import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { dummyResumeData } from '../assets/assets';
import ResumePreview from '../components/ResumePreview';
import Loader from '../../Loader'; // Adjust path if needed
import { ArrowLeftIcon, Download } from 'lucide-react';
import api from '../configs/api';

const Preview = () => {
  const { resumeId } = useParams(); // Fixed: Added parentheses ()

  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);

  const loadResume = async () => {
    // Find resume by ID
    try {
      const { data } = await api.get('/api/resumes/public/' + resumeId)
      setResumeData(data.resume)
    } catch (error) {
      console.log(error.message)
    }
    finally {
      setIsLoading(false);
    }

  };

  const downloadPDF = () => {
    window.print();
  };

  useEffect(() => {
    loadResume();
  }, [resumeId]);

  return resumeData ? (
    <div className='bg-slate-100 min-h-screen py-10'>
      <div className='max-w-3xl mx-auto'>
        <div className="flex justify-end mb-4 print:hidden">
          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Download size={18} />
            Download PDF
          </button>
        </div>
        <ResumePreview
          data={resumeData}
          templates={resumeData.template || 'classic'} // Fixed typo: temple -> template
          accentColor={resumeData.accent_color}
        />
      </div>
    </div>
  ) : (
    <div>
      {isLoading ? <Loader /> : (
        <div className='flex flex-col items-center justify-center h-screen'>
          <p className='text-center text-5xl text-slate-400 font-medium'>Resume not found</p>
          <a href="/" className='mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full
          px-6 h-10 flex items-center shadow-sm transition-all'>
            <ArrowLeftIcon className='mr-2 size-4' />
            Go to Home Page
          </a>
        </div>
      )}
    </div>
  );
};

export default Preview;
