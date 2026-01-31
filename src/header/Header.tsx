

const Header = () => {
    return (
        <header className="w-full flex justify-center py-6 bg-white/80 backdrop-blur-md border-b border-border shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    JWT Playground
                </h1>
                {/* Placeholder for future nav items */}
            </div>
        </header>
    )
}

export default Header;