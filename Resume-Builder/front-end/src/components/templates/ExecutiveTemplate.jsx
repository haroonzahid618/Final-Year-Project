
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  BriefcaseBusiness,
  GraduationCap,
  Award,
  User
} from "lucide-react";

const ExecutiveTemplate = ({ data, accentColor }) => {

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short"
    });
  };

  const info = data.personal_info || {};

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800 font-sans shadow-sm">

      {/* Header */}
      <header
        className="bg-slate-900 text-white p-8"
      >
        <div className="flex flex-wrap items-center gap-6">


          <div className="flex-1">
            <h1 className="text-3xl font-bold uppercase tracking-wide">
              {info.full_name || "Your Name"}
            </h1>

            <p
              className="text-lg mt-2 font-medium"
              style={{ color: accentColor }}
            >
              {info.profession}
            </p>

            <div className="flex flex-wrap gap-4 mt-5 text-sm text-gray-300">

              {info.email && (
                <div className="flex items-center gap-2">
                  <Mail size={15} />
                  <span>{info.email}</span>
                </div>
              )}

              {info.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={15} />
                  <span>{info.phone}</span>
                </div>
              )}

              {info.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={15} />
                  <span>{info.location}</span>
                </div>
              )}

              {info.linkedin && (
                <div className="flex items-center gap-2 break-all">
                  <Linkedin size={15} />
                  <span>{info.linkedin}</span>
                </div>
              )}

              {info.website && (
                <div className="flex items-center gap-2 break-all">
                  <Globe size={15} />
                  <span>{info.website}</span>
                </div>
              )}

            </div>
          </div>
        </div>
      </header>

      <main className="p-8">

        {/* Professional Summary */}
        {data.professional_summary && (
          <section className="mb-7">
            <h2
              className="text-xl font-bold mb-3 uppercase tracking-wide border-b-2 pb-2"
              style={{ color: accentColor, borderColor: accentColor }}
            >
              Professional Summary
            </h2>

            <p className="text-gray-700 leading-relaxed text-sm">
              {data.professional_summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section className="mb-7">
            <h2
              className="text-xl font-bold mb-4 uppercase tracking-wide border-b-2 pb-2"
              style={{ color: accentColor, borderColor: accentColor }}
            >
              Professional Experience
            </h2>

            <div className="space-y-5">
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className="border-l-4 pl-5"
                  style={{ borderColor: accentColor }}
                >
                  <div className="flex flex-wrap justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {exp.position}
                      </h3>

                      <p className="text-gray-600 font-medium">
                        {exp.company}
                      </p>
                    </div>

                    <p className="text-sm text-gray-500">
                      {formatDate(exp.start_date)} -{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </p>
                  </div>

                  {exp.description && (
                    <p className="text-sm text-gray-700 mt-2 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.project?.length > 0 && (
          <section className="mb-7">
            <h2
              className="text-xl font-bold mb-4 uppercase tracking-wide border-b-2 pb-2"
              style={{ color: accentColor, borderColor: accentColor }}
            >
              Projects
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {data.project.map((proj, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 border-l-4"
                  style={{ borderColor: accentColor }}
                >
                  <h3 className="font-bold text-gray-900">
                    {proj.name}
                  </h3>

                  {proj.type && (
                    <p
                      className="text-sm font-medium mt-1"
                      style={{ color: accentColor }}
                    >
                      {proj.type}
                    </p>
                  )}

                  <p className="text-sm text-gray-600 mt-2 leading-relaxed whitespace-pre-line">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <section className="mb-7">
            <h2
              className="text-xl font-bold mb-4 uppercase tracking-wide border-b-2 pb-2"
              style={{ color: accentColor, borderColor: accentColor }}
            >
              Education
            </h2>

            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start gap-3"
                >
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>

                    <p className="text-gray-600 text-sm">
                      {edu.institution}
                    </p>

                    {(edu.gpa || edu.cgpa) && (
                      <p className="text-sm text-gray-600 mt-1">
                        {edu.gpa && `GPA: ${edu.gpa}`}
                        {edu.gpa && edu.cgpa && " | "}
                        {edu.cgpa && `CGPA: ${edu.cgpa}`}
                      </p>
                    )}
                  </div>

                  <p className="text-sm text-gray-500 whitespace-nowrap">
                    {formatDate(edu.graduation_date)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills?.length > 0 && (
          <section className="mb-4">
            <h2
              className="text-xl font-bold mb-4 uppercase tracking-wide border-b-2 pb-2"
              style={{ color: accentColor, borderColor: accentColor }}
            >
              Core Skills
            </h2>

            <div className="flex flex-wrap gap-3">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-md text-sm font-medium bg-gray-100"
                  style={{ color: accentColor }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
};

export default ExecutiveTemplate;
