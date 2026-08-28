export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b-0 border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between text-sm font-medium">
        <div className="flex items-center gap-8">
          <a href="/" className="font-semibold text-lg tracking-tight hover:opacity-80 transition-opacity">VBace</a>
          <div className="hidden md:flex gap-6 text-muted-foreground">
            <a href="/services" className="hover:text-foreground transition-colors">Services</a>
            <a href="/du-an" className="hover:text-foreground transition-colors">Dự án nổi bật</a>
            <a href="/blog" className="hover:text-foreground transition-colors">Blog</a>
          </div>
        </div>
        <div>
          <a href="#contact" className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full hover:bg-primary/90 transition-all shadow-sm">
            Start Project
          </a>
        </div>
      </div>
    </nav>
  );
}
