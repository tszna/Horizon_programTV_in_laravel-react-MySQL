# Horizon_program
Jest to aplikacja, która wyświetla program telewizyjny. Projekt ten, jest dla mnie polem do nauki laravela i reacta. Aplikacja jest tworzony przy wykorzystaniu laravela, reacta oraz css. Baza danych opiera się na MySQL.
Aplikacja wykonuje automatyczne przesuwanie się audycji zgodnie z wyznaczonym czasem, tak aby zsynchronizować wyświetlane audycję z aktualnym czasem. Można również przesuwać linię czasu w lewo i w prawo

<img src="https://i.imgur.com/sRZofTb.gif" alt="operation in Horizon-program app">

Kolejne auducje doczytują się asynchronicznie po wykonaniu scrolla do określonego punktu w przeglądarce.

<img src="https://i.imgur.com/GgRtZR2.gif" alt="operation in Horizon-program app">

Zaimplementowana jest również wyszukiwarka. Po wpisaniu frazy, wyszukuje kanały i audycje pasujące do wskazanej frazy. Po kliknięciu na wybraną audycję, pojawia się okno ze szczegółami pozycji oraz przyciskiem służącym do pobrania szegółów audycji w formacjie CSV.

<img src="https://i.imgur.com/9gxkuAs.gif" alt="operation in Horizon-program app">

Oprócz programu telewizyjnego, planuje wdrożyć moduł odpowiadający za dodawanie i edycje audycji, czyli zarządzanie zawartością programu telewizyjnego.

<h4>Instalacja projektu</h4>
Po pobraniu projektu należy w katalogu prog-laravel wpisać w terminalu komendę:
<pre><code>composer install</code></pre>
Następnie w bazie mysql utworzyć bazę danych o nazwie: prog, i użytkownika z uprawnieniami do tej bazy danych o loginie: prog i haśle: prog.
W kolejnym kroku wpisać w terminalu komendę:
<pre><code>php artisan migrate:fresh --seed</code></pre>
później:
<pre><code>php artisan storage:link</code></pre>
a na koniec:
<pre><code>php artisan serve</code></pre>

Teraz należy przejść w terminalu do katalogu prog-react i wprowadzić komendę:
<pre><code>npm install</code></pre>
oraz:
<pre><code>npm start</code></pre>
Strona główna aplikacji jest dostępna domyślnie na porcie 3000.

<h4>Uruchomienia projektu poprzez docker</h4>
Po pobraniu projektu należy skopiować zawartość katalogu Docker i wkleić do głównego katalogu aplikacji, w taki sposób aby nadpisać istniejące pliki. Następnie należy uruchomić terminal w głównym katalogu aplikacji i wpisać komendę:
<pre><code>docker-compose up</code></pre>
następnie:
<pre><code>docker-compose exec program-tv-php php artisan migrate:fresh --seed</code></pre>
a na końcu:
<pre><code>docker-compose exec program-tv-php php artisan storage:link</code></pre>
Kontener phpmyadmin nasłuchuje domyślnie na porcie 7080, a aplikacja wyświetla się na porcie 3001. Domyślne porty można zmienić w pliku docker-compose.yml
