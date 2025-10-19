"use client";
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/(sanity)/studio/[[...tool]]/page.tsx` route
 */
import { visionTool } from "@sanity/vision";
import { PluginOptions, defineConfig } from "sanity";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { documentInternationalization } from "@sanity/document-internationalization";
import {
  type DocumentLocation,
} from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";
import { pageStructure, singletonPlugin } from "@/sanity/plugins/settings";
import { assistWithPresets } from "@/sanity/plugins/assist";
import author from "@/sanity/schemas/documents/author";
import post from "@/sanity/schemas/documents/post";
import theme from "@/sanity/schemas/documents/theme";
import settings from "@/sanity/schemas/singletons/settings";
import header from "@/sanity/schemas/singletons/header";
import youtube from "@/sanity/schemas/objects/youtube";
import parameters from "@/sanity/schemas/objects/parameters";

const homeLocation = {
  title: "Home",
  href: "/",
} satisfies DocumentLocation;

export default defineConfig({
  basePath: studioUrl,
  projectId,
  dataset,
  icon: () => '🌍', // Icône globe NEWS pour Intégrale News
  title: 'Intégrale News - Studio', // Titre personnalisé
  studio: {
    components: {
      layout: (props) => {
        // Injecter le CSS des variables Sanity
        if (typeof document !== 'undefined') {
          const styleId = 'sanity-theme-override';
          if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
              /* ===== DESIGN SYSTEM INTÉGRALE NEWS - SANITY STUDIO ===== */
              /* Design system complet vert/noir/jaune avec modes clair et sombre */
              
              :root {
                /* ===== PALETTE DE COULEURS PRINCIPALES ===== */
                /* Verts - Palette principale */
                --green-50: #f0fdf4;
                --green-100: #dcfce7;
                --green-200: #bbf7d0;
                --green-300: #86efac;
                --green-400: #4ade80;
                --green-500: #439c47; /* Vert principal du site */
                --green-600: #16a34a;
                --green-700: #15803d;
                --green-800: #166534;
                --green-900: #14532d;
                --green-950: #052e16;
                
                /* Noirs/Gris - Palette secondaire */
                --gray-50: #f9fafb;
                --gray-100: #f3f4f6;
                --gray-200: #e5e7eb;
                --gray-300: #d1d5db;
                --gray-400: #9ca3af;
                --gray-500: #6b7280;
                --gray-600: #4b5563;
                --gray-700: #374151;
                --gray-800: #1f2937;
                --gray-900: #111827;
                --gray-950: #030712;
                --black: #000000;
                
                /* Jaunes - Palette d'accent */
                --yellow-50: #fefce8;
                --yellow-100: #fef3c7;
                --yellow-200: #fde68a;
                --yellow-300: #fcd34d;
                --yellow-400: #fbbf24;
                --yellow-500: #f59e0b;
                --yellow-600: #d97706;
                --yellow-700: #b45309;
                --yellow-800: #92400e;
                --yellow-900: #78350f;
                --yellow-950: #451a03;
                
                /* ===== COULEURS DE MARQUE ===== */
                --brand-primary: var(--green-500);
                --brand-primary--inverted: #ffffff;
                --brand-secondary: var(--gray-900);
                --brand-secondary--inverted: #ffffff;
                --brand-accent: var(--yellow-500);
                --brand-accent--inverted: var(--gray-900);
                --brand-neutral: var(--gray-500);
                --brand-neutral--inverted: #ffffff;
                
                /* ===== TYPOGRAPHIE ===== */
                --font-family-sans-serif: 'Josefin Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                --font-family-serif: 'Georgia', 'Times New Roman', serif;
                --font-family-mono: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                --font-size-xs: 12px;
                --font-size-sm: 14px;
                --font-size-base: 16px;
                --font-size-lg: 18px;
                --font-size-xl: 20px;
                --font-size-2xl: 24px;
                --font-size-3xl: 30px;
                
                /* ===== COULEURS DE TEXTE ===== */
                --text-primary: var(--gray-900);
                --text-secondary: var(--gray-600);
                --text-tertiary: var(--gray-500);
                --text-inverted: #ffffff;
                --text-accent: var(--green-600);
                --text-warning: var(--yellow-700);
                --text-danger: #dc2626;
                --text-success: var(--green-700);
                
                /* ===== FONDS ===== */
                --bg-primary: #ffffff;
                --bg-secondary: var(--gray-50);
                --bg-tertiary: var(--gray-100);
                --bg-muted: var(--gray-100);
                --bg-accent: var(--green-50);
                --bg-warning: var(--yellow-50);
                --bg-danger: #fef2f2;
                --bg-success: var(--green-50);
                --bg-inverted: var(--gray-900);
                
                /* ===== BORDURES ===== */
                --border-primary: var(--gray-200);
                --border-secondary: var(--gray-300);
                --border-accent: var(--green-300);
                --border-warning: var(--yellow-300);
                --border-danger: #fecaca;
                --border-success: var(--green-300);
                --border-focus: var(--green-500);
                
                /* ===== OMBRES ===== */
                --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
                --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                --shadow-green: 0 4px 14px 0 rgba(67, 156, 71, 0.15);
                --shadow-yellow: 0 4px 14px 0 rgba(245, 158, 11, 0.15);
                
                /* ===== COULEURS D'ÉTAT ===== */
                --state-success: var(--green-500);
                --state-success-bg: var(--green-50);
                --state-success-border: var(--green-200);
                --state-warning: var(--yellow-500);
                --state-warning-bg: var(--yellow-50);
                --state-warning-border: var(--yellow-200);
                --state-danger: #dc2626;
                --state-danger-bg: #fef2f2;
                --state-danger-border: #fecaca;
                --state-info: #3b82f6;
                --state-info-bg: #eff6ff;
                --state-info-border: #bfdbfe;
                
                /* ===== BOUTONS ===== */
                --btn-primary-bg: var(--green-500);
                --btn-primary-text: #ffffff;
                --btn-primary-hover: var(--green-600);
                --btn-primary-active: var(--green-700);
                --btn-secondary-bg: var(--gray-100);
                --btn-secondary-text: var(--gray-900);
                --btn-secondary-hover: var(--gray-200);
                --btn-secondary-active: var(--gray-300);
                --btn-accent-bg: var(--yellow-500);
                --btn-accent-text: var(--gray-900);
                --btn-accent-hover: var(--yellow-600);
                --btn-accent-active: var(--yellow-700);
                
                /* ===== NAVIGATION ===== */
                --nav-bg: var(--gray-50);
                --nav-border: var(--gray-200);
                --nav-item-bg: transparent;
                --nav-item-hover: var(--green-50);
                --nav-item-active: var(--green-500);
                --nav-item-text: var(--gray-700);
                --nav-item-text-hover: var(--green-700);
                --nav-item-text-active: #ffffff;
                
                /* ===== CARTES ===== */
                --card-bg: #ffffff;
                --card-border: var(--gray-200);
                --card-hover: var(--gray-50);
                --card-selected: var(--green-500);
                --card-shadow: var(--shadow);
                --card-shadow-hover: var(--shadow-md);
                
                /* ===== CHAMPS DE SAISIE ===== */
                --input-bg: #ffffff;
                --input-border: var(--gray-300);
                --input-border-focus: var(--green-500);
                --input-text: var(--gray-900);
                --input-placeholder: var(--gray-500);
                --input-shadow-focus: 0 0 0 3px rgba(67, 156, 71, 0.1);
                
                /* ===== SCROLLBARS ===== */
                --scrollbar-track: var(--gray-100);
                --scrollbar-thumb: var(--gray-400);
                --scrollbar-thumb-hover: var(--green-500);
              }
              
              /* ===== MODE SOMBRE ===== */
              [data-theme="dark"] {
                /* Couleurs de texte */
                --text-primary: var(--gray-100);
                --text-secondary: var(--gray-400);
                --text-tertiary: var(--gray-500);
                --text-inverted: var(--gray-900);
                --text-accent: var(--green-400);
                --text-warning: var(--yellow-400);
                --text-danger: #fca5a5;
                --text-success: var(--green-400);
                
                /* Fonds */
                --bg-primary: var(--gray-900);
                --bg-secondary: var(--gray-800);
                --bg-tertiary: var(--gray-700);
                --bg-muted: var(--gray-800);
                --bg-accent: var(--green-950);
                --bg-warning: var(--yellow-950);
                --bg-danger: #7f1d1d;
                --bg-success: var(--green-950);
                --bg-inverted: #ffffff;
                
                /* Bordures */
                --border-primary: var(--gray-700);
                --border-secondary: var(--gray-600);
                --border-accent: var(--green-600);
                --border-warning: var(--yellow-600);
                --border-danger: #991b1b;
                --border-success: var(--green-600);
                --border-focus: var(--green-400);
                
                /* Ombres */
                --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
                --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3);
                --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
                --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
                --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3);
                --shadow-green: 0 4px 14px 0 rgba(67, 156, 71, 0.3);
                --shadow-yellow: 0 4px 14px 0 rgba(245, 158, 11, 0.3);
                
                /* Navigation */
                --nav-bg: var(--gray-800);
                --nav-border: var(--gray-700);
                --nav-item-bg: transparent;
                --nav-item-hover: var(--green-900);
                --nav-item-active: var(--green-500);
                --nav-item-text: var(--gray-300);
                --nav-item-text-hover: var(--green-300);
                --nav-item-text-active: #ffffff;
                
                /* Cartes */
                --card-bg: var(--gray-800);
                --card-border: var(--gray-700);
                --card-hover: var(--gray-700);
                --card-selected: var(--green-500);
                --card-shadow: var(--shadow);
                --card-shadow-hover: var(--shadow-md);
                
                /* Champs de saisie */
                --input-bg: var(--gray-800);
                --input-border: var(--gray-600);
                --input-border-focus: var(--green-400);
                --input-text: var(--gray-100);
                --input-placeholder: var(--gray-500);
                --input-shadow-focus: 0 0 0 3px rgba(67, 156, 71, 0.2);
                
                /* Scrollbars */
                --scrollbar-track: var(--gray-800);
                --scrollbar-thumb: var(--gray-600);
                --scrollbar-thumb-hover: var(--green-500);
              }
              
              /* ===== APPLICATION DU DESIGN SYSTEM ===== */
              
              /* Variables Sanity Studio avec notre design system */
              :root {
                --brand-primary: var(--green-500);
                --brand-primary--inverted: var(--text-inverted);
                --brand-secondary: var(--gray-900);
                --brand-secondary--inverted: var(--text-inverted);
                --brand-accent: var(--yellow-500);
                --brand-accent--inverted: var(--gray-900);
                
                --text-color: var(--text-primary);
                --text-color--inverted: var(--text-inverted);
                --text-color-secondary: var(--text-secondary);
                
                --component-bg: var(--bg-primary);
                --component-bg--inverted: var(--bg-inverted);
                --component-bg-muted: var(--bg-muted);
                --component-bg-muted--inverted: var(--bg-secondary);
                
                --main-navigation-color: var(--nav-bg);
                --main-navigation-color--inverted: var(--nav-item-text-active);
                
                --component-border-color: var(--border-primary);
                --component-border-color--inverted: var(--border-secondary);
                
                --component-shadow: var(--shadow);
                --component-shadow--large: var(--shadow-lg);
                
                --state-success-color: var(--state-success);
                --state-success-color--inverted: var(--text-inverted);
                --state-warning-color: var(--state-warning);
                --state-warning-color--inverted: var(--text-inverted);
                --state-danger-color: var(--state-danger);
                --state-danger-color--inverted: var(--text-inverted);
                --state-info-color: var(--state-info);
                --state-info-color--inverted: var(--text-inverted);
                
                --focus-color: var(--border-focus);
                --focus-color--inverted: var(--text-inverted);
                --card-focus-ring-color: var(--border-focus);
                --card-focus-ring: 0 0 0 1px var(--border-focus);
                --card-focus-ring-offset: 0 0 0 1px var(--border-focus);
                
                --button-primary-color: var(--btn-primary-bg);
                --button-primary-color--inverted: var(--btn-primary-text);
                --button-secondary-color: var(--btn-secondary-bg);
                --button-secondary-color--inverted: var(--btn-secondary-text);
                --button-accent-color: var(--btn-accent-bg);
                --button-accent-color--inverted: var(--btn-accent-text);
                
                --link-color: var(--green-600);
                --link-color--inverted: var(--text-inverted);
                --link-color-hover: var(--green-700);
                
                --selectable-item-color: var(--green-500);
                --selectable-item-color--inverted: var(--text-inverted);
                --selectable-item-color-hover: var(--green-600);
                
                --card-bg-color: var(--card-bg);
                --card-bg-color-active: var(--card-selected);
                --card-bg-color-hover: var(--card-hover);
                --card-bg-color-selected: var(--card-selected);
                --card-bg-color-focus: var(--card-selected);
                --card-bg-color-pressed: var(--green-600);
                --card-border-color: var(--card-border);
                --card-border-color-hover: var(--border-accent);
                
                --card-focus-ring-offset-width: 1px;
                --card-focus-ring-width: 1px;
                --card-focus-ring-style: solid;
                
                --card-bg-color--inverted: var(--bg-inverted);
                --card-bg-color--muted: var(--bg-muted);
                --card-bg-color--muted--inverted: var(--bg-secondary);
                --card-bg-color--strong: var(--green-500);
                --card-bg-color--strong--inverted: var(--text-inverted);
                --card-bg-color--weak: var(--bg-tertiary);
                --card-bg-color--weak--inverted: var(--bg-secondary);
              }
              
              /* ===== STYLES CSS DIRECTS POUR FORCER LES COULEURS ===== */
              
              /* Sélecteur exact avec spécificité (0,4,0) */
              .iBQMWX[data-as='a']:not([data-disabled])[data-selected] {
                background-color: var(--nav-item-active) !important;
                color: var(--nav-item-text-active) !important;
                border-radius: 8px !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                box-shadow: var(--shadow-green) !important;
              }
              
              /* Sélecteur au hover avec spécificité élevée */
              .iBQMWX[data-as='a']:not([data-disabled]):hover {
                background-color: var(--nav-item-hover) !important;
                color: var(--nav-item-text-hover) !important;
                border-radius: 8px !important;
                transform: translateY(-2px) !important;
                box-shadow: var(--shadow-md) !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
              }
              
              /* Sélecteur au focus avec spécificité élevée */
              .iBQMWX[data-as='a']:not([data-disabled]):focus {
                background-color: var(--nav-item-active) !important;
                color: var(--nav-item-text-active) !important;
                outline: 2px solid var(--border-focus) !important;
                outline-offset: 2px !important;
                border-radius: 8px !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
              }
              
              /* Sélecteurs avec data-selected même vide */
              .iBQMWX[data-as='a']:not([data-disabled])[data-selected=""] {
                background-color: var(--nav-item-active) !important;
                color: var(--nav-item-text-active) !important;
                border-radius: 8px !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
              }
              
              /* Sélecteurs avec data-selected="true" */
              .iBQMWX[data-as='a']:not([data-disabled])[data-selected="true"] {
                background-color: var(--nav-item-active) !important;
                color: var(--nav-item-text-active) !important;
                border-radius: 8px !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
              }
              
              /* ===== STYLES GÉNÉRAUX POUR L'ESTHÉTIQUE ===== */
              
              /* Police générale */
              [data-sanity] {
                font-family: var(--font-family-sans-serif) !important;
                color: var(--text-primary) !important;
                background-color: var(--bg-primary) !important;
              }
              
              /* Transitions fluides */
              [data-sanity] * {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
              }
              
              /* Bordures arrondies cohérentes */
              [data-sanity] [data-ui="Card"],
              [data-sanity] [data-ui="Button"],
              [data-sanity] [data-ui="PreviewCard"] {
                border-radius: 8px !important;
              }
              
              /* Ombres cohérentes */
              [data-sanity] [data-ui="Card"] {
                box-shadow: var(--card-shadow) !important;
                border: 1px solid var(--card-border) !important;
                background-color: var(--card-bg) !important;
              }
              
              /* Effets hover cohérents */
              [data-sanity] [data-ui="Card"]:hover {
                transform: translateY(-2px) !important;
                box-shadow: var(--card-shadow-hover) !important;
                border-color: var(--card-border-color-hover) !important;
              }
              
              /* ===== PERSONNALISATION DE LA NAVIGATION ===== */
              
              /* Barre de navigation principale */
              [data-sanity] [data-ui="Navbar"] {
                background: var(--nav-bg) !important;
                border-bottom: 1px solid var(--nav-border) !important;
                box-shadow: var(--shadow) !important;
              }
              
              /* Titre de la navigation */
              [data-sanity] [data-ui="Navbar"] h1 {
                color: var(--text-primary) !important;
                font-weight: 600 !important;
                font-size: var(--font-size-xl) !important;
              }
              
              /* Icône globe NEWS dans la navigation */
              [data-sanity] [data-ui="Navbar"] [data-sanity-icon] {
                color: var(--green-500) !important;
                font-size: 1.2rem !important;
                line-height: 1 !important;
                vertical-align: middle !important;
                display: inline-block !important;
                margin-right: 8px !important;
                margin-top: -2px !important;
              }
              
              /* Ajustement du conteneur de l'icône */
              [data-sanity] [data-ui="Navbar"] [data-sanity-icon] {
                position: relative !important;
                top: 1px !important;
              }
              
              /* Ajustement du titre avec l'icône */
              [data-sanity] [data-ui="Navbar"] h1 {
                display: flex !important;
                align-items: center !important;
                gap: 8px !important;
                line-height: 1.2 !important;
              }
              
              /* Styles spécifiques pour l'icône dans la navbar */
              [data-sanity] [data-ui="Navbar"] [data-sanity-icon] {
                width: 18px !important;
                height: 18px !important;
                font-size: 18px !important;
                line-height: 18px !important;
                text-align: center !important;
                overflow: visible !important;
                white-space: nowrap !important;
              }
              
              /* Conteneur de l'icône dans la navbar */
              [data-sanity] [data-ui="Navbar"] [data-sanity-icon] {
                flex-shrink: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
                border: none !important;
                background: none !important;
              }
              
              /* Correction du conteneur avec hauteur 1px */
              [data-sanity] .jvRkiN {
                width: 18px !important;
                height: auto !important;
                overflow: visible !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                position: relative !important;
                top: -2px !important;
                line-height: 1 !important;
                vertical-align: top !important;
              }
              
              /* Correction générale pour tous les conteneurs d'icônes similaires */
              [data-sanity] [data-ui="Navbar"] [data-sanity-icon],
              [data-sanity] [data-ui="Navbar"] svg,
              [data-sanity] [data-ui="Navbar"] [class*="jvRkiN"] {
                width: 18px !important;
                height: 18px !important;
                min-height: 18px !important;
                max-height: 18px !important;
                overflow: visible !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
              }
              
              /* Correction spécifique pour les classes générées par Sanity */
              [data-sanity] [class*="jvRkiN"],
              [data-sanity] [class*="sc-"] [data-sanity-icon],
              [data-sanity] [class*="sc-"] svg {
                width: 18px !important;
                height: 18px !important;
                min-height: 18px !important;
                max-height: 18px !important;
                overflow: visible !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                line-height: 18px !important;
                position: relative !important;
                top: -2px !important;
                vertical-align: top !important;
              }
              
              /* Correction du conteneur parent qui coupe l'icône */
              [data-sanity] .sc-fDioxB {
                height: 24px !important;
                min-height: 24px !important;
                max-height: 24px !important;
                overflow: visible !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                padding: 3px 0 !important;
                line-height: 1 !important;
              }
              
              /* Correction spécifique pour le conteneur de l'icône globe */
              [data-sanity] .sc-fDioxB.jvRkiN {
                height: 24px !important;
                min-height: 24px !important;
                max-height: 24px !important;
                overflow: visible !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                padding: 3px 0 !important;
                position: relative !important;
                top: 0 !important;
                line-height: 1 !important;
              }
              
              /* Correction du conteneur .jvRkiN avec hauteur 1px */
              [data-sanity] .jvRkiN {
                width: 18px !important;
                height: 1px !important;
                min-height: 18px !important;
                max-height: 18px !important;
                overflow: visible !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                position: relative !important;
                top: 0 !important;
                line-height: 1 !important;
                vertical-align: top !important;
                font-size: 18px !important;
              }
              
              /* Force la hauteur pour tous les conteneurs d'icônes dans la navbar */
              [data-sanity] [data-ui="Navbar"] * {
                min-height: auto !important;
              }
              
              [data-sanity] [data-ui="Navbar"] [data-sanity-icon],
              [data-sanity] [data-ui="Navbar"] [class*="jvRkiN"],
              [data-sanity] [data-ui="Navbar"] [class*="sc-"] {
                min-height: 18px !important;
                height: 18px !important;
              }
              
              /* Styles spécifiques pour l'icône emoji - solution simple */
              [data-sanity] .jvRkiN {
                position: absolute !important;
                top: 50% !important;
                left: 50% !important;
                transform: translate(-50%, -50%) !important;
                width: 18px !important;
                height: 18px !important;
                font-size: 18px !important;
                line-height: 1 !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                overflow: visible !important;
                z-index: 1000 !important;
                background: transparent !important;
                border: none !important;
                padding: 0 !important;
                margin: 0 !important;
              }
              
              /* Force la hauteur auto avec spécificité élevée */
              [data-sanity] .jvRkiN {
                width: 25px !important;
                height: auto !important;
                min-height: auto !important;
                max-height: none !important;
              }
              
              /* Sélecteur encore plus spécifique pour forcer la hauteur auto */
              [data-sanity] [data-ui="Navbar"] .jvRkiN,
              [data-sanity] .sc-fDioxB.jvRkiN,
              [data-sanity] div.jvRkiN {
                width: 25px !important;
                height: auto !important;
                min-height: auto !important;
                max-height: none !important;
                overflow: visible !important;
              }
              
              /* Conteneur parent pour l'icône positionnée */
              [data-sanity] .sc-fDioxB {
                position: relative !important;
                height: 20px !important;
                min-height: 20px !important;
                max-height: 20px !important;
                overflow: visible !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
              }
              
              /* Force la hauteur auto pour le conteneur de l'icône globe */
              [data-sanity] .sc-fDioxB.jvRkiN {
                height: auto !important;
                min-height: auto !important;
                max-height: none !important;
                overflow: visible !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                position: relative !important;
                top: 0 !important;
                line-height: 1 !important;
                padding: 0 !important;
              }
              
              /* ===== PERSONNALISATION DES BOUTONS ===== */
              
              /* Boutons principaux */
              [data-sanity] [data-ui="Button"][data-tone="primary"] {
                background-color: var(--btn-primary-bg) !important;
                color: var(--btn-primary-text) !important;
                border: none !important;
                border-radius: 8px !important;
                font-weight: 500 !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                box-shadow: var(--shadow-sm) !important;
              }
              
              [data-sanity] [data-ui="Button"][data-tone="primary"]:hover {
                background-color: var(--btn-primary-hover) !important;
                transform: translateY(-1px) !important;
                box-shadow: var(--shadow-green) !important;
              }
              
              [data-sanity] [data-ui="Button"][data-tone="primary"]:active {
                background-color: var(--btn-primary-active) !important;
                transform: translateY(0) !important;
              }
              
              /* Boutons secondaires */
              [data-sanity] [data-ui="Button"][data-tone="default"] {
                background-color: var(--btn-secondary-bg) !important;
                color: var(--btn-secondary-text) !important;
                border: 1px solid var(--border-primary) !important;
                border-radius: 8px !important;
                font-weight: 500 !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                box-shadow: var(--shadow-sm) !important;
              }
              
              [data-sanity] [data-ui="Button"][data-tone="default"]:hover {
                background-color: var(--btn-secondary-hover) !important;
                border-color: var(--border-accent) !important;
                color: var(--green-700) !important;
                transform: translateY(-1px) !important;
                box-shadow: var(--shadow) !important;
              }
              
              [data-sanity] [data-ui="Button"][data-tone="default"]:active {
                background-color: var(--btn-secondary-active) !important;
                transform: translateY(0) !important;
              }
              
              /* Boutons d'accent (jaune) */
              [data-sanity] [data-ui="Button"][data-tone="caution"] {
                background-color: var(--btn-accent-bg) !important;
                color: var(--btn-accent-text) !important;
                border: none !important;
                border-radius: 8px !important;
                font-weight: 500 !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                box-shadow: var(--shadow-sm) !important;
              }
              
              [data-sanity] [data-ui="Button"][data-tone="caution"]:hover {
                background-color: var(--btn-accent-hover) !important;
                transform: translateY(-1px) !important;
                box-shadow: var(--shadow-yellow) !important;
              }
              
              /* ===== PERSONNALISATION DES CHAMPS DE SAISIE ===== */
              
              /* Champs de texte */
              [data-sanity] input[type="text"],
              [data-sanity] input[type="email"],
              [data-sanity] input[type="password"],
              [data-sanity] textarea,
              [data-sanity] select {
                background-color: var(--input-bg) !important;
                border: 1px solid var(--input-border) !important;
                border-radius: 8px !important;
                padding: 12px 16px !important;
                font-family: var(--font-family-sans-serif) !important;
                font-size: var(--font-size-sm) !important;
                color: var(--input-text) !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                box-shadow: var(--shadow-sm) !important;
              }
              
              [data-sanity] input::placeholder,
              [data-sanity] textarea::placeholder {
                color: var(--input-placeholder) !important;
              }
              
              [data-sanity] input:focus,
              [data-sanity] textarea:focus,
              [data-sanity] select:focus {
                border-color: var(--input-border-focus) !important;
                outline: none !important;
                box-shadow: var(--input-shadow-focus) !important;
                transform: translateY(-1px) !important;
              }
              
              /* ===== PERSONNALISATION DES SCROLLBARS ===== */
              
              /* Scrollbar personnalisée */
              [data-sanity] ::-webkit-scrollbar {
                width: 8px !important;
                height: 8px !important;
              }
              
              [data-sanity] ::-webkit-scrollbar-track {
                background: var(--scrollbar-track) !important;
                border-radius: 4px !important;
              }
              
              [data-sanity] ::-webkit-scrollbar-thumb {
                background: var(--scrollbar-thumb) !important;
                border-radius: 4px !important;
                transition: background 0.3s ease !important;
              }
              
              [data-sanity] ::-webkit-scrollbar-thumb:hover {
                background: var(--scrollbar-thumb-hover) !important;
              }
              
              /* ===== ANIMATIONS ET TRANSITIONS ===== */
              
              /* Animation d'apparition */
              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              
              [data-sanity] [data-ui="Card"] {
                animation: fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
              }
              
              /* Animation de pulsation pour les éléments actifs */
              @keyframes pulse {
                0%, 100% {
                  opacity: 1;
                }
                50% {
                  opacity: 0.8;
                }
              }
              
              [data-sanity] [data-ui="Button"][data-tone="primary"]:focus {
                animation: pulse 2s infinite !important;
              }
              
              /* ===== RESPONSIVE DESIGN ===== */
              
              /* Adaptation mobile */
              @media (max-width: 768px) {
                [data-sanity] {
                  font-size: var(--font-size-sm) !important;
                }
                
                [data-sanity] [data-ui="Card"] {
                  margin: 4px !important;
                  padding: 12px !important;
                }
                
                [data-sanity] [data-ui="Button"] {
                  padding: 8px 16px !important;
                  font-size: var(--font-size-sm) !important;
                }
              }
              
              /* Adaptation tablette */
              @media (min-width: 769px) and (max-width: 1024px) {
                [data-sanity] [data-ui="Card"] {
                  margin: 8px !important;
                  padding: 16px !important;
                }
              }
            `;
            document.head.appendChild(style);
          }
        }
        return props.renderDefault(props);
      }
    }
  },
  schema: {
    types: [
      // Singletons
      settings,
      header,
      // Documents
      post,
      author,
      theme,
      // objects
      youtube,
      parameters
    ],
  },
  plugins: [
    // Document internationalization plugin for multilingual content
    documentInternationalization({
      supportedLanguages: [
        { id: "fr", title: "Français" },
        { id: "en", title: "English" },
      ],
      schemaTypes: ["post", "author"], // Add document types that need translation
    }),
    // presentationTool({
    //   resolve: {
    //     mainDocuments: defineDocuments([
    //       {
    //         route: "/posts/:slug",
    //         filter: `_type == "post" && slug.current == $slug`,
    //       },
    //     ]),
    //     locations: {
    //       settings: defineLocations({
    //         locations: [homeLocation],
    //         message: "This document is used on all pages",
    //         tone: "caution",
    //       }),
    //       post: defineLocations({
    //         select: {
    //           title: "title",
    //           slug: "slug.current",
    //         },
    //         resolve: (doc) => ({
    //           locations: [
    //             {
    //               title: doc?.title || "Untitled",
    //               href: resolveHref("post", doc?.slug)!,
    //             },
    //             homeLocation,
    //           ],
    //         }),
    //       }),
    //     },
    //   },
    //   previewUrl: { previewMode: { enable: "fr/api/draft-mode/enable" } },
    // }),
    structureTool({ structure: pageStructure([settings, header]) }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([settings.name, header.name]),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Sets up AI Assist with preset prompts
    // https://www.sanity.io/docs/ai-assist
    assistWithPresets(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    process.env.NODE_ENV === "development" &&
      visionTool({ defaultApiVersion: apiVersion }),
  ].filter(Boolean) as PluginOptions[],
});


