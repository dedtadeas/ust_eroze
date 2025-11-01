import { HeroSection } from "@/components/HeroSection";
import { MapCard } from "@/components/MapCard";
import { ProjectDescription } from "@/components/ProjectDescription";
import { TeamMember } from "@/components/TeamSection";

const mapCards = [
    {
        href: "#/mapy/vodni-eroze",
        emoji: "💧",
        title: "Vodní eroze",
        description: "Analýzy a mapování eroze půdy působené deštěm a povrchovým odtokem"
    },
    {
        href: "#/mapy/eroze-tani-snehu",
        emoji: "❄️",
        title: "Eroze táním sněhu",
        description: "Analýzy a mapování tání sněhu a eroze půdy působené odtokem z tání sněhu"
    },
    {
        href: "#/mapy/vetrna-eroze",
        emoji: "🌬️",
        title: "Větrná eroze",
        description: "Analýzy a mapování eroze půdy působené větrem"
    },
    {
        href: "#/mapy/retence",
        emoji: "🌊",
        title: "Retence",
        description: "Podkladové mapy pro návrhy nízkonákladových retenčních prvků v krajině"
    }
];

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

export function Home() {
    return (
        <div className="flex-1 overflow-y-auto">
            <HeroSection 
                title="Mapový portál pro management zemědělské krajiny Ústeckého kraje"
                subtitle="Interaktivní mapy a aplikace pro efektivní management zemědělské krajiny Ústeckého kraje resp. povodí Ohře a dolního Labe."
                backgroundImage="images/banner_photo_narrow.png"
            />

            {/* Info Section */}
            <section className="py-16 bg-card">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-6 text-primary">
                            Vítejte na webovém portálu projektu RUR
                        </h2>
                        <div className="space-y-4 text-lg text-foreground/80">
                            <p>
                                <strong>Na těchto stránkách jsou k dispozici výstupy projektu RUR prezentované pomocí interaktivních map a mapových aplikací.</strong>
                            </p>
                            {/* <p className="text-base text-muted-foreground">
                                Pro správné zobrazení na mobilních zařízeních doporučujeme zapnout 
                                v menu internetového prohlížeče možnost "Stránky pro počítač".
                            </p> */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Details */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {mapCards.map((card) => (
                            <MapCard key={card.href} {...card} />
                        ))}
                    </div>

                    <ProjectDescription 
                        title="O projektu"
                        description="V rámci řešení projektu jsou vytvářeny podkladové prostorové geodatabáze pro zefektivnění rozhodovacích procesů Ústeckého kraje (resp. povodí Ohře a dolního Labe) a místních samospráv. Vytvořené mapové podklady jsou k dispozici na této webové mapové aplikaci. Tyto mapové podklady umožní efektivnější alokace finančních prostředků na adaptivní management zemědělské krajiny pro konkrétní lokality a pro konkrétní environmentální problémy dané lokality. Jedná se tedy o prostorovou diferenciaci řešení různých typů adaptačních opatření v krajině ústeckého kraje. Pro další zefektivnění a optimální vynaložení finančních prostředků je nutné vhodné dimenzování adaptivního managementu krajiny, resp. počet a velikost navrhovaných adaptačních opatření. Pro tyto účely budou řešené mapové podklady environmentálních rizik dimenzovány podle pravděpodobnosti opakování za N let (5, 10, 25, 50). Kromě dimenzování a prostorové diferenciace adaptivního managementu je klíčový také časový aspekt a to jak z hlediska výskytu v určité části roku, tak z hlediska predikce vývoje daného environmentálního rizika v následujících dekádách. Mapové podklady uvedených environmentálních rizik budou tedy vytvořeny pro jednotlivé měsíce a pro jednotlivé dekády do roku 2050. Tato časo-prostorová diferenciace environmentálních rizik umožní plně efektivní rozhodování o alokaci finančních prostředků a návrhu konkrétních typů adaptačních opatření, jejich dimenzování a jejich optimální rozložení v čase."
                        teamMembers={teamMembers}
                    /> 
                </div>
            </section>
        </div>
    )
}
