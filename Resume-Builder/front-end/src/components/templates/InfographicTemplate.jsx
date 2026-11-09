
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
  Code2,
  Award,
} from "lucide-react";

const InfographicTemplate = ({ data, accentColor = "#0d9488" }) => {
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

  const SectionTitle = ({ icon: Icon, number, children }) => (
    <div className="mb-5 flex items-center gap-3">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white"
        style={{ backgroundColor: accentColor }}
      >
        <Icon size={18} />
      </div>

      <div className="flex-1">

        <h2 className="text-lg font-extrabold text-gray-800">
          {children}
        </h2>
      </div>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-4xl overflow-hidden bg-white text-gray-800 shadow-sm">

      {/* Header */}
      <header
        className="relative overflow-hidden p-8 text-white sm:p-10"
        style={{ backgroundColor: accentColor }}
      >
        <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full border-[25px] border-white/10" />
        <div className="absolute -bottom-20 right-36 h-44 w-44 rounded-full bg-white/10" />

        <div className="relative z-10 flex flex-col items-center gap-5 sm:flex-row">
          <div className="min-w-0 text-center sm:text-left">

            <h1 className="break-words text-3xl font-extrabold sm:text-4xl">
              {info.full_name || "Your Name"}
            </h1>

            <p className="mt-2 text-base font-medium text-white/85">
              {info.profession || "Your Profession"}
            </p>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="relative z-10 mt-8 grid grid-cols-1 gap-3 border-t border-white/25 pt-6 sm:grid-cols-2">

          {info.email && (
            <div className="flex min-w-0 items-center gap-3 rounded-lg bg-white/10 p-3">
              <Mail size={16} className="shrink-0" />
              <span className="break-all text-xs">{info.email}</span>
            </div>
          )}

          {info.phone && (
            <div className="flex min-w-0 items-center gap-3 rounded-lg bg-white/10 p-3">
              <Phone size={16} className="shrink-0" />
              <span className="break-all text-xs">{info.phone}</span>
            </div>
          )}

          {info.location && (
            <div className="flex min-w-0 items-center gap-3 rounded-lg bg-white/10 p-3">
              <MapPin size={16} className="shrink-0" />
              <span className="text-xs">{info.location}</span>
            </div>
          )}

          {info.linkedin && (
            <div className="flex min-w-0 items-center gap-3 rounded-lg bg-white/10 p-3">
              <Linkedin size={16} className="shrink-0" />
              <span className="break-all text-xs">{info.linkedin}</span>
            </div>
          )}

          {info.website && (
            <div className="flex min-w-0 items-center gap-3 rounded-lg bg-white/10 p-3">
              <Globe size={16} className="shrink-0" />
              <span className="break-all text-xs">{info.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="space-y-8 p-7 sm:p-10">

        {/* Summary */}
        {data.professional_summary && (
          <section>
            <SectionTitle icon={User} number="01">
              Professional Summary
            </SectionTitle>

            <div className="rounded-xl bg-gray-50 p-5">
              <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
                {data.professional_summary}
              </p>
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills?.length > 0 && (
          <section>
            <SectionTitle icon={Code2} number="02">
              Skills & Expertise
            </SectionTitle>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {data.skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3"
                >
                  <div
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />

                  <span className="text-sm font-semibold text-gray-700">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section>
            <SectionTitle icon={BriefcaseBusiness} number="03">
              Work Experience
            </SectionTitle>

            <div className="space-y-5">
              {data.experience.map((exp, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: accentColor }}
                    >
                      <BriefcaseBusiness size={16} />
                    </div>

                    {index !== data.experience.length - 1 && (
                      <div
                        className="mt-2 w-0.5 flex-1"
                        style={{ backgroundColor: `${accentColor}40` }}
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1 rounded-xl border border-gray-100 p-4">
                    <div className="flex flex-wrap justify-between gap-2">
                      <h3 className="text-sm font-bold">
                        {exp.position}
                      </h3>

                      <span
                        className="rounded-full px-3 py-1 text-[10px] font-semibold"
                        style={{
                          color: accentColor,
                          backgroundColor: `${accentColor}15`,
                        }}
                      >
                        {formatDate(exp.start_date)} -{" "}
                        {exp.is_current ? "Present" : formatDate(exp.end_date)}
                      </span>
                    </div>

                    <p
                      className="mt-1 text-sm font-semibold"
                      style={{ color: accentColor }}
                    >
                      {exp.company}
                    </p>

                    {exp.description && (
                      <p className="mt-3 whitespace-pre-line text-sm leading-6 text-gray-600">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.project?.length > 0 && (
          <section>
            <SectionTitle icon={FolderKanban} number="04">
              Projects
            </SectionTitle>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {data.project.map((project, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-100 bg-gray-50 p-5"
                >
                  <div
                    className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg text-white"
                    style={{ backgroundColor: accentColor }}
                  >
                    <FolderKanban size={17} />
                  </div>

                  <h3 className="text-sm font-bold">
                    {project.name}
                  </h3>

                  {project.type && (
                    <p
                      className="mt-1 text-xs font-semibold"
                      style={{ color: accentColor }}
                    >
                      {project.type}
                    </p>
                  )}

                  {project.description && (
                    <p className="mt-3 whitespace-pre-line text-sm leading-6 text-gray-600">
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
            <SectionTitle icon={GraduationCap} number="05">
              Education
            </SectionTitle>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {data.education.map((edu, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-100 p-5"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-white"
                      style={{ backgroundColor: accentColor }}
                    >
                      <GraduationCap size={18} />
                    </div>

                    {edu.graduation_date && (
                      <span className="text-xs text-gray-500">
                        {formatDate(edu.graduation_date)}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold">
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                  </h3>

                  <p className="mt-2 text-xs text-gray-600">
                    {edu.institution}
                  </p>

                  {(edu.gpa || edu.cgpa) && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {edu.gpa && (
                        <span
                          className="rounded-md px-3 py-1.5 text-xs font-semibold"
                          style={{
                            color: accentColor,
                            backgroundColor: `${accentColor}15`,
                          }}
                        >
                          GPA: {edu.gpa}
                        </span>
                      )}

                      {edu.cgpa && (
                        <span
                          className="rounded-md px-3 py-1.5 text-xs font-semibold"
                          style={{
                            color: accentColor,
                            backgroundColor: `${accentColor}15`,
                          }}
                        >
                          CGPA: {edu.cgpa}
                        </span>
                      )}
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

export default InfographicTemplate;
