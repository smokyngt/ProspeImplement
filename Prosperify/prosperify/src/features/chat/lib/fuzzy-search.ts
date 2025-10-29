export interface SearchResult {
  pageIndex: number
  score: number
  snippet: string
  bbox?: { x: number; y: number; width: number; height: number }
}

export class FuzzySearchEngine {
  private pageTexts: string[] = []
  private trigramIndex: Map<string, Set<number>> = new Map()

  constructor() {}

  // Génère les trigrammes d'un texte
  private generateTrigrams(text: string): Set<string> {
    const normalized = text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
    const trigrams = new Set<string>()

    for (let i = 0; i <= normalized.length - 3; i++) {
      trigrams.add(normalized.slice(i, i + 3))
    }

    return trigrams
  }

  // Index le texte d'une page
  indexPage(pageIndex: number, text: string) {
    this.pageTexts[pageIndex] = text
    const trigrams = this.generateTrigrams(text)

    trigrams.forEach((trigram) => {
      if (!this.trigramIndex.has(trigram)) {
        this.trigramIndex.set(trigram, new Set())
      }
      this.trigramIndex.get(trigram)!.add(pageIndex)
    })
  }

  // Recherche fuzzy avec score Jaccard
  search(query: string, topK = 5): SearchResult[] {
    const queryTrigrams = this.generateTrigrams(query)
    const candidateScores = new Map<number, number>()

    // Score Jaccard basé sur les trigrammes
    queryTrigrams.forEach((trigram) => {
      const pages = this.trigramIndex.get(trigram)
      if (pages) {
        pages.forEach((pageIndex) => {
          const currentScore = candidateScores.get(pageIndex) || 0
          candidateScores.set(pageIndex, currentScore + 1)
        })
      }
    })

    // Normalisation du score Jaccard
    const results: SearchResult[] = []
    candidateScores.forEach((intersectionSize, pageIndex) => {
      const pageText = this.pageTexts[pageIndex]
      if (pageText) {
        const pageTrigrams = this.generateTrigrams(pageText)
        const unionSize = queryTrigrams.size + pageTrigrams.size - intersectionSize
        const jaccardScore = intersectionSize / unionSize

        if (jaccardScore > 0.1) {
          // Seuil minimum
          results.push({
            pageIndex,
            score: jaccardScore,
            snippet: this.extractSnippet(pageText, query),
          })
        }
      }
    })

    // Tri par score décroissant et limitation
    return results.sort((a, b) => b.score - a.score).slice(0, topK)
  }

  private extractSnippet(text: string, query: string, maxLength = 150): string {
    const queryLower = query.toLowerCase()
    const textLower = text.toLowerCase()
    const index = textLower.indexOf(queryLower)

    if (index === -1) {
      return text.slice(0, maxLength) + (text.length > maxLength ? "..." : "")
    }

    const start = Math.max(0, index - 50)
    const end = Math.min(text.length, index + query.length + 50)
    const snippet = text.slice(start, end)

    return (start > 0 ? "..." : "") + snippet + (end < text.length ? "..." : "")
  }
}
