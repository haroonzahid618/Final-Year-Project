
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
} from "lucide-react";

const MinimalBeigeTemplate = ({
  data,
  accentColor = "#9a7555",
}) => {
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

  const SectionTitle = ({ icon: Icon, children }) => (
    <div className="mb-4 flex items-center gap-3">
      <Icon size={18} className="shrink-0" style={{ color: accentColor }} />
      <h2
        className="font-serif text-lg font-bold tracking-wide"
        style={{ color: accentColor }}
      >
        {children}
      </h2>
      <div className="h-px flex-1 bg-[#dfd2c3]" />
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-4xl bg-[#faf7f1] p-6 text-[#40372f] shadow-sm sm:p-10">

      {/* Header */}
      <header className="border-b border-[#dfd2c3] pb-7">
        <div className="flex flex-col items-center gap-5 sm:flex-row">

          <div className="min-w-0 flex-1 text-center sm:text-left">

            <h1 className="break-words font-serif text-3xl font-bold sm:text-4xl">
              {info.full_name || "Your Name"}
            </h1>

            <p className="mt-2 text-sm tracking-wide text-[#887666]">
              {info.profession || "Your Profession"}
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 border-t border-[#dfd2c3] pt-5 text-xs text-[#75675b]">

          {info.email && (
            <div className="flex min-w-0 items-center gap-2">
              <Mail size={14} className="shrink-0" style={{ color: accentColor }} />
              <span className="break-all">{info.email}</span>
            </div>
          )}

          {info.phone && (
            <div className="flex items-center gap-2">
              <Phone size={14} className="shrink-0" style={{ color: accentColor }} />
              <span>{info.phone}</span>
            </div>
          )}

          {info.location && (
            <div className="flex items-center gap-2">
              <MapPin size={14} className="shrink-0" style={{ color: accentColor }} />
              <span>{info.location}</span>
            </div>
          )}

          {info.linkedin && (
            <div className="flex min-w-0 items-center gap-2">
              <Linkedin size={14} className="shrink-0" style={{ color: accentColor }} />
              <span className="break-all">{info.linkedin}</span>
            </div>
          )}

          {info.website && (
            <div className="flex min-w-0 items-center gap-2">
              <Globe size={14} className="shrink-0" style={{ color: accentColor }} />
              <span className="break-all">{info.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="mt-8 space-y-7">

        {/* Summary */}
        {data.professional_summary && (
          <section>
            <SectionTitle icon={User}>
              About Me
            </SectionTitle>

            <p className="whitespace-pre-line pl-8 text-sm leading-7 text-[#75675b]">
              {data.professional_summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section>
            <SectionTitle icon={BriefcaseBusiness}>
              Work Experience
            </SectionTitle>

            <div className="space-y-5 pl-8">
              {data.experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-[#dfd2c3] pl-4">
                  <div className="flex flex-wrap justify-between gap-2">
                    <h3 className="font-serif text-base font-bold">
                      {exp.position}
                    </h3>

                    <span className="text-xs text-[#9b8b7c]">
                      {formatDate(exp.start_date)} -{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </span>
                  </div>

                  <p className="mt-1 text-sm font-medium" style={{ color: accentColor }}>
                    {exp.company}
                  </p>

                  {exp.description && (
                    <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[#75675b]">
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
            <SectionTitle icon={FolderKanban}>
              Projects
            </SectionTitle>

            <div className="grid grid-cols-1 gap-4 pl-8 sm:grid-cols-2">
              {data.project.map((project, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-[#e5d9cb] bg-[#f4eee5] p-4"
                >
                  <h3 className="font-serif text-base font-bold">
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
                    <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[#75675b]">
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
            <SectionTitle icon={GraduationCap}>
              Education
            </SectionTitle>

            <div className="space-y-4 pl-8">
              {data.education.map((edu, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-[#e5d9cb] bg-[#f4eee5] p-4"
                >
                  <div className="flex flex-wrap justify-between gap-2">
                    <h3 className="font-serif text-base font-bold">
                      {edu.degree}
                      {edu.field && ` in ${edu.field}`}
                    </h3>

                    {edu.graduation_date && (
                      <span className="text-xs text-[#9b8b7c]">
                        {formatDate(edu.graduation_date)}
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-[#75675b]">
                    {edu.institution}
                  </p>

                  {(edu.gpa || edu.cgpa) && (
                    <div className="mt-3 flex flex-wrap gap-3 text-xs">
                      {edu.gpa && (
                        <span className="rounded-md bg-[#e9dfd2] px-3 py-1.5">
                          GPA: {edu.gpa}
                        </span>
                      )}

                      {edu.cgpa && (
                        <span className="rounded-md bg-[#e9dfd2] px-3 py-1.5">
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

        {/* Skills */}
        {data.skills?.length > 0 && (
          <section>
            <SectionTitle icon={Code2}>
              Skills & Expertise
            </SectionTitle>

            <div className="flex flex-wrap gap-2 pl-8">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full border border-[#dfd2c3] bg-[#f4eee5] px-4 py-2 text-xs font-medium text-[#665648]"
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

export default MinimalBeigeTemplate;

