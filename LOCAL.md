# Visualizzare il sito in locale

Il sito è generato con [Hugo](https://gohugo.io/) (versione extended, in CI si usa la 0.148.1).

## 1. Installare Hugo

```bash
# Arch / Omarchy
sudo pacman -S hugo

# Verifica
hugo version
```

## 2. Avviare il server di sviluppo

```bash
cd ~/Projects/mental-diff
hugo server
```

Poi apri http://localhost:1313/ nel browser. Il sito si ricarica da solo a ogni modifica.

## Varianti utili

```bash
# Includere anche le bozze (draft: true)
hugo server -D

# Cambiare porta
hugo server --port 8080

# Rendere il sito visibile da altri dispositivi in rete locale
hugo server --bind 0.0.0.0 --baseURL http://$(hostname -I | awk '{print $1}'):1313

# Forzare il ricaricamento completo (se qualcosa sembra in cache)
hugo server --disableFastRender
```

## Build statica (come in produzione)

```bash
hugo --minify          # output in ./public
cd public && python3 -m http.server 8000
```

Apri http://localhost:8000/

## Pulizia

```bash
rm -rf public resources
```
