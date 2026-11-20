SOKERIMUISTUTTAJA 1.0 – ASENNUSOHJE

Tiedostot:
index.html, style.css, app.js, manifest.json, sw.js ja icons-kansio.

TÄRKEÄÄ:
PWA tarvitsee HTTPS-osoitteen. Pelkkä tiedostojen avaaminen iPhonen Tiedostot-sovelluksesta ei riitä asentamiseen.
Tämä ensimmäinen versio tallentaa kellonajat ja kuittaukset selaimen paikalliseen tallennustilaan.
Se EI pysty luotettavasti lähettämään ajastettuja ilmoituksia silloin, kun sovellus on suljettu. Ilmoituspainike pyytää selaimen luvan ja sovelluksen ollessa auki se voi näyttää ajankohtaisen muistutuksen.
Taustalla toimivat Web Push -ilmoitukset vaativat erillisen push-palvelimen ja tilauksen. Älä luota tähän sovellukseen terveydenhuollon hälytyksissä. Pidä Libre 3:n omat hälytykset käytössä.

ASENNUS:
1. Julkaise koko kansio HTTPS-verkkosivuna (esimerkiksi GitHub Pagesin tai muun staattisen HTTPS-hostauksen avulla).
2. Avaa julkaistu HTTPS-osoite iPhonen Safarissa.
3. Paina Jaa -> Lisää Koti-valikkoon.
4. Kytke "Avaa verkkosovelluksena" päälle, jos valinta näkyy.
5. Paina Lisää.
6. Avaa Sokerimuistuttaja kotinäytön kuvakkeesta.
7. Paina "Ota ilmoitukset käyttöön" ja hyväksy lupa, jos haluat sovelluksen aikaiset ilmoitukset.

Päivittäiset taustamuistutukset:
Luo iPhonen Pikakomennot-sovelluksessa erilliset Kellonaika-automaatiot klo 09:00, 13:00, 18:00 ja 21:00. Lisää jokaiseen Näytä ilmoitus -toiminto ja käytä tekstiä:
"Muista tarkistaa sokerit Libre 3 -sovelluksesta!"
Aseta toisto päivittäin ja automaatio suoritettavaksi heti. Tämä on tämän version suositeltu tapa saada ajastetut muistutukset.

Sovellus ei mittaa glukoosia eikä korvaa Libre 3:n omia hälytyksiä.
