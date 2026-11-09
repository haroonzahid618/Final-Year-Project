import React from 'react';

const AtsTemplate = ({ data }) => {
  const {
    personal_info = {},
    professional_summary = "",
    skills = [],
    experience = [],
    project = [],
    education = []
  } = data || {};

  return (
    <div className="w-full bg-white text-gray-900 font-sans p-8 max-w-4xl mx-auto border border-gray-200 shadow-sm print:shadow-none print:border-none print:p-0">
      
      {/* 1. Header Section */}
      <header className="text-center pb-4 border-b border-gray-300">
        <h1 className="text-2xl font-bold uppercase tracking-wide text-gray-900">
          {personal_info.full_name || "Your Full Name"}
        </h1>
        {personal_info.profession && (
          <p className="text-sm font-semibold text-gray-700 mt-1 uppercase tracking-wider">
            {personal_info.profession}
          </p>
        )}
        
        {/* Contact Info */}
        <div className="flex flex-wrap justify-center items-center gap-2 text-xs text-gray-700 mt-2">
          {personal_info.email && <span>{personal_info.email}</span>}
          {personal_info.phone && <span>• {personal_info.phone}</span>}
          {personal_info.location && <span>• {personal_info.location}</span>}
          {personal_info.linkedin && <span>• {personal_info.linkedin}</span>}
        </div>
      </header>

      {/* 2. Professional Summary */}
      {professional_summary && (
        <section className="mt-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-xs text-gray-800 leading-relaxed text-justify">
            {professional_summary}
          </p>
        </section>
      )}

      {/* 3. Skills */}
      {skills && skills.length > 0 && (
        <section className="mt-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1 mb-2">
            Skills & Competencies
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-800">
            {skills.map((skill, index) => (
              <span key={index}>• {skill}</span>
            ))}
          </div>
        </section>
      )}

      {/* 4. Experience */}
      {experience && experience.length > 0 && (
        <section className="mt-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1 mb-2">
            Professional Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp, idx) => (
              <div key={idx} className="text-xs">
                <div className="flex justify-between font-bold text-gray-900">
                  <span>{exp.position} {exp.company ? `| ${exp.company}` : ''}</span>
                  <span className="text-gray-600 font-normal">
                    {exp.start_date} - {exp.is_current ? "Present" : exp.end_date}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-gray-800 mt-1 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Projects */}
      {project && project.length > 0 && (
        <section className="mt-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1 mb-2">
            Key Projects
          </h2>
          <div className="space-y-3">
            {project.map((proj, idx) => (
              <div key={idx} className="text-xs">
                <div className="font-bold text-gray-900">
                  {proj.name} {proj.type ? `(${proj.type})` : ''}
                </div>
                {proj.description && (
                  <p className="text-gray-800 mt-1 leading-relaxed">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Education */}
      {education && education.length > 0 && (
        <section className="mt-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1 mb-2">
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu, idx) => (
              <div key={idx} className="text-xs flex justify-between text-gray-800">
                <div>
                  <span className="font-bold text-gray-900">{edu.degree}</span> {edu.field ? `in ${edu.field}` : ''} - <span className="italic">{edu.institution}</span>
                  {edu.cgpa && <span className="ml-2 font-semibold text-gray-700">(CGPA: {edu.cgpa})</span>}
                </div>
                <span className="text-gray-600 font-normal">{edu.graduation_date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default AtsTemplate;