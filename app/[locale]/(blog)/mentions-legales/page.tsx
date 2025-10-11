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
        <h1 className="mb-4 font-bold text-3xl text-gray-800">Mentions Légales</h1>
         <section className="mb-4">
           <h2 className={"mb-2 font-bold text-xl"}>Site en cours de conception</h2>
           <p className={"text-gray-800"}>Ce site est un site de démonstration avec des articles de démonstration qui relate des faits parfois réels et parfois fictifs.
            Ne pas considérer ces articles comme des opinions ou actualités réelles. Le site n'est pas non plus mis en conformité à 100%: cette mise en conformité est en cours.</p>
          <p>Les présentes mentions légales sont en cours de mise à jour. Elles ne sont donc pas encore complètes.</p>
        </section>
        
        <section className="mb-6">
          <h2 className="mb-2 font-semibold text-gray-700 text-xl">Éditeur du site</h2>
          <p className="text-gray-600">
            <strong>DJIF COMMUNICATION</strong>, entreprise individuelle de conseil et assistance en communication <span className="star">*</span>, exerçant les activités de conseil et assistance en communication, couverture médiatique, maître de cérémonie, pose de voix, montage vidéo et spot publicitaire, graphisme, rédaction de projets et de discours, décoration, planification d'événements surprises et négoce.
            <br />
            <strong>Forme juridique :</strong> Entreprise individuelle (selon le droit togolais, les entreprises individuelles n'ont pas de capital social minimal requis)
            <br />
            <strong>Siège social :</strong> <span className="inline not-italic">Tsévié, République Togolaise</span>
            <br />
            <strong>Numéro CFE :</strong> 05493PP2024
            <br />
            <strong>Date de création :</strong> 26 avril 2024
            <br />
            <strong>Début d'activité :</strong> 24 avril 2024
            <br />
            <strong>Téléphone :</strong> <a href="tel:+22893580418" className="text-blue-500 hover:underline">+228 93 58 04 18</a>
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 font-semibold text-gray-700 text-xl">Directeur de la publication</h2>
          <p className="text-gray-600">
            <strong>Monsieur Koffi Djifa AZANLI</strong>, dirigeant de l'entreprise DJIF COMMUNICATION
            <br />
            Email : <a href="mailto:djifcommunication@gmail.com" className="text-blue-500 hover:underline">djifcommunication@gmail.com</a>
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 font-semibold text-gray-700 text-xl">Hébergement</h2>
          <p className="text-gray-600">
            Ce site est hébergé par la société <strong>Vercel Inc.</strong>, située 340 S Lemon Ave #4133 Walnut, CA 91789, États-Unis, et joignable au (559) 288-7060. 
            <br />
            Accéder au site de la société d'hébergement : <a href="https://vercel.com/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">https://vercel.com/</a>
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 font-semibold text-gray-700 text-xl">Propriété intellectuelle</h2>
          <p className="text-gray-600">
            L'ensemble du contenu présent sur ce site (textes, images, vidéos, logos, etc.) est protégé par les dispositions du Code de la propriété intellectuelle et par les conventions internationales relatives aux droits d'auteur.
            <br />
            Tous les droits de reproduction sont réservés, y compris pour les documents iconographiques et photographiques.
            <br />
            Toute reproduction totale ou partielle de ce site est interdite sauf autorisation expresse préalable de DJIF COMMUNICATION.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 font-semibold text-gray-700 text-xl">Protection des données personnelles</h2>
          <p className="text-gray-600">
            Conformément à la loi togolaise sur la protection des données personnelles et au Règlement Général sur la Protection des Données (RGPD), nous nous engageons à protéger la vie privée de nos utilisateurs.
            <br />
            Pour plus d'informations sur le traitement de vos données personnelles, consultez notre 
            <Link href="/politique-de-confidentialite" className="text-blue-500 hover:underline"> politique de confidentialité</Link>.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 font-semibold text-gray-700 text-xl">Garantie et responsabilité</h2>
          <p className="text-gray-600">
            Le contenu de ce site est édité sous réserve d'erreurs techniques et/ou typographiques, avec des photos non contractuelles. 
            <br />L'entreprise <strong>DJIF COMMUNICATION</strong> ne saurait être tenue responsable quant à l'exactitude des informations mises à disposition des utilisateurs accédant au site.
            <br />En outre, DJIF COMMUNICATION ne peut garantir que le fonctionnement du site sera exempt d'interruptions ou d'erreurs.
            <br />Le concepteur du site ou la personne physique ou morale qui assure la maintenance technique n'intervient pas dans la rédaction du contenu (articles, opinions...) via le back-office et ne saurait être tenu responsable du contenu qu'il n'a pas édité.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 font-semibold text-gray-700 text-xl">Droit applicable et juridiction compétente</h2>
          <p className="text-gray-600">
            Les présentes mentions légales sont régies par le droit togolais.
            <br />
            En cas de litige, et après recherche d'une solution amiable, les tribunaux togolais seront seuls compétents pour connaître du litige.
            <br />
            Juridiction compétente : Tribunal de Commerce de Lomé ou Tribunal de Première Instance de Tsévié selon la nature du litige.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 font-semibold text-gray-700 text-xl">Crédits et sources</h2>
          <p className="text-gray-600">
            Les sources produites via la base de code et utilisées sur ce site sont listées dans la page suivante:
            <Link className="text-blue-800 font-bold hover:text-blue-300" href={"/credits"}> cliquez ici</Link>
          </p>
          <p className="text-gray-600">
            Les sources produites via le back-office et utilisées sur ce site sont listées dans la page suivante:
            <Link className="text-blue-800 font-bold hover:text-blue-300" href={"/fr/posts/credits/credits"}> cliquez ici</Link>
          </p>
        </section>

        <section className="mb-6">
          <p className="text-sm text-gray-500">
            <span className="star">*</span> Les activités de DJIF COMMUNICATION incluent : conseil et assistance en communication, 
            couverture médiatique, maître de cérémonie, pose de voix, montage vidéo et spot publicitaire, graphisme, 
            rédaction de projets et de discours, décoration, planification d'événements surprises et négoce.
          </p>
        </section>
      </div>
    </div>
  );
  }