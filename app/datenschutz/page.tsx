'use client'

import { useContentWithUrlParams } from '@/lib/hooks/useUrlParams'
import { getContentData } from '@/lib/config'

export default function Datenschutz() {
  const baseContent = getContentData()
  const content = useContentWithUrlParams(baseContent)

  // Adresse für bessere Darstellung aufteilen
  const formatAddress = (address: string) => {
    const parts = address.split(',').map(part => part.trim())
    if (parts.length >= 2) {
      const street = parts[0]
      const cityPart = parts[parts.length - 1]
      return { street, cityPart }
    }
    return { street: address, cityPart: '' }
  }

  const { street, cityPart } = formatAddress(content.contact.address)

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Datenschutzerklärung</h1>
          
          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Datenschutz auf einen Blick</h2>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Allgemeine Hinweise</h3>
            <p className="mb-4">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten 
              passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie 
              persönlich identifiziert werden können.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">Datenerfassung auf unserer Website</h3>
            <p className="mb-4">
              <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
              können Sie dem Impressum dieser Website entnehmen.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Hosting</h2>
            <p className="mb-4">
              Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Externes Hosting</h3>
            <p className="mb-4">
              Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, 
              werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, 
              Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, 
              die über eine Website generiert werden, handeln.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Datenschutz</h3>
            <p className="mb-4">
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre 
              personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie 
              dieser Datenschutzerklärung.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">Hinweis zur verantwortlichen Stelle</h3>
            <p className="mb-4">
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
            </p>
            <p className="mb-4">
              {content.company.name}<br />
              {street}<br />
              {cityPart}<br />
              <br />
              Telefon: {content.contact.phone}<br />
              E-Mail: {content.contact.email}
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Datenerfassung auf unserer Website</h2>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Cookies</h3>
            <p className="mb-4">
              Unsere Internetseiten verwenden so genannte &quot;Cookies&quot;. Cookies sind kleine Textdateien und richten auf 
              Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung 
              (Session-Cookies) oder dauerhaft (dauerhafte Cookies) auf Ihrem Endgerät gespeichert.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">Server-Log-Dateien</h3>
            <p className="mb-4">
              Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, 
              die Ihr Browser automatisch an uns übermittelt. Dies sind:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Browsertyp und Browserversion</li>
              <li>verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Kontaktformular</h2>
            <p className="mb-4">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular 
              inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall 
              von Anschlussfragen bei uns gespeichert.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Ihre Rechte</h2>
            <p className="mb-4">
              Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer 
              gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung 
              oder Löschung dieser Daten zu verlangen.
            </p>

            <p className="mb-6 text-sm text-gray-500">
              Stand: {new Date().toLocaleDateString('de-DE')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
