
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
  User,
  Sparkles,
} from "lucide-react";

const CreativeTemplate = ({ data, accentColor = "#7c3aed" }) => {
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
    <div className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden bg-white text-gray-800 shadow-sm md:flex-row">

      {/* Left Sidebar */}
      <aside
        className="w-full p-7 text-white md:w-[32%]"
        style={{ backgroundColor: accentColor }}
      >
        {/* Profile Image */}
        <div className="mb-7 text-center">
          <h1 className="break-words text-2xl font-bold">
            {info.full_name || "Your Name"}
          </h1>

          <p className="mt-2 text-sm font-medium text-white/80">
            {info.profession || "Your Profession"}
          </p>
        </div>

        {/* Contact */}
        <div className="mb-8">
          <h2 className="mb-4 border-b border-white/30 pb-2 text-sm font-bold uppercase tracking-widest">
            Contact
          </h2>

          <div className="space-y-4 text-xs">
            {info.email && (
              <div className="flex items-start gap-2">
                <Mail size={15} className="mt-0.5 shrink-0" />
                <span className="break-all text-[11px]">{info.email}</span>
              </div>
            )}

            {info.phone && (
              <div className="flex items-start gap-2">
                <Phone size={15} className="mt-0.5 shrink-0" />
                <span className="break-all">{info.phone}</span>
              </div>
            )}

            {info.location && (
              <div className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0" />
                <span>{info.location}</span>
              </div>
            )}

            {info.linkedin && (
              <div className="flex items-start gap-2">
                <Linkedin size={15} className="mt-0.5 shrink-0" />
                <span className="break-all">{info.linkedin}</span>
              </div>
            )}

            {info.website && (
              <div className="flex items-start gap-2">
                <Globe size={15} className="mt-0.5 shrink-0" />
                <span className="break-all">{info.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {data.skills?.length > 0 && (
          <div>
            <h2 className="mb-4 border-b border-white/30 pb-2 text-sm font-bold uppercase tracking-widest">
              Skills
            </h2>

            <div className="space-y-3">
              {data.skills.map((skill, index) => (
                <div key={index}>
                  <div className="mb-1 text-xs font-medium">{skill}</div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/25">
                    <div className="h-full w-4/5 rounded-full bg-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Right Content */}
      <main className="min-w-0 flex-1 space-y-7 p-7 sm:p-9">

        {/* Summary */}
        {data.professional_summary && (
          <section>
            <div className="mb-3 flex items-center gap-2">
              <User size={20} style={{ color: accentColor }} />
              <h2 className="text-lg font-bold">About Me</h2>
            </div>

            <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
              {data.professional_summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section>
            <div className="mb-4 flex items-center gap-2">
              <BriefcaseBusiness size={20} style={{ color: accentColor }} />
              <h2 className="text-lg font-bold">Experience</h2>
            </div>

            <div className="space-y-5 border-l-2 border-gray-200 pl-5">
              {data.experience.map((exp, index) => (
                <div key={index} className="relative">
                  <span
                    className="absolute -left-[26px] top-1.5 h-3 w-3 rounded-full border-2 border-white"
                    style={{ backgroundColor: accentColor }}
                  />

                  <div className="flex flex-wrap justify-between gap-2">
                    <h3 className="text-sm font-bold">
                      {exp.position}
                    </h3>

                    <span className="text-xs text-gray-500">
                      {formatDate(exp.start_date)} -{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </span>
                  </div>

                  <p className="mt-1 text-sm font-medium" style={{ color: accentColor }}>
                    {exp.company}
                  </p>

                  {exp.description && (
                    <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-600">
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
              <FolderKanban size={20} style={{ color: accentColor }} />
              <h2 className="text-lg font-bold">Projects</h2>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {data.project.map((project, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <h3 className="text-sm font-bold">{project.name}</h3>

                  {project.type && (
                    <p className="mt-1 text-xs font-medium" style={{ color: accentColor }}>
                      {project.type}
                    </p>
                  )}

                  {project.description && (
                    <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-600">
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
              <GraduationCap size={20} style={{ color: accentColor }} />
              <h2 className="text-lg font-bold">Education</h2>
            </div>

            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
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
                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-500">
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

export default CreativeTemplate;

