
import React from "react";
import {
  Mail, Phone, MapPin, Linkedin, Globe,
  UserRound, BriefcaseBusiness, GraduationCap,
  FolderKanban, Code
} from "lucide-react";

const ModernGreenTemplate = ({ data = {}, accentColor = "#f97316" }) => {
  const personal = data?.personal_info || {};

  const keepTogether = {
    breakInside: "avoid",
    pageBreakInside: "avoid",
  };

  const headingStyle = {
    breakAfter: "avoid",
    pageBreakAfter: "avoid",
  };

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
    <div
      className="flex items-center gap-3 mb-5"
      style={headingStyle}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0"
        style={{ backgroundColor: accentColor }}
      >
        <Icon size={17} />
      </div>

      <h2 className="text-base font-extrabold text-gray-900">
        {children}
      </h2>

      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto bg-white text-gray-800 font-sans border border-gray-200 shadow-sm overflow-visible">

      {/* Top Border */}
      <div className="relative h-3 bg-gray-900">
        <div
          className="absolute left-0 top-0 h-full w-1/3"
          style={{ backgroundColor: accentColor }}
        />
      </div>

      {/* Header */}
      <header
        className="px-7 md:px-10 pt-9 pb-7 text-center"
        style={keepTogether}
      >

        <h1 className="text-3xl md:text-4xl font-black text-gray-900 break-words">
          {personal.full_name || "Your Name"}
        </h1>

        {personal.profession && (
          <p
            className="text-base font-semibold mt-2"
            style={{ color: accentColor }}
          >
            {personal.profession}
          </p>
        )}

        <div
          className="w-16 h-1 mx-auto mt-5 rounded-full"
          style={{ backgroundColor: accentColor }}
        />

        {/* Contact */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-7">
          {contacts.map(({ value, Icon }, index) =>
            value ? (
              <div key={index} className="flex items-center gap-2 min-w-0">
                <Icon
                  size={14}
                  className="shrink-0"
                  style={{ color: accentColor }}
                />

                <span className="text-xs text-gray-600 break-all">
                  {value}
                </span>
              </div>
            ) : null
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="px-7 md:px-10 py-7 space-y-8">

        {/* Summary */}
        {data.professional_summary && (
          <section>
            <Heading Icon={UserRound}>
              Professional Summary
            </Heading>

            <p
              className="text-sm text-gray-600 leading-7 pl-12 whitespace-pre-line"
              style={keepTogether}
            >
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

            <div className="ml-4 pl-7 border-l-2 border-gray-200 space-y-6">
              {data.experience.map((item, index) => (
                <div
                  key={index}
                  className="relative"
                  style={keepTogether}
                >
                  <span
                    className="absolute -left-[35px] top-1 w-3 h-3 rounded-full border-2 border-white"
                    style={{ backgroundColor: accentColor }}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">
                        {item.position}
                      </h3>

                      <p
                        className="text-sm font-semibold mt-1"
                        style={{ color: accentColor }}
                      >
                        {item.company}
                      </p>
                    </div>

                    <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-md h-fit whitespace-nowrap">
                      {formatDate(item.start_date)} -{" "}
                      {item.is_current
                        ? "Present"
                        : formatDate(item.end_date)}
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

        {/* Education */}
        {data.education?.length > 0 && (
          <section>
            <Heading Icon={GraduationCap}>
              Education
            </Heading>

            <div className="space-y-5 pl-12">
              {data.education.map((item, index) => (
                <div
                  key={index}
                  style={keepTogether}
                >
                  <h3 className="text-sm font-bold text-gray-900">
                    {item.degree}
                    {item.field ? ` in ${item.field}` : ""}
                  </h3>

                  <p className="text-sm text-gray-600 mt-1">
                    {item.institution}
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-2">
                    {item.graduation_date && (
                      <span>{formatDate(item.graduation_date)}</span>
                    )}

                    {item.gpa && (
                      <span>GPA: {item.gpa}</span>
                    )}

                    {item.cgpa && (
                      <span>CGPA: {item.cgpa}</span>
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
            <Heading Icon={Code}>
              Skills
            </Heading>

            <div className="flex flex-wrap gap-3 pl-12">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="text-xs font-semibold text-gray-700 px-3 py-2 rounded-md bg-gray-50 border border-gray-200"
                >
                  {skill}
                </span>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-12">
              {data.project.map((item, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg"
                  style={keepTogether}
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
  );
};

export default ModernGreenTemplate;
