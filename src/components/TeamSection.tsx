interface TeamMember {
    name: string;
    title: string;
    position: string;
    photo: string;
    description: string;
}

interface TeamSectionProps {
    members: TeamMember[];
}

export function TeamSection({ members }: TeamSectionProps) {
    return (
        <div className="bg-card p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-6 pb-2">Řešitelský tým</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member) => (
                    <div key={member.name} className="flex flex-col items-center text-center">
                        <div className="w-32 h-32 mb-4 rounded-full overflow-hidden bg-muted">
                            <img 
                                src={member.photo} 
                                alt={member.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                        <p className="text-sm text-primary mb-1">{member.title}</p>
                        <p className="text-sm text-muted-foreground mb-3">{member.position}</p>
                        <p className="text-sm text-foreground/70">{member.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export type { TeamMember };
