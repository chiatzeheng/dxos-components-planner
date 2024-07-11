import React, { useContext } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeContext } from '../lib/context';

type HeaderProps = {
    onInviteClick: () => void;
};

const Header = ({ onInviteClick }: HeaderProps) => {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <div className="mr-4 hidden md:flex">
                    {/* <a className="mr-6 flex items-center space-x-2" href="/">
                        <span className="hidden font-bold sm:inline-block">MyApp</span>
                    </a> */}
                    {/* <nav className="flex items-center space-x-6 text-sm font-medium">
                        <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/docs">Docs</a>
                        <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/components">Components</a>
                        <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/examples">Examples</a>
                    </nav> */}
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <Button variant="ghost" className="w-9 px-0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </Button>
                    </div>
                    <nav className="flex items-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="w-9 px-0">
                                    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                    <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                    <span className="sr-only">Toggle theme</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setTheme("light")}>
                                    Light
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("dark")}>
                                    Dark
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("system")}>
                                    System
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </nav>
                    <Button onClick={onInviteClick} size="sm">
                        Invite
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;