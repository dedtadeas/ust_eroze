export function Home() {
    return (
        <div className="flex-1 overflow-y-auto">
            {/* Hero Section */}
            <section 
                className="relative h-96 flex items-center justify-center bg-cover bg-center"
                style={{
                    backgroundImage: 'linear-gradient(rgba(20, 56, 127, 0.2), rgba(20, 56, 127, 0.2)), url("images/banner_photo_narrow.png")',
                }}
            >
                <div className="text-center px-4">
                    <h1 className="text-5xl font-bold text-white mb-4">
                        Mapové výstupy projektu PERUN
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        Interaktivní mapy a aplikace pro výzkum klimatických extrémů a eroze půdy
                    </p>
                </div>
            </section>

            {/* Info Section */}
            <section className="py-16 bg-card">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-6 text-primary">
                            O projektu
                        </h2>
                        <div className="space-y-4 text-lg text-foreground/80">
                            <p>
                                <strong>Na těchto stránkách jsou k dispozici výstupy projektu PERUN 
                                prezentované pomocí interaktivních map a mapových aplikací.</strong>
                            </p>
                            <p className="text-base text-muted-foreground">
                                Pro správné zobrazení na mobilních zařízeních doporučujeme zapnout 
                                v menu internetového prohlížeče možnost "Stránky pro počítač".
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Details */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        <a 
                            href="#/mapy/vodni-eroze" 
                            className="bg-card p-6 rounded-lg border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/20"
                        >
                            <div className="text-4xl mb-4">💧</div>
                            <h3 className="text-xl font-semibold mb-2">Vodní eroze</h3>
                            <p className="text-muted-foreground text-sm">Analýza a mapování vodní eroze půdy</p>
                        </a>
                        <a 
                            href="#/mapy/eroze-tani-snehu" 
                            className="bg-card p-6 rounded-lg border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/20"
                        >
                            <div className="text-4xl mb-4">❄️</div>
                            <h3 className="text-xl font-semibold mb-2">Eroze táním sněhu</h3>
                            <p className="text-muted-foreground text-sm">Monitoring eroze způsobené táním sněhu</p>
                        </a>
                        <a 
                            href="#/mapy/vetrna-eroze" 
                            className="bg-card p-6 rounded-lg border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/20"
                        >
                            <div className="text-4xl mb-4">🌬️</div>
                            <h3 className="text-xl font-semibold mb-2">Větrná eroze</h3>
                            <p className="text-muted-foreground text-sm">Studie větrné eroze a její prevence</p>
                        </a>
                        <a 
                            href="#/mapy/retence" 
                            className="bg-card p-6 rounded-lg border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/20"
                        >
                            <div className="text-4xl mb-4">🌊</div>
                            <h3 className="text-xl font-semibold mb-2">Retence</h3>
                            <p className="text-muted-foreground text-sm">Mapování retenční schopnosti krajiny</p>
                        </a>
                    </div>

                    <div className="bg-card p-8 rounded-lg border">
                        <h2 className="text-2xl font-bold mb-4">O projektu PERUN</h2>
                        <p className="text-foreground/80 mb-6 leading-relaxed">
                            Projekt PERUN je zaměřen na výzkum klimatických extrémů, sucha a důsledků 
                            jeho prohlubování v České republice. Garantem projektu je Ministerstvo 
                            životního prostředí a kromě ČHMÚ jsou řešiteli projektu Česká geologická 
                            služba, Matematicko-fyzikální fakulta a Přírodovědecká fakulta Univerzity 
                            Karlovy, Ústav fyziky atmosféry AV ČR, v. v. i., Ústav výzkumu globální 
                            změny AV ČR, v. v. i., Výzkumný ústav vodohospodářský T. G. Masaryka, 
                            v. v. i. a PROGEO, s. r. o.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <span className="text-2xl">🔗</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">
                                    Více podrobností o projektu je možné najít na webových stránkách:
                                </p>
                                <a 
                                    href="https://www.perun-klima.cz/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-xl font-semibold text-primary hover:underline"
                                >
                                    www.perun-klima.cz
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
