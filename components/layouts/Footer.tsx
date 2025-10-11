'use client'

interface FooterProps {
    locale: string
  }
  
export function Footer({locale}: FooterProps) {
  
    return (
      <footer className="z-10 mx-auto w-full">
        <div className="border-accent-2 bg-white mx-auto px-5 border-t max-w-[1200px] container">
            <div className="relative bg-button mt-5 p-0 w-full min-h-[30px]">
              <div className=" mx-auto px-5 py-4 max-w-screen-2xl flex flex-col gap-4 sm:flex-row sm:items-center">
                <div><span className="text-black text-sm">Intégrale Infos, site web de Djif Communication &copy; 2025 - Tout droits réservés</span></div>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:items-center sm:grow">
                  <a className="text-black text-sm hover:underline" href={`/${locale}/mentions-legales`}>Mentions légales</a>
                  <a className="text-black text-sm hover:underline" href={`/${locale}/politique-de-confidentialite`}>Politique de confidentialité</a>
                  <a className="text-black text-sm hover:underline" href={`/${locale}/posts/credits/credits`}>Crédits & sources</a>
                </div>
              </div>
            </div>
        </div>
      </footer>
    );
  }