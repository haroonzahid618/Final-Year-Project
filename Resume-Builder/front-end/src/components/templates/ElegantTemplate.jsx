
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
  Award,
  User,
} from "lucide-react";

const ElegantTemplate = ({ data, accentColor = "#8b6b4a" }) => {
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

  const SectionTitle = ({ children }) => (
    <div className="mb-4 border-b border-stone-300 pb-2">
      <h2
        className="font-serif text-xl font-bold tracking-wide"
        style={{ color: accentColor }}
      >
        {children}
      </h2>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-4xl bg-[#fffdf9] p-8 text-stone-800 shadow-sm sm:p-12">

      {/* Header */}
      <header className="border-b-2 border-stone-300 pb-7 text-center">

        <p
          className="mb-2 text-xs font-semibold uppercase tracking-[0.35em]"
          style={{ color: accentColor }}
        >
          {info.profession || "Professional"}
        </p>

        <h1 className="font-serif text-3xl font-bold tracking-wide sm:text-4xl">
          {info.full_name || "Your Name"}
        </h1>

        <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-3 text-xs text-stone-600">

          {info.email && (
            <div className="flex items-center gap-1.5">
              <Mail size={14} style={{ color: accentColor }} />
              <span className="break-all">{info.email}</span>
            </div>
          )}

          {info.phone && (
            <div className="flex items-center gap-1.5">
              <Phone size={14} style={{ color: accentColor }} />
              <span>{info.phone}</span>
            </div>
          )}

          {info.location && (
            <div className="flex items-center gap-1.5">
              <MapPin size={14} style={{ color: accentColor }} />
              <span>{info.location}</span>
            </div>
          )}

          {info.linkedin && (
            <div className="flex items-center gap-1.5">
              <Linkedin size={14} style={{ color: accentColor }} />
              <span className="break-all">{info.linkedin}</span>
            </div>
          )}

          {info.website && (
            <div className="flex items-center gap-1.5">
              <Globe size={14} style={{ color: accentColor }} />
              <span className="break-all">{info.website}</span>
            </div>
          )}

        </div>
      </header>

      <div className="mt-8 space-y-7">

        {/* Professional Summary */}
        {data.professional_summary && (
          <section>
            <SectionTitle>Professional Summary</SectionTitle>
            <div className="flex gap-3">
              <User
                size={18}
                className="mt-1 shrink-0"
                style={{ color: accentColor }}
              />
              <p className="text-sm leading-7 text-stone-700">
                {data.professional_summary}
              </p>
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section>
            <SectionTitle>Work Experience</SectionTitle>

            <div className="space-y-5">
              {data.experience.map((exp, index) => (
                <div key={index} className="flex gap-3">
                  <BriefcaseBusiness
                    size={18}
                    className="mt-1 shrink-0"
                    style={{ color: accentColor }}
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="font-serif text-base font-bold">
                          {exp.position}
                        </h3>
                        <p className="text-sm italic text-stone-600">
                          {exp.company}
                        </p>
                      </div>

                      <span className="text-xs text-stone-500">
                        {formatDate(exp.start_date)} -{" "}
                        {exp.is_current
                          ? "Present"
                          : formatDate(exp.end_date)}
                      </span>
                    </div>

                    {exp.description && (
                      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-stone-700">
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
            <SectionTitle>Projects</SectionTitle>

            <div className="space-y-4">
              {data.project.map((project, index) => (
                <div key={index} className="flex gap-3">
                  <FolderKanban
                    size={18}
                    className="mt-1 shrink-0"
                    style={{ color: accentColor }}
                  />

                  <div>
                    <h3 className="font-serif font-bold">
                      {project.name}
                    </h3>

                    {project.type && (
                      <p className="mt-1 text-xs italic text-stone-500">
                        {project.type}
                      </p>
                    )}

                    {project.description && (
                      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-stone-700">
                        {project.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <section>
            <SectionTitle>Education</SectionTitle>

            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index} className="flex gap-3">
                  <GraduationCap
                    size={19}
                    className="mt-1 shrink-0"
                    style={{ color: accentColor }}
                  />

                  <div className="flex-1">
                    <div className="flex flex-wrap justify-between gap-2">
                      <h3 className="font-serif font-bold">
                        {edu.degree}
                        {edu.field && ` in ${edu.field}`}
                      </h3>

                      {edu.graduation_date && (
                        <span className="text-xs text-stone-500">
                          {formatDate(edu.graduation_date)}
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm italic text-stone-600">
                      {edu.institution}
                    </p>

                    {(edu.gpa || edu.cgpa) && (
                      <div className="mt-2 flex flex-wrap gap-4 text-xs text-stone-600">
                        {edu.gpa && <span>GPA: {edu.gpa}</span>}
                        {edu.cgpa && <span>CGPA: {edu.cgpa}</span>}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills?.length > 0 && (
          <section>
            <SectionTitle>Skills & Expertise</SectionTitle>

            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="border border-stone-300 bg-[#f8f3ec] px-4 py-2 text-sm text-stone-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default ElegantTemplate;
