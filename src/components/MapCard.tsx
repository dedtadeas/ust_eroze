interface MapCardProps {
    href: string;
    emoji: string;
    title: string;
    description: string;
}

export function MapCard({ href, emoji, title, description }: MapCardProps) {
    return (
        <a 
            href={href}
            className="bg-card p-6 rounded-lg border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/20"
        >
            <div className="text-4xl mb-4">{emoji}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
        </a>
    );
}
