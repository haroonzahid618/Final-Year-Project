
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  BriefcaseBusiness,
  GraduationCap,
  FolderKanban,
  BookOpen,
  Code,
} from "lucide-react";

const AcademicTemplate = ({ data, accentColor = "#1e3a8a" }) => {
  const personal = data?.personal_info || {};

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    if (!year || !month) return dateStr;

    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const contacts = [
    { value: personal.email, Icon: Mail },
    { value: personal.phone, Icon: Phone },
    { value: personal.location, Icon: MapPin },
    { value: personal.linkedin, Icon: Linkedin },
    { value: personal.website, Icon: Globe },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-white text-gray-800 font-serif border border-gray-200 shadow-sm p-8 md:p-12">

      {/* Header */}
      <header className="text-center border-b-2 pb-7" style={{ borderColor: accentColor }}>

        

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {personal.full_name || "Your Name"}
        </h1>

        {personal.profession && (
          <p className="text-base mt-3 text-gray-600 italic">
            {personal.profession}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 mt-6 font-sans">
          {contacts.map(({ value, Icon }, index) =>
            value ? (
              <div
                key={index}
                className="flex items-center gap-2 text-xs text-gray-600"
              >
                <Icon size={13} style={{ color: accentColor }} />
                <span className="break-all">{value}</span>
              </div>
            ) : null
          )}
        </div>
      </header>

      {/* Summary */}
      {data.professional_summary && (
        <section className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen size={19} style={{ color: accentColor }} />
            <h2
              className="text-lg font-bold uppercase tracking-wider"
              style={{ color: accentColor }}
            >
              Profile
            </h2>
          </div>

          <p className="text-sm leading-7 text-gray-700 text-justify">
            {data.professional_summary}
          </p>
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section className="mt-8">
          <div className="flex items-center gap-3 mb-5">
            <GraduationCap size={21} style={{ color: accentColor }} />
            <h2
              className="text-lg font-bold uppercase tracking-wider"
              style={{ color: accentColor }}
            >
              Education
            </h2>
          </div>

          <div className="space-y-5">
            {data.education.map((item, index) => (
              <div key={index} className="border-l-2 pl-5" style={{ borderColor: `${accentColor}50` }}>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <h3 className="font-bold text-gray-900">
                    {item.degree}
                    {item.field ? ` in ${item.field}` : ""}
                  </h3>

                  {item.graduation_date && (
                    <span className="text-xs text-gray-500 font-sans">
                      {formatDate(item.graduation_date)}
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 mt-1 italic">
                  {item.institution}
                </p>

                <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-600 font-sans">
                  {item.gpa && <span>GPA: {item.gpa}</span>}
                  {item.cgpa && <span>CGPA: {item.cgpa}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className="mt-8">
          <div className="flex items-center gap-3 mb-5">
            <BriefcaseBusiness size={20} style={{ color: accentColor }} />
            <h2
              className="text-lg font-bold uppercase tracking-wider"
              style={{ color: accentColor }}
            >
              Professional Experience
            </h2>
          </div>

          <div className="space-y-6">
            {data.experience.map((item, index) => (
              <div key={index}>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <h3 className="font-bold text-gray-900">
                    {item.position}
                  </h3>

                  <span className="text-xs text-gray-500 font-sans">
                    {formatDate(item.start_date)} -{" "}
                    {item.is_current ? "Present" : formatDate(item.end_date)}
                  </span>
                </div>

                <p className="text-sm italic text-gray-600 mt-1">
                  {item.company}
                </p>

                {item.description && (
                  <p className="text-sm leading-6 text-gray-700 mt-3 whitespace-pre-line">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.project?.length > 0 && (
        <section className="mt-8">
          <div className="flex items-center gap-3 mb-5">
            <FolderKanban size={20} style={{ color: accentColor }} />
            <h2
              className="text-lg font-bold uppercase tracking-wider"
              style={{ color: accentColor }}
            >
              Projects & Research
            </h2>
          </div>

          <div className="space-y-5">
            {data.project.map((item, index) => (
              <div key={index}>
                <h3 className="font-bold text-gray-900">
                  {item.name}
                </h3>

                {item.type && (
                  <p className="text-xs italic text-gray-500 mt-1">
                    {item.type}
                  </p>
                )}

                {item.description && (
                  <p className="text-sm leading-6 text-gray-700 mt-2 whitespace-pre-line">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section className="mt-8">
          <div className="flex items-center gap-3 mb-5">
            <Code size={20} style={{ color: accentColor }} />
            <h2
              className="text-lg font-bold uppercase tracking-wider"
              style={{ color: accentColor }}
            >
              Skills & Competencies
            </h2>
          </div>

          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="text-sm text-gray-700"
              >
                {skill}{index !== data.skills.length - 1 ? " •" : ""}
              </span>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default AcademicTemplate;

