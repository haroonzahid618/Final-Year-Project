
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FileText, Sparkles } from 'lucide-react';
import api from '../configs/api';
import toast from 'react-hot-toast';

const AIAdvisor = () => {

    const { token } = useSelector(state => state.auth);

    const [resumes, setResumes] = useState([]);
    const [selectedResume, setSelectedResume] = useState('');

    const loadResumes = async () => {
        try {
            const { data } = await api.get('/api/users/resumes', {
                headers: { Authorization: token }
            });

            setResumes(data.resumes);

        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        loadResumes();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <div className="max-w-3xl mx-auto">

                <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="text-blue-600" size={30} />

                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            AI Career Advisor
                        </h1>

                        <p className="text-gray-500">
                            Find the best career according to your resume.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">

                    <h2 className="text-xl font-semibold mb-4">
                        Select Your Resume
                    </h2>

                    <div className="flex items-center gap-2 border rounded-lg px-3">
                        <FileText className="text-gray-400" />

                        <select
                            value={selectedResume}
                            onChange={(e) => setSelectedResume(e.target.value)}
                            className="w-full p-3 outline-none"
                        >
                            <option value="">Choose your resume</option>

                            {resumes.map((resume) => (
                                <option key={resume._id} value={resume._id}>
                                    {resume.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        disabled={!selectedResume}
                        onClick={() => console.log(selectedResume)}
                        className="w-full mt-5 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        <Sparkles size={18} className="inline mr-2" />
                        Analyze My Career
                    </button>

                </div>

            </div>

        </div>
    );
};

export default AIAdvisor;
