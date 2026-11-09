import { Check, Layout } from 'lucide-react';
import React, { useState } from 'react'




const TemplatesSelector = ({ selectTemplates, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const templates = [
    {
      id: "classic",
      name: "Classic",
    },
    {
      id: "modern",
      name: "Modern",
    },
    {
      id: "minimal",
      name: "Minimal",
    },
    {
      id: "minimal-image",
      name: "Minimal Image",
    },
    {
      id: "ats",
      name: "ATS Optimized",
    },
    {
      id: "executive",
      name: "Executive",
    },
    {
      id: "elegant",
      name: "Elegant",
    },
    {
      id: "creative",
      name: "Creative",
    },
    {
      id: "developer",
      name: "Developer",
    },
    {
      id: "twoColumn",
      name: "Two Column",
    },
    {
      id: "infographic",
      name: "Infographic",
    },
    {
      id: "professionalDark",
      name: "Professional Dark",
    },
    {
      id: "minimalBeige",
      name: "Minimal Beige",
    },
    {
      id: "modernGreen",
      name: "Modern Green",
    },
    {
      id: "modernOrange",
      name: "Modern Orange",
    },
    {
      id: "academic",
      name: "Academic",
    },
    {
      id: "compact",
      name: "Compact",
    },
    {
      id: "gradient",
      name: "Gradient",
    },
    {
      id: "timeline",
      name: "Timeline",
    },
    {
      id: "professionalPhoto",
      name: "Professional Photo",
    }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br
        from-blue-50 to-blue-100 transition-all px-3 py-2 rounded-lg"
      >
        <Layout size={14} />
        <span className="max-sm:hidden">Templates</span>
      </button>

      {isOpen && (
        <div
          className="absolute top-full w-52 p-3 mt-2 space-y-3 z-10 bg-white
           rounded-md border border-gray-200 shadow-sm max-h-[63vh] overflow-y-auto"
        >
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => {
                onChange(template.id);
                setIsOpen(false);
              }}
              className={`relative p-3 border rounded-full cursor-pointer transition-all
              ${selectTemplates === template.id
                  ? "border-blue-400 bg-blue-100"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"
                }`}
            >
              {selectTemplates === template.id && (
                <div className="absolute top-2.5 right-2">
                  <div className="size-5 bg-blue-400 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3  text-white" />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <h4 className="font-medium text-xs text-gray-800">{template.name}</h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplatesSelector;


