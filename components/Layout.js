

function Layout({ children }) {
    return (
        <>

            <main className='w-full min-h-screen bg-[#100720] flex justify-center flex-col items-center'>
            {children}
            </main>
            </>
    );
}

export default Layout;