import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const { heroType, contentFile } = await request.json()
    
    // Pfad zur Content-Datei
    const contentPath = path.join(process.cwd(), 'data', contentFile)
    
    // Prüfen ob Datei existiert
    if (!fs.existsSync(contentPath)) {
      return NextResponse.json(
        { error: 'Content-Datei nicht gefunden' },
        { status: 404 }
      )
    }
    
    // Content-Datei lesen
    const contentData = JSON.parse(fs.readFileSync(contentPath, 'utf8'))
    
    // Hero-Typ aktualisieren
    if (!contentData.hero) {
      contentData.hero = {}
    }
    contentData.hero.type = heroType
    
    // Datei zurückschreiben
    fs.writeFileSync(contentPath, JSON.stringify(contentData, null, 2), 'utf8')
    
    return NextResponse.json({ 
      success: true, 
      message: `Hero-Typ zu "${heroType}" geändert in ${contentFile}` 
    })
    
  } catch (error) {
    console.error('Fehler beim Ändern des Hero-Typs:', error)
    return NextResponse.json(
      { error: 'Fehler beim Ändern des Hero-Typs' },
      { status: 500 }
    )
  }
} 