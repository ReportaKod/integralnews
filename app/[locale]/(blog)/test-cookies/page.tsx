import { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'
import { ConditionalYouTubeEmbed } from '@components/media/ConditionalYouTubeEmbed'
import ConditionalSocialShare from '@/components/utilities/socials/ConditionalSocialShare'
import { ConditionalFontAwesome } from '@components/icons/ConditionalFontAwesome'

export const metadata: Metadata = {
  title: 'Test des Cookies - Intégrale News',
  description: 'Page de test pour vérifier la désactivation des cookies',
}

export default function TestCookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        🧪 Test de Désactivation des Cookies
      </h1>
      
      <div className="space-y-8">
        {/* Test FontAwesome */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            🎨 Test FontAwesome (Contenus Tiers)
          </h2>
          <p className="mb-4">
            Si les cookies "Contenus Tiers" sont <strong>désactivés</strong>, 
            les icônes ci-dessous ne devraient <strong>pas s'afficher</strong> :
          </p>
          <div className="flex gap-4 text-2xl">
            <i className="fas fa-home text-blue-500"></i>
            <i className="fas fa-user text-green-500"></i>
            <i className="fas fa-heart text-red-500"></i>
            <i className="fas fa-star text-yellow-500"></i>
            <i className="fas fa-cog text-gray-500"></i>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            <ConditionalFontAwesome />
            Si vous voyez des icônes, les cookies "Contenus Tiers" sont activés.
          </p>
        </section>

        {/* Test YouTube */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            🎬 Test YouTube (Contenus Tiers)
          </h2>
          <p className="mb-4">
            Si les cookies "Contenus Tiers" sont <strong>désactivés</strong>, 
            la vidéo ci-dessous ne devrait <strong>pas s'afficher</strong> :
          </p>
          <ConditionalYouTubeEmbed
            videoid="dQw4w9WgXcQ"
            height={300}
            title="Test Video - Never Gonna Give You Up"
          />
          <p className="mt-2 text-sm text-gray-600">
            Si vous voyez une vidéo, les cookies "Contenus Tiers" sont activés.
          </p>
        </section>

        {/* Test Social Sharing */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            📱 Test Partage Social (Fonctionnels)
          </h2>
          <p className="mb-4">
            Si les cookies "Fonctionnels" sont <strong>désactivés</strong>, 
            les boutons de partage ne devraient <strong>pas s'afficher</strong> :
          </p>
          <ConditionalSocialShare
            shares={[
              { type: "facebook" },
              { type: "twitter" },
              { type: "linkedin" },
              { type: "whatsapp" },
              { type: "email" },
            ]}
            url={`${SITE_URL}/test-cookies`}
            title="Test des Cookies"
            description="Page de test pour vérifier la désactivation des cookies"
            variant="icon"
          />
          <p className="mt-2 text-sm text-gray-600">
            Si vous voyez des boutons de partage, les cookies "Fonctionnels" sont activés.
          </p>
        </section>

        {/* Instructions de test */}
        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">
            📋 Instructions de Test
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-blue-700">
            <li>Cliquez sur l'<strong>icône cookie verte en bas à gauche</strong> de l'écran</li>
            <li>Cliquez sur "Je choisis" pour personnaliser</li>
            <li>Décochez "Contenus Tiers" et "Fonctionnels"</li>
            <li>Cliquez sur "Enregistrer mes choix"</li>
            <li>Videz le cache (Ctrl+Shift+R / Cmd+Shift+R)</li>
            <li>Rechargez cette page</li>
            <li>Vérifiez que les icônes, vidéo et boutons de partage ne s'affichent plus</li>
          </ol>
        </section>

        {/* État actuel des cookies */}
        <section className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h2 className="text-xl font-semibold mb-4 text-green-800">
            🔍 État Actuel des Cookies
          </h2>
          <p className="text-green-700">
            Ouvrez la console du navigateur (F12) et tapez : 
            <code className="bg-green-100 px-2 py-1 rounded ml-2">
              localStorage.getItem('cookie-preferences')
            </code>
          </p>
          <p className="text-sm text-green-600 mt-2">
            Vous devriez voir quelque chose comme : 
            <code className="bg-green-100 px-2 py-1 rounded ml-2">
              {"{\"essential\":true,\"functional\":false,\"analytics\":false,\"thirdParty\":false}"}
            </code>
          </p>
        </section>
      </div>
    </div>
  )
}
