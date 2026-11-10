import React from 'react'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import ModernTemplate from './templates/ModernTemplate'
import ClassicTemplate from './templates/ClassicTemplate'
import AtsTemplate from './templates/AtsTemplate'
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import ElegantTemplate from './templates/ElegantTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import DeveloperTemplate from './templates/DeveloperTemplate';
import TwoColumnTemplate from './templates/TwoColumnTemplate';
import InfographicTemplate from './templates/InfographicTemplate';
import ProfessionalDarkTemplate from './templates/ProfessionalDarkTemplate';
import MinimalBeigeTemplate from './templates/MinimalBeigeTemplate';
import ModernGreenTemplate from './templates/ModernGreenTemplate';
import ModernOrangeTemplate from './templates/ModernOrangeTemplate';
import AcademicTemplate from './templates/AcademicTemplate';
import CompactTemplate from './templates/CompactTemplate';
import GradientTemplate from './templates/GradientTemplate';
import TimelineTemplate from './templates/TimelineTemplate';
import ProfessionalPhotoTemplate from './templates/ProfessionalPhotoTemplate';


const ResumePreview = ({ data, templates, accentColor, classes = '' }) => {

    const renderTemplates = () => {
        switch (templates) {
            case 'modern':
                return <ModernTemplate data={data} accentColor={accentColor} />;
            case 'minimal':
                return <MinimalTemplate data={data} accentColor={accentColor} />;
            case 'minimal-image':
                return <MinimalImageTemplate data={data} accentColor={accentColor} />;
             case 'ats':
             return <AtsTemplate data={data} accentColor={accentColor} />;
             case 'executive':
                return <ExecutiveTemplate data={data} accentColor={accentColor} />;

            case 'elegant':
                return <ElegantTemplate data={data} accentColor={accentColor} />;

            case 'creative':
                return <CreativeTemplate data={data} accentColor={accentColor} />;

            case 'developer':
                return <DeveloperTemplate data={data} accentColor={accentColor} />;

            case 'twoColumn':
                return <TwoColumnTemplate data={data} accentColor={accentColor} />;

            case 'infographic':
                return <InfographicTemplate data={data} accentColor={accentColor} />;

            case 'professionalDark':
                return <ProfessionalDarkTemplate data={data} accentColor={accentColor} />;

            case 'minimalBeige':
                return <MinimalBeigeTemplate data={data} accentColor={accentColor} />;

            case 'modernGreen':
                return <ModernGreenTemplate data={data} accentColor={accentColor} />;

            case 'modernOrange':
                return <ModernOrangeTemplate data={data} accentColor={accentColor} />;

            case 'academic':
                return <AcademicTemplate data={data} accentColor={accentColor} />;

            case 'compact':
                return <CompactTemplate data={data} accentColor={accentColor} />;

            case 'gradient':
                return <GradientTemplate data={data} accentColor={accentColor} />;

            case 'timeline':
                return <TimelineTemplate data={data} accentColor={accentColor} />;

            case 'professionalPhoto':
                return <ProfessionalPhotoTemplate data={data} accentColor={accentColor} />;

            default:
                return <ClassicTemplate data={data} accentColor={accentColor} />;
        }
    }
    return (
        <div className='w-full bg-gray-100'>
            <div id='resume-preview' className={"border border-gray-200 print:shadow-none print:border-none"
                + classes
            }>
                {renderTemplates()}
            </div>
          
          



{/* <style jsx global>{`
    @page {
        size: A4;
        margin: 0;
    }

    @media print {
        html, body {
            width: 100%;
            height: auto;
            overflow: visible;
        }

        body *:not(#resume-preview, #resume-preview *) {
            visibility: hidden;
        }

        #resume-preview,
        #resume-preview * {
            visibility: visible;
        }

        #resume-preview {
            position: absolute;
            inset: 0;
            width: 100%;
            height: auto;
            margin: 0;
            padding: 15mm 10mm 10mm 10mm;
            overflow: visible;
            border: none;
            box-shadow: none;
            box-sizing: border-box;
        }

        .resume-section {
            break-inside: avoid;
        }

        h1, h2, h3 {
            break-after: avoid;
        }
    }
`}</style> */}

<style>{`
    @page {
        size: A4;
        margin: 0;
    }

    @media print {

        * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
        }

        html, body {
            width: 100%;
            height: auto;
            margin: 0 !important;
            padding: 0 !important;
            overflow: visible !important;
            background: white !important;
        }

        body * {
            visibility: hidden;
        }

        #resume-preview,
        #resume-preview * {
            visibility: visible;
        }

        #resume-preview {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            max-width: none;
            height: auto;
            margin: 0;
            overflow: visible;
            border: none !important;
            box-shadow: none !important;
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }

        .resume-section {
            break-inside: avoid;
            page-break-inside: avoid;
        }

        h1, h2, h3 {
            break-after: avoid;
            page-break-after: avoid;
        }

        button {
            display: none !important;
        }
    }
`}</style>







        </div>
    )
}

export default ResumePreview
