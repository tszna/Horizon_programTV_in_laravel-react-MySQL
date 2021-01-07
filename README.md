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
Po pobraniu projektu należy w katalogu laravela wpisać w terminalu komendę:
<pre><code>composer install</code></pre>
następnie:
<pre><code>cp .env.example .env</code></pre>
Teraz należy zmienić w pliku .env dane dostepu do bazy danych, później np. w programie xampp uruchomić obsługę MySQL i dodać użytkownika w panelu zarządzania SQL.
W kolejnym kroku wpisać w terminalu komendę:
<pre><code>php artisan migrate:fresh --seed</code></pre>
później:
<pre><code>php artisan storage:link</code></pre>
a na koniec:
<pre><code>php artisan serve</code></pre>

Teraz należy przejść w terminalu do katalogu reacta i wprowadzić komendę:
<pre><code>npm install</code></pre>
oraz:
<pre><code>npm start</code></pre>
Strona główna aplikacji jest dostępna domyślnie na porcie 3000.
