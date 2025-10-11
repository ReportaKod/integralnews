import React from 'react';
import { StructureBuilder } from 'sanity/structure';

export const instructionsPage = (S: StructureBuilder) => {
  return S.listItem()
    .title('Guide de rédaction d\'articles')
    .icon(() => '📝')
    .child(
      S.component(() => (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          <h1 style={{ color: '#f9fafb', marginBottom: '40px', fontSize: '2.5rem', textAlign: 'center', borderBottom: '3px solid #3b82f6', paddingBottom: '20px' }}>
            📝 Guide complet de rédaction d'articles
          </h1>
          
          {/* Introduction */}
          <div style={{ backgroundColor: '#f8fafc', padding: '25px', borderRadius: '12px', marginBottom: '40px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ color: '#1e40af', margin: '0 0 15px 0', fontSize: '1.5rem' }}>
              🎯 Introduction
            </h2>
            <p style={{ margin: 0, color: '#4a5568', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Ce guide vous accompagne étape par étape dans la création d'un article. 
              Chaque section correspond à un champ dans l'éditeur d'articles.
            </p>
          </div>

          {/* Étape 1: Article à la une */}
          <div style={{ marginBottom: '35px', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#3b82f6', color: 'white', padding: '15px 20px' }}>
              <h3 style={{ margin: 0, fontSize: '1.3rem' }}>1️⃣ Article à la une</h3>
            </div>
            <div style={{ padding: '20px' }}>
              <p style={{ margin: '0 0 15px 0', color: '#4a5568', fontSize: '1rem' }}>
                <strong>Fonction :</strong> Détermine si l'article apparaît en premier sur la page d'accueil
              </p>
              <div style={{ backgroundColor: '#fef3c7', padding: '15px', borderRadius: '8px', border: '1px solid #f59e0b' }}>
                <p style={{ margin: 0, color: '#92400e', fontWeight: 'bold' }}>
                  💡 Conseil : Activez cette option pour vos articles les plus importants ou les plus récents
                </p>
              </div>
            </div>
          </div>

          {/* Étape 2: Titre */}
          <div style={{ marginBottom: '35px', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#10b981', color: 'white', padding: '15px 20px' }}>
              <h3 style={{ margin: 0, fontSize: '1.3rem' }}>2️⃣ Titre de l'article</h3>
            </div>
            <div style={{ padding: '20px' }}>
              <p style={{ margin: '0 0 15px 0', color: '#4a5568', fontSize: '1rem' }}>
                <strong>Fonction :</strong> Le titre principal de votre article (5-100 caractères)
              </p>
              <ul style={{ margin: '0 0 15px 0', paddingLeft: '20px', color: '#4a5568' }}>
                <li>Doit être accrocheur et informatif</li>
                <li>Maximum 100 caractères pour éviter les débordements</li>
                <li>Contient les mots-clés principaux</li>
                <li>Le slug sera généré automatiquement à partir du titre</li>
              </ul>
              <div style={{ backgroundColor: '#dbeafe', padding: '15px', borderRadius: '8px', border: '1px solid #3b82f6' }}>
                <p style={{ margin: 0, color: '#1e40af', fontWeight: 'bold' }}>
                  ✅ Exemple : "Les 5 meilleures techniques de rédaction web en 2024"
                </p>
              </div>
            </div>
          </div>

          {/* Étape 3: Chapeau */}
          <div style={{ marginBottom: '35px', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#8b5cf6', color: 'white', padding: '15px 20px' }}>
              <h3 style={{ margin: 0, fontSize: '1.3rem' }}>3️⃣ Chapeau (en italique et gras)</h3>
            </div>
            <div style={{ padding: '20px' }}>
              <p style={{ margin: '0 0 15px 0', color: '#4a5568', fontSize: '1rem' }}>
                <strong>Fonction :</strong> Résumé court et accrocheur qui apparaît sous le titre
              </p>
              <ul style={{ margin: '0 0 15px 0', paddingLeft: '20px', color: '#4a5568' }}>
                <li>Texte en italique et gras automatiquement</li>
                <li>Résume l'essentiel de l'article en 1-2 phrases</li>
                <li>Donne envie de lire la suite</li>
                <li>Apparaît avant le contenu principal</li>
              </ul>
              <div style={{ backgroundColor: '#f3e8ff', padding: '15px', borderRadius: '8px', border: '1px solid #8b5cf6' }}>
                <p style={{ margin: 0, color: '#6b21a8', fontWeight: 'bold', fontStyle: 'italic' }}>
                  "Découvrez les techniques éprouvées pour rédiger des articles qui captivent vos lecteurs et améliorent votre référencement."
                </p>
              </div>
            </div>
          </div>

          {/* Étape 4: Contenu */}
          <div style={{ marginBottom: '35px', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#f59e0b', color: 'white', padding: '15px 20px' }}>
              <h3 style={{ margin: 0, fontSize: '1.3rem' }}>4️⃣ Contenu de l'article</h3>
            </div>
            <div style={{ padding: '20px' }}>
              <p style={{ margin: '0 0 20px 0', color: '#4a5568', fontSize: '1rem' }}>
                <strong>Fonction :</strong> Le corps principal de votre article avec deux options
              </p>
              
              {/* Première lettre stylisée */}
              <div style={{ backgroundColor: '#fef3c7', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #f59e0b' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#92400e' }}>🎨 Première lettre stylisée</h4>
                <p style={{ margin: 0, color: '#92400e' }}>
                  Switch pour activer/désactiver la première lettre plus grande et colorée au début du contenu
                </p>
              </div>

              {/* Contenu stylisable */}
              <div style={{ backgroundColor: '#ecfdf5', padding: '15px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #10b981' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#065f46' }}>✨ Contenu stylisable (formatage riche)</h4>
                <p style={{ margin: '0 0 10px 0', color: '#065f46' }}>
                  <strong>Utilisez pour :</strong> Articles avec images, vidéos, liens, formatage avancé
                </p>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#065f46' }}>
                  <li>Images intégrées</li>
                  <li>Vidéos YouTube</li>
                  <li>Texte en gras, italique, listes</li>
                  <li>Liens internes et externes</li>
                </ul>
                <div style={{ backgroundColor: '#fef2f2', padding: '10px', borderRadius: '6px', marginTop: '10px', border: '1px solid #f87171' }}>
                  <p style={{ margin: 0, color: '#dc2626', fontSize: '0.9rem' }}>
                    ⚠️ Attention : Copier/coller uniquement compatible avec Chrome
                  </p>
                </div>
              </div>

              {/* Contenu simple */}
              <div style={{ backgroundColor: '#f0f9ff', padding: '15px', borderRadius: '8px', border: '1px solid #0ea5e9' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#0c4a6e' }}>📝 Contenu simple (texte brut)</h4>
                <p style={{ margin: '0 0 10px 0', color: '#0c4a6e' }}>
                  <strong>Utilisez pour :</strong> Articles simples, copier/coller depuis Word
                </p>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#0c4a6e' }}>
                  <li>Texte brut sans formatage</li>
                  <li>Compatible tous navigateurs</li>
                  <li>Parfait pour Word → copier/coller</li>
                  <li>Retours à la ligne automatiques</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Étape 5: Images */}
          <div style={{ marginBottom: '35px', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#ef4444', color: 'white', padding: '15px 20px' }}>
              <h3 style={{ margin: 0, fontSize: '1.3rem' }}>5️⃣ Images de l'article</h3>
            </div>
            <div style={{ padding: '20px' }}>
              <p style={{ margin: '0 0 20px 0', color: '#4a5568', fontSize: '1rem' }}>
                <strong>Fonction :</strong> Images qui s'affichent dans l'article
              </p>
              
              {/* Image de couverture */}
              <div style={{ backgroundColor: '#fef2f2', padding: '15px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #f87171' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#dc2626' }}>🖼️ Image de couverture</h4>
                <p style={{ margin: '0 0 10px 0', color: '#dc2626' }}>
                  Image principale qui apparaît en haut de l'article
                </p>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#dc2626' }}>
                  <li><strong>Obligatoire</strong> avec texte alternatif</li>
                  <li>Légende optionnelle (150 caractères max)</li>
                  <li>Format recommandé : 1200x630px</li>
                </ul>
              </div>

              {/* Première et seconde image */}
              <div style={{ backgroundColor: '#fef3c7', padding: '15px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #f59e0b' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#92400e' }}>🖼️ Première et seconde image</h4>
                <p style={{ margin: '0 0 10px 0', color: '#92400e' }}>
                  Images supplémentaires dans le corps de l'article
                </p>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#92400e' }}>
                  <li>Format carré recommandé</li>
                  <li>Légende optionnelle</li>
                  <li>Texte alternatif obligatoire</li>
                </ul>
              </div>

              {/* Défilement d'images */}
              <div style={{ backgroundColor: '#ecfdf5', padding: '15px', borderRadius: '8px', border: '1px solid #10b981' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#065f46' }}>🎠 Défilement d'images en fin d'article</h4>
                <p style={{ margin: '0 0 10px 0', color: '#065f46' }}>
                  Galerie d'images qui s'affiche à la fin de l'article
                </p>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#065f46' }}>
                  <li>Plusieurs images en galerie</li>
                  <li>Légende pour chaque image</li>
                  <li>Texte alternatif obligatoire</li>
                  <li>Affichage en défilement horizontal</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Étape 6: Métadonnées */}
          <div style={{ marginBottom: '35px', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#6b7280', color: 'white', padding: '15px 20px' }}>
              <h3 style={{ margin: 0, fontSize: '1.3rem' }}>6️⃣ Métadonnées</h3>
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ backgroundColor: '#f9fafb', padding: '15px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#374151' }}>📝 Excerpt</h4>
                  <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
                    Résumé court pour les aperçus d'articles (moteurs de recherche, réseaux sociaux)
                  </p>
                </div>
                <div style={{ backgroundColor: '#f9fafb', padding: '15px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#374151' }}>👤 Auteur</h4>
                  <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
                    Sélectionnez l'auteur de l'article depuis la liste
                  </p>
                </div>
                <div style={{ backgroundColor: '#f9fafb', padding: '15px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#374151' }}>🎨 Thème</h4>
                  <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
                    Choisissez le thème visuel de l'article
                  </p>
                </div>
                <div style={{ backgroundColor: '#f9fafb', padding: '15px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#374151' }}>📅 Date</h4>
                  <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
                    Date de publication (générée automatiquement)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Conseils finaux */}
          <div style={{ backgroundColor: '#1f2937', color: 'white', padding: '25px', borderRadius: '12px', marginBottom: '30px' }}>
            <h2 style={{ margin: '0 0 20px 0', color: '#f9fafb', fontSize: '1.5rem' }}>
              🎯 Conseils finaux
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div>
                <h4 style={{ margin: '0 0 10px 0', color: '#60a5fa' }}>✅ Vérifications</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#d1d5db' }}>
                  <li>Orthographe et grammaire</li>
                  <li>Textes alternatifs des images</li>
                  <li>Liens fonctionnels</li>
                  <li>Longueur appropriée</li>
                </ul>
              </div>
              <div>
                <h4 style={{ margin: '0 0 10px 0', color: '#60a5fa' }}>🚀 Optimisation</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#d1d5db' }}>
                  <li>Mots-clés pertinents</li>
                  <li>Structure claire</li>
                  <li>Images optimisées</li>
                  <li>Lecture mobile</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
              💡 <strong>Besoin d'aide ?</strong> Contactez l'administrateur pour toute question sur la rédaction d'articles.
            </p>
          </div>
        </div>
      ))
      .id('instructions-page')
    );
};
