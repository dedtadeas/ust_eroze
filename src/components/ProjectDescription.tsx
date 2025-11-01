import { TeamSection, TeamMember } from "./TeamSection";

interface ProjectDescriptionProps {
    title: string;
    description: string;
    teamMembers?: TeamMember[];
}

export function ProjectDescription({ title, description, teamMembers }: ProjectDescriptionProps) {
    return (
        <>
            <div className="bg-card p-8 rounded-lg border">
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <p className="text-foreground/80 leading-relaxed">
                    {description}
                </p>


            {teamMembers && teamMembers.length > 0 && (
                <TeamSection members={teamMembers} />
                )}
            </div>
        </>
    );
}
