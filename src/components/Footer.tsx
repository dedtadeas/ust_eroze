export function Footer() {
    return (
        <footer className="border-t bg-card px-4 py-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
                <p>© 2025 UJEP</p>
                <div className="flex gap-3">
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