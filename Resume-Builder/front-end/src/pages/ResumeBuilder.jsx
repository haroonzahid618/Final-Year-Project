
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeftIcon, BriefcaseBusinessIcon, ChevronLeft, ChevronRight,
  Download, EyeIcon, EyeOffIcon, FileText, FolderIcon,
  GraduationCapIcon, Share2Icon, Sparkles, User,
  X, QrCode
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import PersonalInfo from '../components/PersonalInfo';
import ResumePreview from '../components/ResumePreview';
import TemplatesSelector from '../components/TemplatesSelector';
import ColorPicker from '../components/ColorPicker';
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm';
import ExperienceForm from '../components/ExperienceForm';
import EducationForm from '../components/EducationForm';
import ProjectForm from '../components/ProjectForm';
import SkillsForm from '../components/SkillsForm';
import { useSelector } from 'react-redux';
import api from '../configs/api';
import toast from 'react-hot-toast';

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector(state => state.auth)

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: '',
    experience: [],
    project: [],
    education: [],
    skills: [],
    template: 'classic', // Fixed typo: temple -> template
    accent_color: '#3B82F6',
    public: false
  });

  const [careerLoading, setCareerLoading] = useState(false);
  const [careerResults, setCareerResults] = useState([]);
  const [showCareerPopup, setShowCareerPopup] = useState(false);
  const [showQRPopup, setShowQRPopup] = useState(false);

  const loadExistingResume = async () => {
    try {
      const { data } = await api.get('/api/resumes/get/' + resumeId, { headers: { Authorization: token } })
      if (data.resume) {
        setResumeData(data.resume)
        document.title = data.resume.title;
      }
    } catch (error) {
      console.log(error.message)
    }
  };

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'summary', name: 'Summary', icon: FileText },
    { id: 'experience', name: 'Experience', icon: BriefcaseBusinessIcon },
    { id: 'education', name: 'Education', icon: GraduationCapIcon },
    { id: 'project', name: 'Project', icon: FolderIcon },
    { id: 'skills', name: 'Skills', icon: Sparkles }
  ];

  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    loadExistingResume();
  }, [resumeId]);

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData();
      formData.append('resumeId', resumeId);
      formData.append('resumeData', JSON.stringify({ public: !resumeData.public }));

      const { data } = await api.put('/api/resumes/update', formData, { headers: { Authorization: token } })
      setResumeData({ ...resumeData, public: !resumeData.public })
      toast.success(data.message)
    } catch (error) {
      console.error('Error saving resume:', error)
    }
  };

  const handleShare = () => {
    const frontendUrl = window.location.href.split('/app/')[0];
    const resumeUrl = frontendUrl + '/view/' + resumeId;

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: 'Check out my resume!' });
    } else {
      alert('Share is not supported in this browser. Link copied or use preview mode.');
    }
  };

  const downloadResume = () => {
    window.print();
  };

  const resumeUrl = `${window.location.origin}/view/${resumeId}`;

  const downloadQRCode = () => {
    const canvas = document.querySelector('#resume-qr-code canvas');

    if (!canvas) {
      toast.error('QR Code not found');
      return;
    }

    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');

    link.href = url;
    link.download = 'My-Resume-QR-Code.png';
    link.click();

    toast.success('QR Code downloaded!');
  };

  const saveResume = async () => {
    try {
      let updatedResumeData = structuredClone(resumeData);

      if (typeof resumeData.personal_info.image === 'object') {
        delete updatedResumeData.personal_info.image
      }
      const formData = new FormData();

      formData.append('resumeId', resumeId);
      formData.append('resumeData', JSON.stringify(updatedResumeData));

      removeBackground && formData.append('removeBackground', 'yes');

      typeof resumeData.personal_info.image === 'object' &&
        formData.append('image', resumeData.personal_info.image);

      const { data } = await api.put(
        '/api/resumes/update',
        formData,
        {
          headers: {
            Authorization: token
          }
        }
      );

      setResumeData(data.resume);
      toast.success(data.message);

    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };


  const analyzeCareer = async () => {
    try {
      setCareerLoading(true);
      setCareerResults([]);

      const { data } = await api.post(
        '/api/ai/career-advisor',
        { resumeData },
        {
          headers: {
            Authorization: token
          }
        }
      );

      setCareerResults(data.recommendations || []);
      setShowCareerPopup(true);
      toast.success('Resume analysis completed!');

    } catch (error) {
      console.error('Resume Advisor Error:', error);
      toast.error(
        error?.response?.data?.message || 'Resume analysis failed'
      );
    } finally {
      setCareerLoading(false);
    }
  };

  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-6'>
        <Link to='/app' className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
          <ArrowLeftIcon className='size-4' />
          <p>Back to Dashboard</p>
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-8'>

          {/* Left side - Form */}
          <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>
              <hr className='absolute right-0 left-0 top-0 border-2 border-gray-200' />

              {/* Fixed Progress Bar Calculation */}
              <hr
                className='absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-500'
                style={{ width: `${(activeSectionIndex / (sections.length - 1)) * 100}%` }}
              />

              <div className='flex justify-between items-center mb-6 border-b border-gray-300 py-3'>
                <div className='flex items-center gap-2'>
                  <TemplatesSelector
                    selectTemplates={resumeData.template}
                    onChange={(template) => {
                      setResumeData(prev => ({ ...prev, template }));
                    }}
                  />
                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) => {
                      setResumeData(prev => ({ ...prev, accent_color: color }));
                    }}
                  />
                </div>
                <div className='flex items-center gap-1'>
                  {activeSectionIndex > 0 && (
                    <button
                      onClick={() => setActiveSectionIndex(prev => Math.max(prev - 1, 0))}
                      className='flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all'
                    >
                      <ChevronLeft className='size-4' /> Previous
                    </button>
                  )}

                  <button
                    onClick={() => setActiveSectionIndex(prev => Math.min(prev + 1, sections.length - 1))}
                    className='flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all disabled:opacity-40'
                    disabled={activeSectionIndex === sections.length - 1}
                  >
                    Next <ChevronRight className='size-4' />
                  </button>
                </div>
              </div>

              {/* Dynamic Active Form Renderer */}
              <div className='space-y-6'>
                {activeSection.id === 'personal' && (
                  <PersonalInfo
                    data={resumeData.personal_info}
                    onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))}
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}

                {activeSection.id === 'summary' && (
                  <ProfessionalSummaryForm
                    data={resumeData.professional_summary}
                    onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))}
                    setResumeData={setResumeData}
                    fullResumeData={resumeData}
                  />
                )}

                {activeSection.id === 'experience' && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))}
                  />
                )}

                {activeSection.id === 'education' && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))}
                  />
                )}

                {activeSection.id === 'project' && (
                  <ProjectForm
                    data={resumeData.project}
                    onChange={(data) => setResumeData(prev => ({ ...prev, project: data }))}
                  />
                )}

                {activeSection.id === 'skills' && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))}
                  />
                )}
              </div>

              <button
                onClick={() => { toast.promise(saveResume, { loading: 'Saving...' }) }}
                className='mt-6 px-4 py-2 text-sm rounded-lg bg-green-100 hover:bg-green-200
                 text-green-700 font-medium transition-all'
              >
                Save Changes
              </button>
            </div>

            {showCareerPopup && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

                <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">

                  {/* Close Button */}
                  <button
                    onClick={() => setShowCareerPopup(false)}
                    className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-red-500"
                  >
                    <X size={22} />
                  </button>

                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    AI Career Advisor
                  </h2>

                  <p className="text-sm text-gray-500 mb-6">
                    Here are your 5 recommended career paths based on your resume.
                  </p>

                  <div className="space-y-4">
                    {careerResults.map((career, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-gray-200 p-4"
                      >
                        <div className="flex justify-between items-center gap-3">
                          <h3 className="font-semibold text-gray-800">
                            {index + 1}. {career.career}
                          </h3>

                          <span className="font-bold text-blue-600">
                            {career.suitability}%
                          </span>
                        </div>

                        <div className="mt-3 h-2 w-full rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-blue-600"
                            style={{
                              width: `${Math.min(100, Math.max(0, Number(career.suitability) || 0))}%`
                            }}
                          />
                        </div>

                        <p className="mt-3 text-sm text-gray-600">
                          {career.reason}
                        </p>

                        <p className="mt-3 text-sm font-semibold text-gray-700">
                          Suitable Job Roles:
                        </p>

                        <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
                          {career.jobRoles?.map((role, i) => (
                            <li key={i}>{role}</li>
                          ))}
                        </ul>

                        {/* Skills to Improve / Learn */}
                        <p className="mt-4 text-sm font-semibold text-gray-700">
                          Skills to Improve / Learn:
                        </p>

                        <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
                          {career.skillsToLearn?.map((skill, i) => (
                            <li key={i}>{skill}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            )}
            {showQRPopup && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">

                  <button
                    onClick={() => setShowQRPopup(false)}
                    className="absolute right-3 top-3 rounded-full p-2 text-gray-500 hover:bg-gray-100"
                  >
                    <X size={22} />
                  </button>

                  <h2 className="mb-2 text-xl font-bold text-gray-800">
                    Resume QR Code
                  </h2>

                  <p className="mb-5 text-sm text-gray-500">
                    Scan this QR Code to view and download your resume.
                  </p>

                  <div id="resume-qr-code" className="flex justify-center">
                    <QRCodeCanvas
                      value={resumeUrl}
                      size={220}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  <button
                    onClick={downloadQRCode}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    <Download size={16} />
                    Download QR Code
                  </button>
                </div>
              </div>
            )}
</div>
            {/* Right side - Live Preview */}
            <div className='lg:col-span-7 max-lg:mt-6'>
              <div className='relative w-full mb-4'>
                <div className='flex flex-wrap items-center justify-end gap-2'>
                  <button
                    disabled={careerLoading}
                    onClick={analyzeCareer}
                    className='flex items-center p-2 px-4 gap-2 text-xs
                  bg-gradient-to-br from-blue-100 to-blue-200
                text-blue-600 rounded-lg ring-blue-300
                  hover:ring font-medium disabled:opacity-50'
                  >
                    <Sparkles className='size-4' />
                    {careerLoading ? 'Analyzing...' : 'AI Resume Analyze'}
                  </button>

                  {resumeData.public && (
                    <button
                      onClick={() => setShowQRPopup(true)}
                      className='flex items-center p-2 px-4 gap-2 text-xs
                    bg-gradient-to-br from-purple-100 to-purple-200
                  text-purple-600 rounded-lg ring-purple-300 hover:ring font-medium'
                    >
                      <QrCode className='size-4' />
                      Generate QR Code
                    </button>
                  )}
                  {resumeData.public && (
                    <button
                      onClick={handleShare}
                      className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring font-medium'
                    >
                      <Share2Icon className='size-4' /> Share
                    </button>
                  )}
                  <button
                    onClick={changeResumeVisibility}
                    className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 rounded-lg ring-purple-300 hover:ring font-medium'
                  >
                    {resumeData.public ? <EyeIcon className='size-4' /> : <EyeOffIcon className='size-4' />}
                    {resumeData.public ? 'Public' : 'Private'}
                  </button>
                  <button
                    onClick={downloadResume}
                    className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring font-medium'
                  >
                    <Download className='size-4' /> Download PDF
                  </button>
                </div>
              </div>

              <ResumePreview
                data={resumeData}
                templates={resumeData.template}
                accentColor={resumeData.accent_color}
              />
            </div>
          </div>
        </div>
      </div>
      );
};

      export default ResumeBuilder;