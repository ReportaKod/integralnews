import { unstable_setRequestLocale } from "next-intl/server";
import Link from "next/link";

type PropsLegalPage = {
  params: { locale: string };
};

export default async function Page({params }: PropsLegalPage) {
    const locale = params.locale
    unstable_setRequestLocale(locale);
   
    return (
      <div className="mx-auto px-5 container">
      <div className="bg-white shadow-md mx-auto my-5 p-6 rounded-lg max-w-4xl">
        <h1 className="mb-4 font-bold text-3xl text-gray-800">Politique de Confidentialité</h1>
        
        <section className="mb-6">
          <p className="text-gray-600 mb-4">
            <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
          </p>
          <p className="text-gray-600">
            DJIF COMMUNICATION s'engage à protéger votre vie privée et vos données personnelles. 
            Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons 
            vos informations personnelles conformément à la Loi n° 2019-014 du 29 octobre 2019 
            relative à la protection des données à caractère personnel au Togo.
          </p>
          <p className="text-gray-600">
            Notre site a également pris en compte le Règlement Général 
            sur la Protection des Données (RGPD) de l'Union Européenne à titre informatif.
          </p>
          <p className="text-gray-600">
            <strong>Clause de territorialité :</strong> Cette politique de confidentialité s'applique 
            conformément à la législation togolaise. Le droit applicable est déterminé par la 
            domiciliation de la personne morale DJIF COMMUNICATION (voir 
            <a href="/mentions-legales" className="text-blue-500 hover:underline">mentions légales</a>). 
            Le droit international respecte le principe de territorialité, et les visiteurs d'autres 
            pays sont soumis aux lois dans le respect du droit international.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 font-semibold text-gray-700 text-xl">1. Responsable du traitement</h2>
          <p className="text-gray-600">
            <strong>DJIF COMMUNICATION</strong><br />
            Entreprise individuelle<br />
            <strong>Siège social :</strong> Tsévié, République Togolaise<br />
            <strong>Numéro CFE :</strong> 05493PP2024<br />
            <strong>Directeur de la publication :</strong> Monsieur Koffi Djifa AZANLI<br />
            <strong>Email :</strong> <a href="mailto:djifcommunication@gmail.com" className="text-blue-500 hover:underline">djifcommunication@gmail.com</a><br />
            <strong>Téléphone :</strong> <a href="tel:+22893580418" className="text-blue-500 hover:underline">+228 93 58 04 18</a>
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 font-semibold text-gray-700 text-xl">2. Conformité légale</h2>
          <div className="text-gray-600">
            <h3 className="font-semibold mb-2">2.1 Loi togolaise (applicable à tous)</h3>
            <p className="mb-3">
              Conformément à la loi togolaise n° 2019-014, DJIF COMMUNICATION respecte les principes 
              de protection des données personnelles dans le cadre de l'exploitation de ce site d'information.
            </p>
            
            <h3 className="font-semibold mb-2">2.2 Standards RGPD (mesures complémentaires)</h3>
            <p className="mb-3">
              En plus de la conformité à la loi togolaise, nous incluons également les standards 
              du Règlement Général sur la Protection des Données (RGPD) de l'Union Européenne 
              pour assurer une protection appropriée de vos données personnelles.
            </p>
            
            <h3 className="font-semibold mb-2">2.3 Déclaration préalable (Togo uniquement)</h3>
            <p className="text-sm text-gray-500">
              <strong>Note :</strong> Une déclaration préalable auprès de l'IPDCP sera effectuée 
              si nécessaire selon l'évolution de nos activités de traitement de données.
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 font-semibold text-gray-700 text-xl">3. Données collectées</h2>
          <p className="text-gray-600 mb-3">
            Dans le cadre de l'exploitation de notre site d'information, nous collectons les données suivantes :
          </p>
          <div className="text-gray-600">
            <h3 className="font-semibold mb-2">3.1 Données de navigation (cookies techniques)</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Adresse IP (anonymisée)</li>
              <li>Type de navigateur et version</li>
              <li>Pages visitées et durée de visite</li>
              <li>Date et heure de connexion</li>
              <li>Données de géolocalisation approximative (pays/région)</li>
            </ul>
            
            <h3 className="font-semibold mb-2">3.2 Données de contenu</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Images et photographies prises par notre reporter</li>
              <li>Articles et contenus éditoriaux</li>
              <li>Métadonnées des fichiers (date de prise, appareil utilisé)</li>
              <li>Images contenant des personnes (droit à l'image)</li>
            </ul>
            
            <h3 className="font-semibold mb-2">3.3 Données de partage social</h3>
            <ul className="list-disc pl-6">
              <li>URLs partagées sur les réseaux sociaux</li>
              <li>Données de partage (uniquement si vous utilisez nos boutons de partage)</li>
            </ul>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 font-semibold text-gray-700 text-xl">4. Finalités du traitement</h2>
          <div className="text-gray-600">
            <p className="mb-3">Nous utilisons vos données personnelles pour :</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Fournir nos services d'information :</strong> Publication d'articles et de reportages</li>
              <li><strong>Améliorer l'expérience utilisateur :</strong> Optimisation du site et du contenu</li>
              <li><strong>Analyser la fréquentation :</strong> Statistiques anonymisées de visite</li>
              <li><strong>Assurer la sécurité :</strong> Protection contre les abus et la fraude</li>
              <li><strong>Respecter nos obligations légales :</strong> Conservation des logs de connexion</li>
            </ul>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 font-semibold text-gray-700 text-xl">5. Base légale du traitement</h2>
          <div className="text-gray-600">
            <h3 className="font-semibold mb-2">5.1 Principes de la loi togolaise</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Consentement :</strong> Pour les cookies non essentiels et le partage social</li>
              <li><strong>Légitimité :</strong> Pour l'analyse de fréquentation et l'amélioration du site</li>
              <li><strong>Obligation légale :</strong> Pour la conservation des logs de connexion</li>
              <li><strong>Finalité :</strong> Chaque traitement a une finalité déterminée et légitime</li>
            </ul>
            
            <h3 className="font-semibold mb-2">5.2 Standards RGPD (mesures complémentaires)</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Consentement explicite (art. 6.1.a RGPD) :</strong> Pour tous les cookies non essentiels</li>
              <li><strong>Intérêt légitime (art. 6.1.f RGPD) :</strong> Pour l'analyse de fréquentation anonymisée</li>
              <li><strong>Obligation légale (art. 6.1.c RGPD) :</strong> Pour la conservation des logs</li>
              <li><strong>Transparence :</strong> Information claire sur tous les traitements</li>
            </ul>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 font-semibold text-gray-700 text-xl">6. Durée de conservation</h2>
          <div className="text-gray-600">
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Données de navigation :</strong> 12 mois maximum</li>
              <li><strong>Logs de connexion :</strong> 12 mois (obligation légale)</li>
              <li><strong>Contenu éditorial :</strong> Conservation indéfinie (archives journalistiques)</li>
              <li><strong>Données de partage :</strong> Supprimées immédiatement après traitement</li>
            </ul>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 font-semibold text-gray-700 text-xl">7. Partage des données</h2>
          <div className="text-gray-600">
            <p className="mb-3">Vos données personnelles ne sont pas vendues à des tiers. Elles peuvent être partagées avec :</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Vercel Inc. (hébergeur) :</strong> Données techniques nécessaires à l'hébergement</li>
              <li><strong>Sanity.io (CMS) :</strong> Données de contenu pour la gestion éditoriale</li>
              <li><strong>Autorités compétentes :</strong> En cas d'obligation légale ou de demande judiciaire</li>
            </ul>
            <p className="text-sm text-gray-500">
              <strong>Note :</strong> Les boutons de partage social (Facebook, Twitter, LinkedIn) peuvent collecter 
              des données si vous les utilisez. Consultez leurs politiques de confidentialité respectives.
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 font-semibold text-gray-700 text-xl">8. Vos droits</h2>
          <div className="text-gray-600">
            <h3 className="font-semibold mb-2">8.1 Droits selon la loi togolaise n° 2019-014</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Droit à l'information :</strong> Être informé de la collecte et de l'utilisation de vos données</li>
              <li><strong>Droit d'accès :</strong> Obtenir une copie de vos données personnelles</li>
              <li><strong>Droit de rectification :</strong> Corriger des données inexactes</li>
              <li><strong>Droit d'effacement :</strong> Demander la suppression de vos données</li>
              <li><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données</li>
              <li><strong>Droit de mise à jour :</strong> Demander la mise à jour de vos données</li>
              <li><strong>Droit de retrait du consentement :</strong> Pour les traitements basés sur le consentement</li>
              <li><strong>Droit à l'image :</strong> Demander la suppression, le floutage ou la modification d'images vous représentant</li>
            </ul>
            
            <h3 className="font-semibold mb-2">8.2 Droits RGPD (mesures complémentaires)</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Droit à la portabilité (art. 20 RGPD) :</strong> Récupérer vos données dans un format structuré</li>
              <li><strong>Droit à la limitation du traitement (art. 18 RGPD) :</strong> Restreindre temporairement le traitement</li>
              <li><strong>Droit de ne pas faire l'objet d'une décision automatisée (art. 22 RGPD) :</strong> Décision humaine pour les traitements automatisés</li>
              <li><strong>Droit de retrait du consentement (art. 7.3 RGPD) :</strong> Retrait aussi facile que l'octroi</li>
            </ul>
            
            <h3 className="font-semibold mb-2">8.3 Exercice de vos droits</h3>
            <p className="mb-3">
              Pour exercer ces droits, contactez-nous à : 
              <a href="mailto:djifcommunication@gmail.com" className="text-blue-500 hover:underline"> djifcommunication@gmail.com</a>
            </p>
            <p className="text-sm text-gray-500">
              <strong>Délai de réponse :</strong> 1 mois maximum (standard RGPD), ou dans les meilleurs délais 
              conformément aux exigences légales togolaises.
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 font-semibold text-gray-700 text-xl">9. Droit à l'image</h2>
          <div className="text-gray-600">
            <p className="mb-3">
              Si vous apparaissez sur des photographies publiées sur notre site, vous disposez de droits spécifiques :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Droit de demander la suppression :</strong> Vous pouvez demander la suppression complète de l'image</li>
              <li><strong>Droit de demander le floutage :</strong> Vous pouvez demander que votre visage soit flouté ou masqué</li>
              <li><strong>Droit de demander la modification :</strong> Vous pouvez demander d'autres modifications (recadrage, etc.)</li>
              <li><strong>Droit d'opposition :</strong> Vous pouvez vous opposer à la publication de l'image</li>
            </ul>
            <p className="mb-3">
              <strong>Procédure :</strong> Pour exercer ces droits, envoyez-nous un email à 
              <a href="mailto:djifcommunication@gmail.com" className="text-blue-500 hover:underline"> djifcommunication@gmail.com</a> 
              en précisant :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>L'URL de la page contenant l'image</li>
              <li>La description de l'image concernée</li>
              <li>Le type de modification souhaitée (suppression, floutage, etc.)</li>
              <li>Vos coordonnées pour la réponse</li>
            </ul>
            <p className="text-sm text-gray-500">
              <strong>Délai de traitement :</strong> Nous nous engageons à traiter votre demande dans les 7 jours ouvrés 
              et à vous confirmer l'action effectuée.
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 font-semibold text-gray-700 text-xl">10. Sécurité des données</h2>
          <div className="text-gray-600">
            <p className="mb-3">Nous mettons en œuvre des mesures techniques et organisationnelles appropriées :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Chiffrement HTTPS pour toutes les communications</li>
              <li>Accès restreint aux données personnelles</li>
              <li>Surveillance des accès et des modifications</li>
              <li>Sauvegardes régulières et sécurisées</li>
              <li>Formation du personnel à la protection des données</li>
            </ul>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 font-semibold text-gray-700 text-xl">11. Cookies et technologies similaires</h2>
          <div className="text-gray-600">
            <h3 className="font-semibold mb-2">11.1 Types de cookies utilisés</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Cookies techniques :</strong> Nécessaires au fonctionnement du site (pas de consentement requis)</li>
              <li><strong>Cookies d'analyse :</strong> Pour mesurer l'audience (consentement requis)</li>
              <li><strong>Cookies de partage social :</strong> Pour les boutons de partage (consentement requis)</li>
            </ul>
            
            <h3 className="font-semibold mb-2">11.2 Gestion des cookies</h3>
            <p className="mb-3">
              <strong>Loi togolaise :</strong> Vous pouvez configurer votre navigateur pour refuser les cookies 
              non essentiels. Cela peut affecter certaines fonctionnalités du site.
            </p>
            <p className="mb-3">
              <strong>Standards RGPD (mesures complémentaires) :</strong> Nous nous engageons à implémenter 
              une bannière de cookies conforme au RGPD permettant un consentement granulaire 
              et un retrait facile du consentement.
            </p>
            <p className="text-sm text-gray-500">
              <strong>Note :</strong> Les mesures RGPD seront progressivement mises en place 
              pour offrir une expérience utilisateur appropriée tout en respectant les standards 
              de protection des données.
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 font-semibold text-gray-700 text-xl">12. Transferts internationaux</h2>
          <div className="text-gray-600">
            <p className="mb-3">
              Certaines de vos données peuvent être transférées vers des pays tiers (États-Unis pour l'hébergement Vercel). 
              Ces transferts sont encadrés par :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Décision d'adéquation de la Commission européenne</li>
              <li>Clauses contractuelles types approuvées par la Commission</li>
              <li>Garanties appropriées pour la protection des données</li>
            </ul>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 font-semibold text-gray-700 text-xl">13. Réclamations</h2>
          <div className="text-gray-600">
            <h3 className="font-semibold mb-2">13.1 Contact direct</h3>
            <p className="mb-3">
              Si vous estimez que vos droits ne sont pas respectés, contactez-nous directement à : 
              <a href="mailto:djifcommunication@gmail.com" className="text-blue-500 hover:underline"> djifcommunication@gmail.com</a>
            </p>
            
            <h3 className="font-semibold mb-2">13.2 Autorités de contrôle</h3>
            <p className="mb-3">
              <strong>Au Togo (loi n° 2019-014) :</strong>
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>IPDCP Togo :</strong> Instance de Protection des Données à Caractère Personnel</li>
              <li>Site web : <a href="https://ipdcp.tg" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">https://ipdcp.tg</a></li>
            </ul>
            
            <p className="mb-3">
              <strong>Dans l'Union Européenne (RGPD) :</strong>
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Autorité de contrôle de votre pays de résidence</strong></li>
              <li>Liste des autorités : <a href="https://edpb.europa.eu/about-edpb/board/members_fr" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">https://edpb.europa.eu</a></li>
            </ul>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 font-semibold text-gray-700 text-xl">14. Modifications de cette politique</h2>
          <div className="text-gray-600">
            <p className="mb-3">
              Cette politique de confidentialité peut être modifiée pour refléter les changements dans nos pratiques 
              ou pour d'autres raisons opérationnelles, légales ou réglementaires.
            </p>
            <p>
              Toute modification substantielle sera communiquée par un avis sur notre site web. 
              Nous vous encourageons à consulter régulièrement cette page.
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 font-semibold text-gray-700 text-xl">15. Contact</h2>
          <div className="text-gray-600">
            <p className="mb-3">
              Pour toute question concernant cette politique de confidentialité ou le traitement de vos données personnelles :
            </p>
            <p>
              <strong>DJIF COMMUNICATION</strong><br />
              Monsieur Koffi Djifa AZANLI<br />
              Email : <a href="mailto:djifcommunication@gmail.com" className="text-blue-500 hover:underline">djifcommunication@gmail.com</a><br />
              Téléphone : <a href="tel:+22893580418" className="text-blue-500 hover:underline">+228 93 58 04 18</a><br />
              Adresse : Tsévié, République Togolaise
            </p>
          </div>
        </section>

        <section className="mb-6">
          <p className="text-sm text-gray-500">
            Cette politique de confidentialité est conforme à la Loi n° 2019-014 du 29 octobre 2019 
            relative à la protection des données à caractère personnel au Togo et inclut 
            également les standards du Règlement Général sur la Protection des Données (RGPD) 
            de l'Union Européenne pour assurer une protection appropriée de vos données personnelles.
          </p>
        </section>
      </div>
      </div>
    );
  }