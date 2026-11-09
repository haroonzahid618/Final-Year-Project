
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  UserRound,
  BriefcaseBusiness,
  GraduationCap,
  FolderKanban,
  Code,
} from "lucide-react";

const ProfessionalDarkTemplate = ({
  data,
  accentColor = "#d4a853",
}) => {
  const personal = data?.personal_info || {};

  const formatDate = (date) => {
    if (!date) return "";

    const [year, month] = date.split("-");

    if (!year || !month) return date;

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
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{
          backgroundColor: `${accentColor}20`,
          color: accentColor,
        }}
      >
        <Icon size={18} />
      </div>

      <h2 className="text-base font-extrabold uppercase tracking-wide text-gray-900">
        {children}
      </h2>

      <div
        className="flex-1 h-px"
        style={{ backgroundColor: `${accentColor}60` }}
      />
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto bg-white text-gray-800 font-sans shadow-lg border border-gray-200 overflow-hidden">

      {/* HEADER */}
      <header className="relative bg-[#17202c] text-white px-7 md:px-10 pt-9 pb-8 overflow-hidden">

        {/* Decorative Shapes */}
        <div
          className="absolute top-0 right-0 w-40 h-40 opacity-20"
          style={{
            backgroundColor: accentColor,
            clipPath: "polygon(100% 0, 100% 100%, 0 0)",
          }}
        />

        <div
          className="absolute bottom-0 right-20 w-24 h-24 opacity-10"
          style={{
            backgroundColor: accentColor,
            clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
          }}
        />

        <div className="relative z-10">

          <div
            className="w-14 h-1 rounded-full mb-5"
            style={{ backgroundColor: accentColor }}
          />

          <h1 className="text-3xl md:text-4xl font-black tracking-tight break-words">
            {personal.full_name || "Your Name"}
          </h1>

          {personal.profession && (
            <p
              className="text-base md:text-lg font-semibold mt-2"
              style={{ color: accentColor }}
            >
              {personal.profession}
            </p>
          )}

          {/* Contact Details */}
          <div className="flex flex-wrap gap-x-6 gap-y-4 mt-8 border-t border-white/20 pt-6">
            {contacts.map(({ value, Icon }, index) =>
              value ? (
                <div
                  key={index}
                  className="flex items-center gap-2 min-w-0 max-w-full"
                >
                  <Icon
                    size={15}
                    className="shrink-0"
                    style={{ color: accentColor }}
                  />

                  <span className="text-xs text-gray-300 break-all">
                    {value}
                  </span>
                </div>
              ) : null
            )}
          </div>
        </div>
      </header>

      {/* MAIN BODY */}
      <div className="grid grid-cols-1 sm:grid-cols-[35%_65%]">

        {/* LEFT SIDEBAR */}
        <aside className="bg-[#f4f5f7] p-6 md:p-7 space-y-8">

          {/* Skills */}
          {data.skills?.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-5">
                <Code size={18} style={{ color: accentColor }} />

                <h2 className="text-sm font-extrabold uppercase tracking-wider text-gray-900">
                  Skills
                </h2>
              </div>

              <div className="space-y-3">
                {data.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: accentColor }}
                      />

                      <span className="text-xs font-semibold text-gray-700 break-words">
                        {skill}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education?.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-5">
                <GraduationCap size={19} style={{ color: accentColor }} />

                <h2 className="text-sm font-extrabold uppercase tracking-wider text-gray-900">
                  Education
                </h2>
              </div>

              <div className="space-y-6">
                {data.education.map((item, index) => (
                  <div
                    key={index}
                    className="border-l-2 pl-4 relative"
                    style={{ borderColor: `${accentColor}70` }}
                  >
                    <span
                      className="absolute -left-[5px] top-1 w-2 h-2 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />

                    <h3 className="text-sm font-bold text-gray-900 leading-5">
                      {item.degree}
                    </h3>

                    {item.field && (
                      <p className="text-xs text-gray-600 mt-1">
                        {item.field}
                      </p>
                    )}

                    <p className="text-xs text-gray-500 mt-2">
                      {item.institution}
                    </p>

                    {item.graduation_date && (
                      <p
                        className="text-xs font-semibold mt-2"
                        style={{ color: accentColor }}
                      >
                        {formatDate(item.graduation_date)}
                      </p>
                    )}

                    <div className="text-xs text-gray-500 mt-2 space-y-1">
                      {item.gpa && <p>GPA: {item.gpa}</p>}
                      {item.cgpa && <p>CGPA: {item.cgpa}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </aside>

        {/* RIGHT CONTENT */}
        <main className="p-6 md:p-8 space-y-8">

          {/* Summary */}
          {data.professional_summary && (
            <section>
              <Heading Icon={UserRound}>
                Professional Summary
              </Heading>

              <p className="text-sm text-gray-600 leading-7 whitespace-pre-line pl-1">
                {data.professional_summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {data.experience?.length > 0 && (
            <section>
              <Heading Icon={BriefcaseBusiness}>
                Experience
              </Heading>

              <div
                className="ml-3 pl-5 border-l-2 space-y-6"
                style={{ borderColor: `${accentColor}60` }}
              >
                {data.experience.map((item, index) => (
                  <div key={index} className="relative">

                    <span
                      className="absolute -left-[27px] top-1 w-3 h-3 rounded-full border-2 border-white"
                      style={{ backgroundColor: accentColor }}
                    />

                    <h3 className="text-sm font-bold text-gray-900">
                      {item.position}
                    </h3>

                    <p
                      className="text-sm font-semibold mt-1"
                      style={{ color: accentColor }}
                    >
                      {item.company}
                    </p>

                    <p className="text-xs text-gray-500 mt-2">
                      {formatDate(item.start_date)} -{" "}
                      {item.is_current
                        ? "Present"
                        : formatDate(item.end_date)}
                    </p>

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

          {/* Projects */}
          {data.project?.length > 0 && (
            <section>
              <Heading Icon={FolderKanban}>
                Projects
              </Heading>

              <div className="space-y-4">
                {data.project.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-gray-200 bg-white"
                    style={{
                      borderLeft: `3px solid ${accentColor}`,
                    }}
                  >
                    <h3 className="text-sm font-bold text-gray-900">
                      {item.name}
                    </h3>

                    {item.type && (
                      <p
                        className="text-xs font-semibold mt-2"
                        style={{ color: accentColor }}
                      >
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

        </main>
      </div>

      {/* FOOTER */}
      <div
        className="h-2"
        style={{ backgroundColor: accentColor }}
      />

    </div>
  );
};

export default ProfessionalDarkTemplate;

