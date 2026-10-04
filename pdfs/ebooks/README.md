# Ebooks: NÃO coloque os PDFs aqui

Esta pasta está vazia de propósito. Os PDFs dos ebooks **saíram daqui em 04/10/2026**.

Antes eles ficavam neste caminho e eram servidos como arquivo estático pelo GitHub
Pages, sem nenhuma verificação: qualquer pessoa com o endereço baixava os 31 MB
inteiros sem ser aluna. O README anterior chamava isso de "segurança por obfuscação",
o que não é segurança: o endereço não era secreto, estava no código do app, que é
público neste mesmo repositório.

## Onde os ebooks moram agora

No Google Drive, pasta `Ebooks (protegidos)`, e só saem pela API com login:

| Ebook | id | Preço |
|---|---|---|
| Ergogênicos, Parte 1 | `ergo1` | R$15 |
| Ergogênicos, Parte 2 | `ergo2` | R$15 |
| Peptídeos | `pept` | R$27 |

O caminho é: o app chama `POST /api/ebook/ticket` com o login no cabeçalho, a API
confere a flag da compra (`ergo1`/`ergo2`/`pept`) e devolve um endereço que vale 5
minutos; esse endereço entrega o arquivo. Quem não comprou leva 403, e sem a
passagem o download dá 401.

## Para trocar um ebook por uma versão nova

Não commite o PDF. Suba o arquivo em algum lugar que a API alcance e chame:

```
GET /api/admin/ebook-import?secret=<ADMIN_SECRET>&id=ergo1&url=<url do PDF>
```

Isso grava no Drive e atualiza o apontamento. O mesmo `id` sobrescreve a versão
anterior, então reimportar não enche o Drive de cópias.

## Aviso sobre o histórico

Os PDFs removidos **continuam no histórico do git** e este repositório é público,
então seguem alcançáveis por hash de commit antigo. Remover de vez exige reescrever
o histórico ou fechar o repositório. Decisão pendente com o GH.
