import { TeamSection, TeamMember } from "../components/TeamSection";

const teamMembers: TeamMember[] = [
    {
        name: "Jan Novák",
        title: "Ph.D.",
        position: "Vedoucí projektu",
        photo: "images/team/novak.jpeg",
        description: "Hlavní koordinátor projektu, specialista na vodní erozi"
    },
    {
        name: "Eva Svobodová",
        title: "Ph.D.",
        position: "GIS specialista",
        photo: "images/team/novak.jpeg",
        description: "Tvorba mapových podkladů a prostorových analýz"
    },
    // Add more team members here
];

export function Team() {
    return (
        <div className="flex-1 overflow-y-auto">
            <section className="py-16 bg-background">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4 text-primary">
                            Řešitelský tým
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Odborníci pracující na projektu RUR
                        </p>
                    </div>

                    <TeamSection members={teamMembers} />
                </div>
            </section>
        </div>
    );
}
