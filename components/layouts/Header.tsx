'use client'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import {FC, useState, useEffect, ReactNode, useRef} from 'react'
// icons
import { House, CircleUserRound,  Search, ChevronUp } from 'lucide-react';
import Link from 'next/link';

interface Props {
  posts: any,
  locale: string,
  dateTime: string,
  title: string,
  description: string
}

interface NavLinks {
  href: string,
  label: string,
  element: ReactNode,
  dropdown?: Array<DropdownItem>,
  css: string
}

interface DropdownItem {
  href: string,
  label: string,
}

export const Header: FC<Props> = ({ posts, title, description, locale, dateTime }) => {
  const t = useTranslations('')
  const paths = usePathname()
  const [scrolled, setScrolled] = useState<boolean>(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownItems: Array<DropdownItem> = [];
  const uniqueLabels = new Set<string>(); 

  const pathNames = paths.split('/');

   
   if(posts.length > 0) {
     posts.forEach((post: any) => {
       const label = post.theme?.name || '';
       const href = `${locale}/posts/${post.theme?.slug || ""}`;
       
       if (!uniqueLabels.has(label) && label) { 
         uniqueLabels.add(label);
         dropdownItems.push({ href, label });
       }
     });
   }
   
  // Datas
  const isHome = paths === `/${locale}`
  const navLinks:NavLinks[] = [
    { href: "", 
      label: 'Toutes nos rubriques', 
      element: <ChevronUp size={20} strokeWidth={1} className="group-hover:text-green-400 group-hover/chevron:rotate-0 font-extralight text-white rotate-180" />,
      dropdown: [...dropdownItems],
      css: `gap-2 items-center group/rubriques cursor-pointer `}
  ];

  const scrollHeader = () => { 
    if (window.scrollY >= 20) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHeader);

    return () => {
      window.removeEventListener('scroll', scrollHeader);
    };
  }, []);

  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen) {
        const target = event.target as Element;
        if (!target.closest('.dropdown-container')) {
          closeDropdown();
        }
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Size of the header
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateHeaderSize = () => {
      if (headerRef.current) {
        const newSize = `${headerRef.current.offsetHeight}px`
        document.documentElement.style.setProperty('--header-size', newSize)
      }
    }

    // Initial size
    updateHeaderSize()

    // Add resize observer
    const ResizeObserver = window.ResizeObserver
    if (ResizeObserver) {
      const observer = new ResizeObserver(updateHeaderSize)
      if (headerRef.current) {
        observer.observe(headerRef.current)
      }

      return () => observer.disconnect()
    }
  }, [])

  const rubriques: Array<DropdownItem> = dropdownItems.length > 0 ? dropdownItems.filter(ele => ele.href && ele.label && ele.label !== "" && ele.href !== "" && ele.label 
    !== "qui-sommes-nous" && ele.label !== "credits") : []
 
  return (
        <>
        <header ref={headerRef} className={`z-20 max-[375px]:mb-5 ${scrolled ? "bg-secondary" : "bg-background"} 
        bg-white max-w-[1199px] transition duration-400 ease-in top-0 z-max fixed left-1/2 right-1/2 -translate-x-1/2 p-4 w-full`}>
            <h1 className="flex flex-col justify-center items-center news_paper_title">
              <a href="/" className="text-2xl text-nowrap sm:text-3xl md:text-5xl lg:text-6xl">{title}</a>
              {description && description.length ?
                  (<span className="block text-lg italic font-bold">{description}</span>):null}
            </h1>

          <div className="flex justify-center items-center news_paper_location">
            <div className="flex justify-between items-end gap-5 mx-auto">
            <span>{dateTime}</span>
            </div>
          </div>

          <nav className={`mx-auto max-w-screen
              shrink hidden sm:flex flex-wrap gap-0 sm:flex-nowrap sm:justify-center 
            container z-10 sm:gap-4`}>
            {rubriques.map((rubrique, index) => {
              return (
                <Link href={'/' + rubrique.href} 
                 
                 className={`${paths === '/' + rubrique.href ? "bg-green-500 !text-white hover:bg-green-700 hover:!text-white": "bg-white text-black hover:!text-green-400"} ${index < 5 ? 'py-3 px-4 rounded': 'hidden'} `}
                key={rubrique.label}>
                   {rubrique.label}
                </Link>
              )
            })}
          </nav>
          
          <nav className={`mt-2 flex justify-between 
          items-center gap-4 mx-auto max-w-screen 
            container z-10 bg-black text-white rounded`}>

            <div className={`flex justify-start gap-3`}>
            <Link href="/fr/studio" className={"text-white hover:!text-green-400"} style={{ color: "#fff" }} aria-label="Accéder au studio d'administration">
              <CircleUserRound />
            </Link>
            <Link href="/" className={"text-white hover:!text-green-400"} style={{ color: "#fff" }} aria-label="Retour à l'accueil">
                <House />
            </Link>
            <Link className="hidden md:flex gap-2 items-center !text-white hover:!text-green-400 " href={`/${locale}/posts/qui-sommes-nous/djif-communication`}>Qui sommes-nous ?</Link>
            </div>

          <div className={`grow flex justify-end`}>
              <ul className={`relative justify-end px-5 gap-5 sm:px-16 py-2 flex items-center sm:gap-16`}>
                {navLinks.map((item) => (
                  <li key={item.label} className={`whitespace-nowrap relative group/chevron dropdown-container ${item.css}`}>
                    <button
                      onClick={toggleDropdown}
                      className={`flex gap-2 items-center linear-anim-link text-white hover:text-green-400 cursor-pointer group`}
                    >
                      <span className="group-hover:text-green-400 text-white peer/chevron">{item.label}</span>
                      {item.element ? item.element :  null}
                    </button>
                    {item.dropdown && dropdownItems.length > 1 ? (
                      <div className={`bg-transparent absolute top-5 right-0 -left-[2px] w-full ${item.css}`}>
                        <ul className={`${isDropdownOpen ? 'flex' : 'hidden'} group-hover/rubriques:flex flex-col border-2 bg-white mt-[24px] border-t-0 border-black rounded-b-md w-full transition-all -translate-y-2 ease-in`}>
                          {item.dropdown
                          .filter(ele=> ele.label !== "" && ele.href !== "" && ele.label !== "undefined" && ele.label 
                            !== "qui-sommes-nous" && ele.label !== "credits").map((ele, index) => {return (
                            <li className={
                              `${item.dropdown?.length === index + 1 ? "rounded-b-md": ""} 
                              w-full group/li bg-white hover:bg-black`} 
                              key={ele.label}>
                              <Link 
                                onClick={closeDropdown}
                                className={`block px-4 py-2 text-black group-hover/li:text-green-400 
                                ${ele.label && ele?.label.length < 18 ? "whitespace-nowrap" : "whitespace-normal"} 
                                ${item.dropdown?.length === index + 1 ? "rounded-b-md": ""}`} 
                                href={`/${ele.href}`}>{ele.label}</Link>
                            </li>)})}
                        </ul>
                     </div>
                  ) : null}
                  </li>
                ))}
              </ul>
          </div>
    
            <div className="flex justify-end gap-2 max-lg:hidden wide:mr-24 font-medium text-lg text-white hover:text-green-400">
               <button className='hidden cursor-pointer' aria-label="Rechercher sur le site">
                 <Search />
               </button>
            </div>
          </nav>
        </header>       
      </>
    )
}
