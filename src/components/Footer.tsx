export function Footer() {
    return (
        <footer className="border-t bg-card px-6 py-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <p>© 2025 Univerzita J. E. Purkyně v Ústí nad Labem</p>
                <div className="flex gap-4">
                    <a href="#/o-projektu" className="hover:text-foreground transition-colors">
                        O projektu
                    </a>
                    <a href="#/kontakt" className="hover:text-foreground transition-colors">
                        Kontakt
                    </a>
                    <a href="https://www.ujep.cz" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                        UJEP
                    </a>
                </div>
            </div>
        </footer>
    );
}