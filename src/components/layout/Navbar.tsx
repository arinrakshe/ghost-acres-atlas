import { Link } from "react-router-dom";
import { ArrowLeft, Zap, BarChart3, AlertTriangle } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4 pointer-events-none">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors pointer-events-auto">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-primary" />
                </div>
                <span className="font-mono text-lg font-bold tracking-tight">GHOST ACRES ATLAS</span>
            </Link>
            <div className="flex items-center gap-3 pointer-events-auto">
                <Link
                    to="/crisis"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-red-500 border border-border hover:border-red-500/50 rounded-md transition-colors bg-background/50 backdrop-blur"
                >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Crisis Sim
                </Link>
                <Link
                    to="/compare"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary border border-border hover:border-primary/50 rounded-md transition-colors bg-background/50 backdrop-blur"
                >
                    <BarChart3 className="w-3.5 h-3.5" />
                    Compare
                </Link>
            </div>
        </nav>
    );
}
