
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
  UserRound,
  Code,
  CircleDot,
} from "lucide-react";

const TimelineTemplate = ({ data, accentColor = "#0f766e" }) => {
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

  const SectionHeading = ({ icon: Icon, children }) => (
    <div className="flex items-center gap-3 mb-6">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0"
        style={{ backgroundColor: accentColor }}
      >
        <Icon size={19} />
      </div>

      <h2 className="text-lg font-bold uppercase tracking-wider text-gray-900">
        {children}
      </h2>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto bg-white text-gray-800 font-sans border border-gray-200 shadow-sm overflow-hidden">

      {/* Header */}
      <header className="p-8 md:p-10 border-b-4" style={{ borderColor: accentColor }}>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="flex-1 text-center sm:text-left">

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              {personal.full_name || "Your Name"}
            </h1>

            {personal.profession && (
              <p className="text-lg text-gray-500 font-medium mt-2">
                {personal.profession}
              </p>
            )}
          </div>
        </div>

        {/* Contact */}
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-5 border-t border-gray-200">
          {contacts.map(({ value, Icon }, index) =>
            value ? (
              <div key={index} className="flex items-center gap-3 text-xs text-gray-600 min-w-0">
                <Icon size={15} className="shrink-0" style={{ color: accentColor }} />
                <span className="break-all">{value}</span>
              </div>
            ) : null
          )}
        </div>
      </header>

      {/* Main */}
      <main className="p-8 md:p-10 space-y-8">

        {/* Summary */}
        {data.professional_summary && (
          <section>
            <SectionHeading icon={UserRound}>Professional Summary</SectionHeading>

            <p className="text-sm leading-7 text-gray-600 pl-[52px]">
              {data.professional_summary}
            </p>
          </section>
        )}

        {/* Experience Timeline */}
        {data.experience?.length > 0 && (
          <section>
            <SectionHeading icon={BriefcaseBusiness}>Work Experience</SectionHeading>

            <div className="ml-5 pl-8 border-l-2 space-y-7" style={{ borderColor: `${accentColor}40` }}>
              {data.experience.map((item, index) => (
                <div key={index} className="relative">
                  <div
                    className="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-white shadow-sm"
                    style={{ backgroundColor: accentColor }}
                  />

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {item.position}
                      </h3>

                      <p className="text-sm font-semibold mt-1" style={{ color: accentColor }}>
                        {item.company}
                      </p>
                    </div>

                    <span
                      className="text-xs px-3 py-1 rounded-full whitespace-nowrap h-fit"
                      style={{
                        color: accentColor,
                        backgroundColor: `${accentColor}12`,
                      }}
                    >
                      {formatDate(item.start_date)} -{" "}
                      {item.is_current ? "Present" : formatDate(item.end_date)}
                    </span>
                  </div>

                  {item.description && (
                    <p className="text-sm text-gray-600 leading-6 mt-3 whitespace-pre-line">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Timeline */}
        {data.education?.length > 0 && (
          <section>
            <SectionHeading icon={GraduationCap}>Education</SectionHeading>

            <div className="ml-5 pl-8 border-l-2 space-y-7" style={{ borderColor: `${accentColor}40` }}>
              {data.education.map((item, index) => (
                <div key={index} className="relative">
                  <div
                    className="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-white shadow-sm"
                    style={{ backgroundColor: accentColor }}
                  />

                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {item.degree}
                        {item.field ? ` in ${item.field}` : ""}
                      </h3>

                      <p className="text-sm text-gray-600 mt-1">
                        {item.institution}
                      </p>

                      <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                        {item.gpa && <span>GPA: {item.gpa}</span>}
                        {item.cgpa && <span>CGPA: {item.cgpa}</span>}
                      </div>
                    </div>

                    {item.graduation_date && (
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatDate(item.graduation_date)}
                      </span>
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
            <SectionHeading icon={FolderKanban}>Projects</SectionHeading>

            <div className="pl-[52px] space-y-4">
              {data.project.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center gap-2">
                    <CircleDot size={14} style={{ color: accentColor }} />
                    <h3 className="font-bold text-gray-900">
                      {item.name}
                    </h3>
                  </div>

                  {item.type && (
                    <p className="text-xs font-semibold mt-2" style={{ color: accentColor }}>
                      {item.type}
                    </p>
                  )}

                  {item.description && (
                    <p className="text-sm text-gray-600 leading-6 mt-2 whitespace-pre-line">
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
          <section>
            <SectionHeading icon={Code}>Skills</SectionHeading>

            <div className="pl-[52px] flex flex-wrap gap-3">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full text-xs font-semibold border"
                  style={{
                    color: accentColor,
                    borderColor: `${accentColor}50`,
                    backgroundColor: `${accentColor}0D`,
                  }}
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

export default TimelineTemplate;

