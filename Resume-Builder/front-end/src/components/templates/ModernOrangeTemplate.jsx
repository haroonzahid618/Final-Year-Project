

import React from "react";
import {
  Mail, Phone, MapPin, Linkedin, Globe,
  UserRound, BriefcaseBusiness, GraduationCap,
  FolderKanban, Code
} from "lucide-react";

const ModernOrangeTemplate = ({ data, accentColor = "#f97316" }) => {
  const personal = data?.personal_info || {};

  const formatDate = (date) => {
    if (!date) return "";
    const [year, month] = date.split("-");
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

  const Heading = ({ Icon, children }) => (
    <div className="flex items-center gap-3 mb-5">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0"
        style={{ backgroundColor: accentColor }}
      >
        <Icon size={17} />
      </div>
      <h2 className="text-base font-extrabold text-gray-900 uppercase">
        {children}
      </h2>
      <div className="flex-1 h-px" style={{ backgroundColor: `${accentColor}60` }} />
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto bg-white text-gray-800 font-sans border border-gray-200 shadow-sm overflow-hidden relative">

      {/* Decorative Corners */}
      <div
        className="absolute top-0 right-0 w-32 h-32"
        style={{
          backgroundColor: accentColor,
          clipPath: "polygon(100% 0, 100% 100%, 0 0)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-28 h-28"
        style={{
          backgroundColor: accentColor,
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
        }}
      />

      {/* Header */}
      <header className="relative px-7 md:px-10 pt-9 pb-7">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 break-words">
          {personal.full_name || "Your Name"}
        </h1>

        {personal.profession && (
          <p className="font-bold mt-2 text-base" style={{ color: accentColor }}>
            {personal.profession}
          </p>
        )}

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-gray-200 pt-5 pr-8">
          {contacts.map(({ value, Icon }, index) =>
            value ? (
              <div key={index} className="flex items-center gap-2 min-w-0">
                <Icon size={14} className="shrink-0" style={{ color: accentColor }} />
                <span className="text-xs text-gray-600 break-all">{value}</span>
              </div>
            ) : null
          )}
        </div>
      </header>

      <main className="px-7 md:px-10 py-5 space-y-8 relative z-10">

        {/* Summary */}
        {data.professional_summary && (
          <section>
            <Heading Icon={UserRound}>About Me</Heading>
            <p className="text-sm text-gray-600 leading-7 pl-12 whitespace-pre-line">
              {data.professional_summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section>
            <Heading Icon={BriefcaseBusiness}>Experience</Heading>

            <div className="ml-4 pl-7 border-l-2 space-y-6"
              style={{ borderColor: `${accentColor}40` }}>
              {data.experience.map((item, index) => (
                <div key={index} className="relative">
                  <span
                    className="absolute -left-[35px] top-1 w-3 h-3 rounded-full border-2 border-white"
                    style={{ backgroundColor: accentColor }}
                  />

                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{item.position}</h3>
                      <p className="text-sm font-semibold mt-1" style={{ color: accentColor }}>
                        {item.company}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(item.start_date)} - {item.is_current ? "Present" : formatDate(item.end_date)}
                    </span>
                  </div>

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

        {/* Projects */}
        {data.project?.length > 0 && (
          <section>
            <Heading Icon={FolderKanban}>Projects</Heading>
            <div className="space-y-4 pl-12">
              {data.project.map((item, index) => (
                <div key={index} className="border-b border-gray-100 pb-3">
                  <h3 className="text-sm font-bold text-gray-900">{item.name}</h3>
                  {item.type && (
                    <p className="text-xs font-semibold mt-1" style={{ color: accentColor }}>
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

        {/* Education */}
        {data.education?.length > 0 && (
          <section>
            <Heading Icon={GraduationCap}>Education</Heading>
            <div className="space-y-4 pl-12">
              {data.education.map((item, index) => (
                <div key={index}>
                  <h3 className="text-sm font-bold text-gray-900">
                    {item.degree}{item.field ? ` in ${item.field}` : ""}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">{item.institution}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-2">
                    {item.graduation_date && <span>{formatDate(item.graduation_date)}</span>}
                    {item.gpa && <span>GPA: {item.gpa}</span>}
                    {item.cgpa && <span>CGPA: {item.cgpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills?.length > 0 && (
          <section>
            <Heading Icon={Code}>Skills</Heading>
            <div className="flex flex-wrap gap-2 pl-12">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-2 text-xs font-semibold rounded-md border"
                  style={{
                    color: accentColor,
                    borderColor: `${accentColor}60`,
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

export default ModernOrangeTemplate;
