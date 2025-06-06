export default function Impressum() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Impressum</h1>
          
          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-semibold mt-8 mb-4">Angaben gemäß § 5 TMG</h2>
            
            <div className="mb-6">
              <p className="mb-2"><strong>Max Mustermann</strong></p>
              <p className="mb-2">Mustermann Handwerk</p>
              <p className="mb-2">Aloysiusstr. 144</p>
              <p className="mb-4">48429 Rheine</p>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Kontakt</h2>
            <div className="mb-6">
              <p className="mb-2">Telefon: +49 (0) 123 456789</p>
              <p className="mb-2">E-Mail: info@mustermann-handwerk.de</p>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Umsatzsteuer-ID</h2>
            <p className="mb-6">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              DE123456789 (Beispiel)
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Berufsbezeichnung und berufsrechtliche Regelungen</h2>
            <div className="mb-6">
              <p className="mb-2">Berufsbezeichnung: Fliesenleger</p>
              <p className="mb-2">Zuständige Kammer: Handwerkskammer Münster</p>
              <p className="mb-2">Verliehen durch: Deutschland</p>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4">EU-Streitschlichtung</h2>
            <p className="mb-6">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" 
                 className="text-blue-600 hover:text-blue-800 underline ml-1">
                https://ec.europa.eu/consumers/odr/
              </a><br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
            <p className="mb-6">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Redaktionell verantwortlich</h2>
            <div className="mb-6">
              <p className="mb-2">Max Mustermann</p>
              <p className="mb-2">Aloysiusstr. 144</p>
              <p className="mb-2">48429 Rheine</p>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Haftung für Inhalte</h2>
            <p className="mb-4">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
              allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
              unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach 
              Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Haftung für Links</h2>
            <p className="mb-4">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der 
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Urheberrecht</h2>
            <p className="mb-6">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen 
              Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der 
              Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>

            <div className="border-t pt-6 mt-8">
              <h3 className="text-lg font-medium mb-4">Website-Entwicklung</h3>
              <p className="text-sm text-gray-600">
                Website erstellt von:{" "}
                <span className="font-medium">ml | websolutions</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
