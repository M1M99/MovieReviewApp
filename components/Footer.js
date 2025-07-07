function Footer() {
    return (
        <footer className="flex justify-center bg-gray-900 text-white p-5" style={{fontFamily:"var(--font-space--grotesk)"}}>
            <p>© {new Date().getFullYear()} Movie Reviews App</p>
        </footer>
    )
}

export default Footer
