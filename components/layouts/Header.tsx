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
  description: string,
  aboutPage?: {
    slug: string | null,
    theme: {
      slug: string | null
    } | null
  } | null
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

export const Header: FC<Props> = ({ posts, title, description, locale, dateTime, aboutPage }) => {
  const t = useTranslations('')
  const paths = usePathname()
  // false = full header (top of the page), true = compact header (after scrolling)
  const [scrolled, setScrolled] = useState<boolean>(false);
  const scrolledRef = useRef<boolean>(false);
  const lastToggleRef = useRef<number>(0);
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

  // Two thresholds (hysteresis) so the header doesn't flicker around a single value
  const COLLAPSE_AT = 80
  const EXPAND_AT = 20

  const scrollHeader = () => {
    const y = window.scrollY
    const next = scrolledRef.current ? y > EXPAND_AT : y >= COLLAPSE_AT
    if (next !== scrolledRef.current) {
      scrolledRef.current = next
      lastToggleRef.current = Date.now()
      setScrolled(next)
    }
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  }

  useEffect(() => {
    // Page may be reloaded already scrolled down
    scrollHeader()
    window.addEventListener('scroll', scrollHeader, { passive: true });

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
      // Only measure the full header, otherwise the content below would jump while
      // the header collapses (it is position: fixed, the content keeps the full height).
      const animating = Date.now() - lastToggleRef.current < 500
      if (headerRef.current && !scrolledRef.current && !animating) {
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
        <header ref={headerRef} className={`z-20 max-[375px]:mb-5 bg-white max-w-[1199px]
        transition-[padding] duration-300 ease-in-out
        top-0 z-max fixed left-1/2 right-1/2 -translate-x-1/2 w-full px-4
        ${scrolled ? "py-2.5" : "py-4"}`}>
            <h1 className="flex flex-col justify-center items-center news_paper_title">
              <a href="/" className={`text-nowrap transition-[font-size] duration-300 ease-in-out ${scrolled
                ? "text-lg sm:text-xl md:text-2xl !leading-7 !my-1.5"
                : "text-2xl sm:text-3xl md:text-5xl lg:text-6xl"}`}>{title}</a>
              {/* Tagline: only on the full header */}
              {description && description.length ?
                  (<div inert={scrolled} aria-hidden={scrolled} className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${scrolled ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"}`}>
                    <span className="block min-h-0 overflow-hidden text-lg italic font-bold">{description}</span>
                  </div>):null}
            </h1>

          {/* Date: only on the full header */}
          <div inert={scrolled} aria-hidden={scrolled} className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${scrolled ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"}`}>
            <div className="min-h-0 overflow-hidden">
              <div className="flex justify-center items-center news_paper_location">
                <div className="flex justify-between items-end gap-5 mx-auto">
                <span>{dateTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick links to the first rubriques: always visible, more compact once scrolled */}
          <nav className={`mx-auto max-w-screen ${scrolled ? "mt-3" : "mt-0"} transition-[margin] duration-300
              shrink hidden sm:flex flex-wrap gap-0 sm:flex-nowrap sm:justify-center 
            container z-10 sm:gap-1`}>
            {rubriques.map((rubrique, index) => {
              return (
                <Link href={'/' + rubrique.href}
                 aria-current={paths === '/' + rubrique.href ? 'page' : undefined}
                 className={`rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700
                   ${paths === '/' + rubrique.href ? "font-semibold !text-black" : "text-black hover:bg-green-100 focus-visible:bg-green-100"}
                   ${index < 5 ? (scrolled ? 'py-1 px-2' : 'py-1.5 px-2.5') : 'hidden'} transition-[padding,background-color] duration-300`}
                key={rubrique.label}>
                   {/* Underline = background of the label (see globals.css), independent of borders and padding */}
                   <span className={`rubrique-label ${paths === '/' + rubrique.href ? "rubrique-label-active" : ""}`}>
                     {rubrique.label}
                   </span>
                </Link>
              )
            })}
          </nav>
          
          <nav className={`${scrolled ? "mt-1" : "mt-2"} transition-[margin] duration-300 flex justify-between 
          items-center gap-4 mx-auto max-w-screen 
            container z-10 bg-black text-white rounded`}>

            <div className={`flex justify-start gap-3`}>
            <Link href="/fr/studio" className={"text-white hover:!text-green-400"} style={{ color: "#fff" }} aria-label="Accéder au studio d'administration">
              <CircleUserRound />
            </Link>
            <Link href="/" className={"text-white hover:!text-green-400"} style={{ color: "#fff" }} aria-label="Retour à l'accueil">
                <House />
            </Link>
            {aboutPage?.slug && aboutPage?.theme?.slug && (
              <Link 
                className="hidden md:flex gap-2 items-center !text-white hover:!text-green-400" 
                href={`/${locale}/posts/${aboutPage.theme.slug}/${aboutPage.slug}`}
              >
                Qui sommes-nous ?
              </Link>
            )}
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
