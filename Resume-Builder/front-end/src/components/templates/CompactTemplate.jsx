
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
} from "lucide-react";

const CompactTemplate = ({ data, accentColor = "#334155" }) => {
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

  const SectionTitle = ({ icon: Icon, children }) => (
    <div className="flex items-center gap-2 mb-3 border-b pb-2" style={{ borderColor: `${accentColor}40` }}>
      <Icon size={16} style={{ color: accentColor }} />
      <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800">
        {children}
      </h2>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto bg-white text-gray-800 font-sans border border-gray-200 shadow-sm p-6 md:p-8">

      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-5 border-b-2" style={{ borderColor: accentColor }}>

        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            {personal.full_name || "Your Name"}
          </h1>

          {personal.profession && (
            <p className="text-sm font-semibold mt-1" style={{ color: accentColor }}>
              {personal.profession}
            </p>
          )}

          <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 mt-3">
            {contacts.map(({ value, Icon }, index) =>
              value ? (
                <div key={index} className="flex items-center gap-1.5 text-[11px] text-gray-600 min-w-0">
                  <Icon size={12} className="shrink-0" style={{ color: accentColor }} />
                  <span className="break-all">{value}</span>
                </div>
              ) : null
            )}
          </div>
        </div>
      </header>

      {/* Summary */}
      {data.professional_summary && (
        <section className="mt-5">
          <SectionTitle icon={UserRound}>Professional Summary</SectionTitle>
          <p className="text-xs leading-6 text-gray-600">
            {data.professional_summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className="mt-5">
          <SectionTitle icon={BriefcaseBusiness}>Work Experience</SectionTitle>

          <div className="space-y-4">
            {data.experience.map((item, index) => (
              <div key={index}>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">
                      {item.position}
                    </h3>
                    <p className="text-xs font-semibold" style={{ color: accentColor }}>
                      {item.company}
                    </p>
                  </div>

                  <span className="text-[11px] text-gray-500 whitespace-nowrap">
                    {formatDate(item.start_date)} -{" "}
                    {item.is_current ? "Present" : formatDate(item.end_date)}
                  </span>
                </div>

                {item.description && (
                  <p className="text-xs text-gray-600 leading-5 mt-2 whitespace-pre-line">
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
        <section className="mt-5">
          <SectionTitle icon={FolderKanban}>Projects</SectionTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {data.project.map((item, index) => (
              <div key={index}>
                <h3 className="text-xs font-bold text-gray-900">
                  {item.name}
                </h3>

                {item.type && (
                  <p className="text-[11px] font-semibold mt-1" style={{ color: accentColor }}>
                    {item.type}
                  </p>
                )}

                {item.description && (
                  <p className="text-xs text-gray-600 leading-5 mt-1 whitespace-pre-line">
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
        <section className="mt-5">
          <SectionTitle icon={GraduationCap}>Education</SectionTitle>

          <div className="space-y-3">
            {data.education.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <div>
                  <h3 className="text-xs font-bold text-gray-900">
                    {item.degree}
                    {item.field ? ` in ${item.field}` : ""}
                  </h3>

                  <p className="text-xs text-gray-600 mt-1">
                    {item.institution}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-1 text-[11px] text-gray-500">
                    {item.gpa && <span>GPA: {item.gpa}</span>}
                    {item.cgpa && <span>CGPA: {item.cgpa}</span>}
                  </div>
                </div>

                {item.graduation_date && (
                  <span className="text-[11px] text-gray-500 whitespace-nowrap">
                    {formatDate(item.graduation_date)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section className="mt-5">
          <SectionTitle icon={Code}>Technical Skills</SectionTitle>

          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded text-[11px] font-semibold"
                style={{
                  color: accentColor,
                  backgroundColor: `${accentColor}12`,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CompactTemplate;

