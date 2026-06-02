# Ebooks PDFs

Coloca os 3 PDFs dos ebooks aqui com exatamente esses nomes:

| Arquivo | Ebook |
|---|---|
| `ergogenicos-pt-1.pdf` | Ergogênicos · Parte 1 (R$15) |
| `ergogenicos-pt-2.pdf` | Ergogênicos · Parte 2 (R$15) |
| `peptideos.pdf` | Peptídeos (R$27) |

O frontend procura nesses caminhos:
- `pdfs/ebooks/ergogenicos-pt-1.pdf`
- `pdfs/ebooks/ergogenicos-pt-2.pdf`
- `pdfs/ebooks/peptideos.pdf`

Acesso é controlado pelo backend — quem comprou na Hotmart (qualquer dos 3 produtos ou o Super Combo) recebe `purchase.ergo1/ergo2/pept = true` via webhook, e o app libera o botão "📥 Baixar PDF" automaticamente.

Quem não comprou só vê o card de venda (com link Hotmart pra checkout). Não tem auth da URL direta do PDF — segurança vem da obfuscação igual aos outros PDFs do app (régua, engenharia, dietas).
