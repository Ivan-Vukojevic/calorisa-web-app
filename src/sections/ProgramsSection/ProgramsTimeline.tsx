import ProgramStep from './ProgramStep';

interface Section {
  id: string;
  number: number;
  heading: string;
  description: React.ReactNode;
  position: string;
}

interface ProgramsTimelineProps {
  sections: Section[];
}

function ProgramsTimeline({ sections }: ProgramsTimelineProps): JSX.Element {
  return (
    <div className="hidden lg:block relative">
      {sections.map((step, index) => (
        <ProgramStep 
          key={step.id} 
          step={step} 
          index={index} 
          sectionsLength={sections.length}
        />
      ))}
    </div>
  );
}

export default ProgramsTimeline;
