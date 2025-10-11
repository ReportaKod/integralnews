'use client';

import { Children, useState, type ReactNode, useMemo } from 'react';
import { House } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import BreadCrumbIcon from '@/app/[locale]/icons/breacrumbIcon'
import { BreadCrumbsContext } from './breadcrumbContext';
import Link from 'next/link';
import { Spinner } from './spinner';

type BreadcrumbsContainerProps = {
  children: ReactNode;
  separator?: string | ReactNode | ((props:Object) => JSX.Element);
}

type BreadcrumbsProps = {
  children: ReactNode;
  withHome?: boolean;
  locale: string 
}

type BreadcrumbItemProps = {
  children: ReactNode;
  classNames?: string;
  href: string;
}

const BreadcrumbsItem = ({
  children,
  classNames = '',
  href,
  ...props
}: BreadcrumbItemProps) => {
  return (
    <li {...props} className={`group flex items-center justify-center ${classNames}`}>
      <Link href={href} passHref className="inline-flex justify-center items-center">
        <div className="inline-flex justify-end items-end gap-2">{children}</div>
      </Link>
    </li>
  );
};

const BreadcrumbsContainer = ({
  children,
  separator = BreadCrumbIcon,
}: BreadcrumbsContainerProps) => {
    const paths = usePathname();

return (
  <nav className="mx-auto mt-5 p-4 pt-[100px] w-full max-w-screen-2xl min-h-6">
    <ol className="flex flex-wrap items-center space-x-4">
      {Children.map(children, (child, index) => (
        <>
          {child}
          {index < Children.count(children) - 1
            ? <span><BreadCrumbIcon /></span>
            : null}
        </>
      ))}
    </ol>
  </nav>)
}

export const BreadCrumbs = ({
  children,
  withHome = false,
  locale
}: BreadcrumbsProps) => {
  const t = useTranslations('');
  const paths = usePathname();
  const [trailingPath, setTrailingPath] = useState('');
  const context = useMemo(() => ({
    trailingPath,
    setTrailingPath,
  }), [trailingPath]);

  const pathNames = paths.split('/').filter((path) => path);
  const pathItems = pathNames
    .map((path, i) => ({
      name: path,
      path: pathNames.slice(0, i + 1).join('/'),
    }));

  if (context.trailingPath && pathItems.length > 0 && context.trailingPath !== pathItems[pathItems.length - 1].name) {
    pathItems[pathItems.length - 1].name = context.trailingPath;
  }

  return (
    <>
      <BreadcrumbsContainer>
        {(withHome && paths !== `/${locale}`) && <BreadcrumbsItem href="/">
            <House size={24} color="var(--button)" />
            <span className="linear-anim-link text-button cursor-pointer linear-color-primary">{t('Home')}</span>
          </BreadcrumbsItem>}
        {pathItems.filter(item => item.path !== locale).map((item) => (
          <BreadcrumbsItem key={item.path} href={`/${item.path}`}>
            <span className="linear-anim-link text-button cursor-pointer linear-color-primary">{item.name === 'loading'
              ? <Spinner className="w-4 h-4" />
              : item.name !== 'undefined' ? item.name : "404"}
            </span>
          </BreadcrumbsItem>
        ))}
      </BreadcrumbsContainer>
      <BreadCrumbsContext.Provider value={context}>
        {children}
      </BreadCrumbsContext.Provider>
    </>
  );
};