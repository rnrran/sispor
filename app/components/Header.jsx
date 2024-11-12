import Image from "next/image"
import Link from "next/link"

const Header = () => {
    const udahLogin = false;
    return (
        <>
        <header className="bg-base-100">
            <div className="container mx-auto">
                    <div className="navbar mx-auto">
                        <div className="flex-1">
                            <a className="btn btn-ghost text-xl">sisfor</a>
                        </div>
                            { udahLogin ?
                            (<div className="flex-none gap-2">
                                <div className="form-control">
                                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                                </div>
                                <div className="dropdown dropdown-end">
                                
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                    <Image
                                        alt="Tailwind CSS Navbar component"
                                        src="/resources/images/konodioda.jpg" 
                                        width={500}
                                        height={500}/>
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                    <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                    </li>
                                    <li><a>Settings</a></li>
                                    <li><a>Logout</a></li>
                                </ul>
                                </div>
                            </div>)
                            :
                            <div className="flex-none">
                                <ul className="menu menu-horizontal px-1">
                                <li>
                                    <details>
                                    <summary>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="inline-block h-5 w-5 stroke-current">
                                        <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                                    </svg>
                                    </summary>
                                    <ul className="bg-base-100 rounded-t-none p-2">
                                        <li><Link href={'/login'}>Login</Link></li>
                                        <li><Link href={'/daftar'}>Regis</Link></li>
                                    </ul>
                                    </details>
                                </li>
                                </ul>
                            </div>
                            }
                    </div>
                </div>
        </header>
        </>
    )
}

export default Header