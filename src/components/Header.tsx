import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

export function Header() {
    return (
        <Navbar
            expand="md"
            sticky="top"
            className="border-bottom shadow-sm"
            style={{
                backgroundColor: "hsl(var(--card))",
                backdropFilter: "blur(12px)",
            }}
        >
            <Container fluid className="px-4">
                {/* === LOGO === */}
                <Navbar.Brand href="#/">
                    <div className="d-flex align-items-center gap-2">
                        <div
                            className="d-flex align-items-center justify-content-center rounded"
                            style={{
                                width: "40px",
                                height: "40px",
                                backgroundColor: "hsla(var(--primary), 0.1)",
                            }}
                        >
                            <span style={{ fontSize: "1.5rem" }}>🗺️</span>
                        </div>
                        <div className="d-none d-sm-block">
                            <div
                                style={{
                                    fontSize: "1.125rem",
                                    fontWeight: 600,
                                    lineHeight: 1.2,
                                    color: "hsl(var(--foreground))",
                                }}
                            >
                                Mapový portál eroze půdy
                            </div>
                            <div
                                style={{
                                    fontSize: "0.75rem",
                                    color: "hsl(var(--muted-foreground))",
                                }}
                            >
                                UJEP
                            </div>
                        </div>
                    </div>
                </Navbar.Brand>

                <Navbar.Toggle
                    aria-controls="main-navbar-nav"
                    className="border-0"
                    style={{
                        filter: "invert(1)",
                    }}
                />

                {/* === MENU === */}
                <Navbar.Collapse id="main-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link
                            href="#/"
                            className="px-3 fw-medium"
                            style={{
                                color: "hsl(var(--foreground))",
                            }}
                        >
                            Domů
                        </Nav.Link>

                        <NavDropdown
                            title="Mapy"
                            id="mapy-dropdown"
                            className="px-3"
                            align="end" // ✅ ensures dropdown aligns to right side
                            menuVariant="dark"
                            style={{
                                color: "hsl(var(--foreground))",
                            }}
                        >
                            <div className="dropdown-menu-custom">
                                <NavDropdown.Item href="#/mapy/vodni-eroze">
                                    💧 Vodní eroze
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#/mapy/eroze-tani-snehu">
                                    ❄️ Eroze táním sněhu
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#/mapy/vetrna-eroze">
                                    🌬️ Větrná eroze
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#/mapy/retence">
                                    📁 Retence
                                </NavDropdown.Item>
                            </div>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
