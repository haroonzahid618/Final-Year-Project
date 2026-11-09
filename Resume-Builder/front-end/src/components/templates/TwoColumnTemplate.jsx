
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
  Code,
} from "lucide-react";

const TwoColumnTemplate = ({ data, accentColor = "#2563eb" }) => {
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

  const SectionHeading = ({ icon: Icon, children }) => (
    <div className="mb-4 flex items-center gap-2 border-b border-gray-200 pb-2">
      <Icon size={19} style={{ color: accentColor }} />
      <h2 className="text-base font-bold uppercase tracking-wide text-gray-800">
        {children}
      </h2>
    </div>
  );

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden bg-white text-gray-800 shadow-sm md:flex-row">

      {/* Left Column */}
      <aside className="w-full bg-[#f1f5f9] p-7 md:w-[34%]">

        {/* Profile */}
        <div className="mb-8 text-center">
          {/* {info.image && (
            <img
              src={info.image}
              alt="Profile"
              className="mx-auto mb-4 h-32 w-32 rounded-full border-4 border-white object-cover shadow-sm"
            />
          )} */}

          {data.personal_info?.image && typeof data.personal_info.image === 'string' ? (
                        <div className="mb-6">
                            <img src={data.personal_info.image} alt="Profile" className="mx-auto mb-4 h-32 w-32 rounded-full border-4 border-white object-cover shadow-sm" style={{ background: accentColor + '70' }} />
                        </div>
                    ) : (
                        data.personal_info?.image && typeof data.personal_info.image === 'object' ? (
                            <div className="mb-6">
                                <img src={URL.createObjectURL(data.personal_info.image)} alt="Profile" className="mx-auto mb-4 h-32 w-32 rounded-full border-4 border-white object-cover shadow-sm" />
                            </div>
                        ) : null
                    )}

          <h1 className="break-words text-2xl font-bold">
            {info.full_name || "Your Name"}
          </h1>

          <p
            className="mt-2 text-sm font-semibold"
            style={{ color: accentColor }}
          >
            {info.profession || "Your Profession"}
          </p>
        </div>

        {/* Contact */}
        <section className="mb-8">
          <h2 className="mb-4 border-b border-gray-300 pb-2 text-sm font-bold uppercase tracking-widest">
            Contact
          </h2>

          <div className="space-y-4 text-xs text-gray-600">

            {info.email && (
              <div className="flex min-w-0 items-start gap-2">
                <Mail size={15} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
                <span className="break-all">{info.email}</span>
              </div>
            )}

            {info.phone && (
              <div className="flex min-w-0 items-start gap-2">
                <Phone size={15} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
                <span className="break-all">{info.phone}</span>
              </div>
            )}

            {info.location && (
              <div className="flex min-w-0 items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
                <span>{info.location}</span>
              </div>
            )}

            {info.linkedin && (
              <div className="flex min-w-0 items-start gap-2">
                <Linkedin size={15} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
                <span className="break-all">{info.linkedin}</span>
              </div>
            )}

            {info.website && (
              <div className="flex min-w-0 items-start gap-2">
                <Globe size={15} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
                <span className="break-all">{info.website}</span>
              </div>
            )}

          </div>
        </section>

        {/* Skills */}
        {data.skills?.length > 0 && (
          <section>
            <h2 className="mb-4 flex items-center gap-2 border-b border-gray-300 pb-2 text-sm font-bold uppercase tracking-widest">
              <Code size={17} style={{ color: accentColor }} />
              Skills
            </h2>

            <div className="space-y-3">
              {data.skills.map((skill, index) => (
                <div key={index}>
                  <p className="mb-1 text-xs font-medium text-gray-700">
                    {skill}
                  </p>

                  <div className="h-1.5 overflow-hidden rounded-full bg-gray-300">
                    <div
                      className="h-full w-4/5 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </aside>

      {/* Right Column */}
      <main className="min-w-0 flex-1 space-y-7 p-7 sm:p-9">

        {/* Summary */}
        {data.professional_summary && (
          <section>
            <SectionHeading icon={User}>
              Professional Summary
            </SectionHeading>

            <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
              {data.professional_summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section>
            <SectionHeading icon={BriefcaseBusiness}>
              Work Experience
            </SectionHeading>

            <div className="space-y-5">
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className="border-l-2 pl-4"
                  style={{ borderColor: accentColor }}
                >
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
            <SectionHeading icon={FolderKanban}>
              Projects
            </SectionHeading>

            <div className="space-y-4">
              {data.project.map((project, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <h3 className="text-sm font-bold">
                    {project.name}
                  </h3>

                  {project.type && (
                    <p className="mt-1 text-xs font-semibold" style={{ color: accentColor }}>
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
            <SectionHeading icon={GraduationCap}>
              Education
            </SectionHeading>

            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index}>
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

export default TwoColumnTemplate;
