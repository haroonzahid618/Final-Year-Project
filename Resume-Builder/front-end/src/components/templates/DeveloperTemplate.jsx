
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
  Code2,
  Terminal,
  User,
  PersonStanding,
} from "lucide-react";

const DeveloperTemplate = ({ data, accentColor = "#16a34a" }) => {
  const info = data?.personal_info || {};

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    if (!year || !month) return dateStr;

    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="mx-auto w-full max-w-4xl overflow-hidden bg-white font-sans text-gray-800 shadow-sm">

      {/* Header */}
      <header className="bg-[#111827] p-8 text-white sm:p-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row">

          {data.personal_info?.image && typeof data.personal_info.image === 'string' ? (
                        <div className="mb-6">
                            <img src={data.personal_info.image} alt="Profile" className="w-28 h-28 border-2 border-grey-600 object-cover rounded-xl " style={{ background: accentColor + '70' }} />
                        </div>
                    ) : (
                        data.personal_info?.image && typeof data.personal_info.image === 'object' ? (
                            <div className="mb-6">
                                <img src={URL.createObjectURL(data.personal_info.image)} alt="Profile" className="w-28 h-28 object-cover rounded-xl  border-2 border-grey-600 " />
                            </div>
                        ) : null
                    )}

          <div className="min-w-0 flex-1 text-center sm:text-left">

            <h1 className="break-words text-3xl font-bold sm:text-4xl">
              {info.full_name || "Your Name"}
            </h1>

            <p className="mt-2 text-base text-gray-300">
              {info.profession || "Software Developer"}
            </p>
          </div>
        </div>

        {/* Contact Details */}
        <div className="mt-7 grid grid-cols-1 gap-3 border-t border-gray-700 pt-6 text-xs text-gray-300 sm:grid-cols-2">

          {info.email && (
            <div className="flex min-w-0 items-center gap-2">
              <Mail size={15} style={{ color: accentColor }} />
              <span className="break-all">{info.email}</span>
            </div>
          )}

          {info.phone && (
            <div className="flex min-w-0 items-center gap-2">
              <Phone size={15} style={{ color: accentColor }} />
              <span>{info.phone}</span>
            </div>
          )}

          {info.location && (
            <div className="flex min-w-0 items-center gap-2">
              <MapPin size={15} style={{ color: accentColor }} />
              <span>{info.location}</span>
            </div>
          )}

          {info.linkedin && (
            <div className="flex min-w-0 items-center gap-2">
              <Linkedin size={15} style={{ color: accentColor }} />
              <span className="break-all">{info.linkedin}</span>
            </div>
          )}

          {info.website && (
            <div className="flex min-w-0 items-center gap-2">
              <Globe size={15} style={{ color: accentColor }} />
              <span className="break-all">{info.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="space-y-7 p-7 sm:p-10">

        {/* Professional Summary */}
        {data.professional_summary && (
          <section>
            <div className="mb-3 flex items-center gap-2">
              <PersonStanding size={19} style={{ color: accentColor }} />
              <h2 className="font-mono text-lg font-bold">
                <span style={{ color: accentColor }}>01.</span> About Me
              </h2>
            </div>

            <p className="whitespace-pre-line border-l-2 border-gray-200 pl-4 text-sm leading-7 text-gray-600">
              {data.professional_summary}
            </p>
          </section>
        )}

        {/* Technical Skills */}
        {data.skills?.length > 0 && (
          <section>
            <div className="mb-4 flex items-center gap-2">
              <Code2 size={19} style={{ color: accentColor }} />
              <h2 className="font-mono text-lg font-bold">
                <span style={{ color: accentColor }}>02.</span> Technical Skills
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-xs text-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section>
            <div className="mb-4 flex items-center gap-2">
              <BriefcaseBusiness size={19} style={{ color: accentColor }} />
              <h2 className="font-mono text-lg font-bold">
                <span style={{ color: accentColor }}>03.</span> Experience
              </h2>
            </div>

            <div className="space-y-5">
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold">{exp.position}</h3>
                      <p className="mt-1 font-mono text-xs" style={{ color: accentColor }}>
                        {exp.company}
                      </p>
                    </div>

                    <span className="text-xs text-gray-500">
                      {formatDate(exp.start_date)} -{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </span>
                  </div>

                  {exp.description && (
                    <p className="mt-3 whitespace-pre-line text-sm leading-6 text-gray-600">
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
          <section>
            <div className="mb-4 flex items-center gap-2">
              <FolderKanban size={19} style={{ color: accentColor }} />
              <h2 className="font-mono text-lg font-bold">
                <span style={{ color: accentColor }}>04.</span> Projects
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {data.project.map((project, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Code2 size={16} style={{ color: accentColor }} />
                    <h3 className="text-sm font-bold">{project.name}</h3>
                  </div>

                  {project.type && (
                    <p className="mb-2 font-mono text-xs" style={{ color: accentColor }}>
                      {project.type}
                    </p>
                  )}

                  {project.description && (
                    <p className="whitespace-pre-line text-sm leading-6 text-gray-600">
                      {project.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <section>
            <div className="mb-4 flex items-center gap-2">
              <GraduationCap size={19} style={{ color: accentColor }} />
              <h2 className="font-mono text-lg font-bold">
                <span style={{ color: accentColor }}>05.</span> Education
              </h2>
            </div>

            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div
                  key={index}
                  className="border-l-2 border-gray-200 pl-4"
                >
                  <div className="flex flex-wrap justify-between gap-2">
                    <h3 className="text-sm font-bold">
                      {edu.degree}
                      {edu.field && ` in ${edu.field}`}
                    </h3>

                    {edu.graduation_date && (
                      <span className="text-xs text-gray-500">
                        {formatDate(edu.graduation_date)}
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-gray-600">
                    {edu.institution}
                  </p>

                  {(edu.gpa || edu.cgpa) && (
                    <div className="mt-2 flex flex-wrap gap-4 font-mono text-xs text-gray-500">
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                      {edu.cgpa && <span>CGPA: {edu.cgpa}</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default DeveloperTemplate;

