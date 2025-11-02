import { TeamSection, TeamMember } from "../components/TeamSection";

const teamMembers: TeamMember[] = [
    {
        name: "Ing. Jiří Brychta,Ph.D.",
        title: "",
        position: "Řešitel sekce adaptivního managementu krajiny",
        photo: "images/team/brychta.png",
        description: "Erodologie, hydrologie, aplikace GIS v životním prostředí"
    },
    {
        name: "Ing. Tadeáš Děd",
        title: "",
        position: "GIS specialista",
        photo: "images/team/ded.jpeg",
        description: "Prostorové analýzy, mapový portál, IT podpora"
    },
    {
        name: "Ing. Jakub Vosátka,Ph.D.",
        title: "",
        position: "Vedoucí sekce Znalostní Hub",
        photo: "images/team/vosatka.png",
        description: "Ekonomika a ochrana životního prostředí"
    },
    {
        name: "doc. Ing. Jan Pacina,Ph.D.",
        title: "",
        position: "GIS specialista",
        photo: "images/team/pacina.png",
        description: "Morfometrické analýzy, geoinformační technologie, prostorové analýzy"
    },
    {
        name: "Mgr. et Ing. Petr Novák",
        title: "",
        position: "Vedoucí Katedry geoinformatiky",
        photo: "images/team/novak.png",
        description: "Mapový portál, prostorové analýzy"
    },
    {
        name: "Ing. Jan Popelka, Ph.D.",
        title: "",
        position: "Statistik",
        photo: "images/team/popelka.png",
        description: "Statistické a geostatistické analýzy"
    }
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
                            Odborníci pracující na projektu RUR - sekce adaptivní management krajiny
                        </p>
                    </div>

                    <TeamSection members={teamMembers} />
                </div>
            </section>
        </div>
    );
}
