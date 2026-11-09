
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  BriefcaseBusiness,
  FolderKanban,
  UserRound,
} from "lucide-react";

const ProfessionalPhotoTemplate = ({
  data,
  accentColor = "#1e293b",
}) => {
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

  const SidebarHeading = ({ children }) => (
    <h2
      className="text-[9px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-[2px] mb-3 sm:mb-4 pb-2 border-b"
      style={{ borderColor: "rgba(255,255,255,0.25)" }}
    >
      {children}
    </h2>
  );

  const MainHeading = ({ icon: Icon, children }) => (
    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
      <div
        className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-white shrink-0"
        style={{ backgroundColor: accentColor }}
      >
        <Icon size={16} />
      </div>

      <h2 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-900">
        {children}
      </h2>
    </div>
  );

  const profileImage =
    typeof personal.image === "string"
      ? personal.image
      : typeof File !== "undefined" && personal.image instanceof File
      ? URL.createObjectURL(personal.image)
      : null;

  return (
    <div className="w-full max-w-5xl mx-auto bg-white text-gray-800 font-sans shadow-sm border border-gray-200 overflow-hidden">

      {/* Both Columns */}
      <div className="grid grid-cols-[35%_65%] sm:grid-cols-[32%_68%]">

        {/* Sidebar */}
        <aside
          className="text-white p-2 sm:p-5 md:p-6 lg:p-8 min-w-0"
          style={{ backgroundColor: accentColor }}
        >

          {/* Profile */}
          <div className="text-center mb-5 sm:mb-8">

            {profileImage && (
              <div className="mb-3 sm:mb-5">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full border-2 sm:border-4 border-white/30 object-cover mx-auto"
                />
              </div>
            )}

            <h1 className="text-xs sm:text-xl lg:text-2xl font-bold mt-2 sm:mt-4 leading-snug break-words">
              {personal.full_name || "Your Name"}
            </h1>

            {personal.profession && (
              <p className="text-[9px] sm:text-sm text-white/70 mt-2 break-words">
                {personal.profession}
              </p>
            )}

          </div>

          {/* Contact Details */}
          <section className="mb-5 sm:mb-8 min-w-0">

            <SidebarHeading>
              Contact Details
            </SidebarHeading>

            <div className="space-y-2 sm:space-y-4">

              {contacts.map(({ value, Icon }, index) =>
                value ? (
                  <div
                    key={index}
                    className="flex items-start gap-1.5 sm:gap-3 min-w-0"
                  >
                    <Icon
                      size={12}
                      className="mt-1 shrink-0 text-white/70 sm:w-[15px] sm:h-[15px]"
                    />

                    <span className=" text-[8px] sm:text-[10px] leading-4 sm:leading-5 text-white/90 min-w-0 break-all">
                      {value}
                    </span>
                  </div>
                ) : null
              )}

            </div>
          </section>

          {/* Skills */}
          {data.skills?.length > 0 && (
            <section className="mb-5 sm:mb-8 min-w-0">

              <SidebarHeading>
                Skills
              </SidebarHeading>

              <div className="space-y-2 sm:space-y-3">

                {data.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-1.5 sm:gap-2 min-w-0"
                  >
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white/80 mt-1.5 shrink-0" />

                    <span className="text-[9px] sm:text-xs text-white/90 break-words min-w-0">
                      {skill}
                    </span>
                  </div>
                ))}

              </div>
            </section>
          )}

          {/* Education */}
          {data.education?.length > 0 && (
            <section className="min-w-0">

              <SidebarHeading>
                Education
              </SidebarHeading>

              <div className="space-y-4 sm:space-y-5">

                {data.education.map((item, index) => (
                  <div key={index} className="min-w-0">

                    <h3 className="text-[10px] sm:text-sm font-bold text-white break-words">
                      {item.degree}
                      {item.field ? ` in ${item.field}` : ""}
                    </h3>

                    <p className="text-[9px] sm:text-xs text-white/70 mt-1 break-words">
                      {item.institution}
                    </p>

                    {item.graduation_date && (
                      <p className="text-[9px] sm:text-xs text-white/60 mt-1">
                        {formatDate(item.graduation_date)}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2 sm:gap-3 mt-2 text-[9px] sm:text-xs text-white/80">
                      {item.gpa && <span>GPA: {item.gpa}</span>}
                      {item.cgpa && <span>CGPA: {item.cgpa}</span>}
                    </div>

                  </div>
                ))}

              </div>
            </section>
          )}

        </aside>

        {/* Main Content */}
        <main className="p-2 sm:p-5 md:p-6 lg:p-9 space-y-5 sm:space-y-8 min-w-0">

          {/* Professional Summary */}
          {data.professional_summary && (
            <section className="min-w-0">

              <MainHeading icon={UserRound}>
                Professional Profile
              </MainHeading>

              <p className="text-[10px] sm:text-sm text-gray-600 leading-5 sm:leading-7 break-words">
                {data.professional_summary}
              </p>

            </section>
          )}

          {/* Experience */}
          {data.experience?.length > 0 && (
            <section className="min-w-0">

              <MainHeading icon={BriefcaseBusiness}>
                Work Experience
              </MainHeading>

              <div className="space-y-4 sm:space-y-6">

                {data.experience.map((item, index) => (
                  <div
                    key={index}
                    className="relative pl-3 sm:pl-5 border-l-2 pb-1 min-w-0"
                    style={{ borderColor: `${accentColor}40` }}
                  >

                    <span
                      className="absolute -left-[6px] sm:-left-[7px] top-1 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 border-white"
                      style={{ backgroundColor: accentColor }}
                    />

                    <h3 className="text-[11px] sm:text-base font-bold text-gray-900 break-words">
                      {item.position}
                    </h3>

                    <p
                      className="text-[10px] sm:text-sm font-semibold mt-1 break-words"
                      style={{ color: accentColor }}
                    >
                      {item.company}
                    </p>

                    <span className="text-[9px] sm:text-xs text-gray-500">
                      {formatDate(item.start_date)} -{" "}
                      {item.is_current
                        ? "Present"
                        : formatDate(item.end_date)}
                    </span>

                    {item.description && (
                      <p className="text-[10px] sm:text-sm text-gray-600 leading-5 sm:leading-6 mt-2 sm:mt-3 whitespace-pre-line break-words">
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
            <section className="min-w-0">

              <MainHeading icon={FolderKanban}>
                Projects
              </MainHeading>

              <div className="space-y-3 sm:space-y-4">

                {data.project.map((item, index) => (
                  <div
                    key={index}
                    className="p-2 sm:p-4 rounded-lg bg-gray-50 border border-gray-100 min-w-0"
                  >

                    <h3 className="text-[11px] sm:text-base font-bold text-gray-900 break-words">
                      {item.name}
                    </h3>

                    {item.type && (
                      <p
                        className="text-[9px] sm:text-xs font-semibold mt-1 break-words"
                        style={{ color: accentColor }}
                      >
                        {item.type}
                      </p>
                    )}

                    {item.description && (
                      <p className="text-[10px] sm:text-sm text-gray-600 leading-5 sm:leading-6 mt-2 whitespace-pre-line break-words">
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
    </div>
  );
};

export default ProfessionalPhotoTemplate;
