# Zadanie-rekrutacyjne-Oxido-
# Projekt Generowania HTML Artykułu z OpenAI API

Ten projekt wykorzystuje OpenAI API do generowania strukturalnego kodu HTML dla artykułów na podstawie tekstu w pliku `artykul.txt`. Wygenerowany HTML jest zapisywany w pliku `artykul.html`. Projekt zawiera również pliki szablonu, które umożliwiają wyświetlenie artykułu w stylizowanym formacie.

## Wymagania

- **Node.js** (wersja 14 lub nowsza)
- **npm** (Node Package Manager)

## Konfiguracja

### 1. Sklonuj Repozytorium:
```bash
git clone <adres_repozytorium>
cd <katalog_repozytorium>
```

### 2. Zainstaluj Zależności:
Uruchom następujące polecenie, aby zainstalować wymagane pakiety:
```bash
npm install
```

### 3. Skonfiguruj Plik Środowiskowy:
Utwórz plik `.env` w katalogu głównym repozytorium z kluczem API OpenAI:
```plaintext
OPENAI_API_KEY=twój_klucz_api_openai
```

## Dodanie Bibliotek i Typu Modułu

W tym projekcie używamy dwóch podstawowych bibliotek:

- **openai**: SDK umożliwiający integrację z OpenAI API.
- **dotenv**: Biblioteka do zarządzania zmiennymi środowiskowymi, co pozwala na bezpieczne przechowywanie klucza API.

Aby zainstalować te biblioteki oraz upewnić się, że Node.js rozpoznaje pliki jako moduły ES, wykonaj poniższe kroki:

1. Zainstaluj wymagane biblioteki za pomocą npm:
   ```bash
   npm install openai dotenv
   ```

2. Zaktualizuj plik `package.json`, dodając `"type": "module"` do struktury JSON, aby plik miał następującą strukturę:
   ```json
   {
     "type": "module",
     "dependencies": {
       "openai": "^4.72.0",
       "dotenv": "^16.4.5"
     }
   }
   ```

## Opis Plików

- **artykul.txt**: Plik zawierający treść artykułu, który zostanie przetworzony.
- **artykul.html**: Plik, do którego zapisywany jest wygenerowany przez OpenAI kod HTML artykułu.
- **szablon.html**: Pusty szablon z przygotowanymi stylami. W `body` nie zawiera treści artykułu, jest gotowy na wklejenie kodu HTML.
- **szablon z skryptem.html**: Plik szablonu z dodanym skryptem JavaScript do automatycznego załadowania treści z `artykul.html`.
- **podglad.html**: Plik końcowy zawierający pełny podgląd artykułu, gotowy do wizualizacji z załadowanym kodem z `artykul.html`.

## Użycie

### 1. Uruchom Skrypt:
Aby wygenerować plik HTML z tekstu artykułu, uruchom:
```bash
node zadanie.js
```

Skrypt odczyta `artykul.txt`, przetworzy go przez API OpenAI i zapisze wygenerowaną treść HTML w `artykul.html`.

### 2. Przeglądanie Artykułu

- **Opcja 1**: Otwórz plik `podglad.html`, aby zobaczyć pełny podgląd artykułu z załadowaną treścią.
- **Opcja 2**: Użyj `szablon z skryptem.html` do dynamicznego załadowania treści z pliku `artykul.html` za pomocą JavaScript. Otwórz ten plik w przeglądarce, a artykuł zostanie automatycznie załadowany do sekcji `body`.

## Biblioteki

Projekt wymaga zainstalowania następujących bibliotek:
- **openai**: SDK do komunikacji z OpenAI API.
- **dotenv**: Do zarządzania zmiennymi środowiskowymi i kluczem API.

---

Po skonfigurowaniu środowiska, skopiowaniu klucza do pliku `.env`, uruchomieniu `node zadanie.js` i otwarciu `podglad.html`, powinieneś zobaczyć kompletny artykuł wygenerowany przez OpenAI API.
