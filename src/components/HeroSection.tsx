interface HeroSectionProps {
    title: string;
    subtitle: string;
    backgroundImage: string;
}

export function HeroSection({ title, subtitle, backgroundImage }: HeroSectionProps) {
    return (
        <section 
            className="relative h-96 flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: `linear-gradient(rgba(20, 56, 127, 0.2), rgba(20, 56, 127, 0.2)), url("${backgroundImage}")`,
            }}
        >
            <div className="text-center px-4">
                <h1 className="text-5xl font-bold text-white mb-4">
                    {title}
                </h1>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                    {subtitle}
                </p>
            </div>
        </section>
    );
}
