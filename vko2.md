### Viikon 2 tehtävä:

Jekyll-sivuston automatisointi GitHub Actions -toimintojen avulla onnistuu luomalla työnkulku (workflow), 
joka käynnistyy esimerkiksi koodin pushaamisen yhteydessä. Työnkulussa määritetään vaiheita, kuten riippuvuuksien asentaminen (bundler install), 
sivuston rakentaminen (bundle exec jekyll build) ja lopuksi valmiin sivuston julkaisu GitHub Pagesiin. Tämä mahdollistaa automaattisen julkaisun aina, 
kun sisältöä tai koodia päivitetään.

Web-sovelluksen CI/CD-putkiston rakentamisessa voidaan hyödyntää työkaluja kuten GitHub Actions, Docker, 
ja palvelimia kuten Heroku, Vercel tai AWS. Kehitystyössä suosittuja tekniikoita ovat testiautomaatio 
(esim. Jest, RSpec), lintterit (esim. ESLint) ja yksikkö- sekä integraatiotestit. CI
varmistaa, että koodi toimii ennen yhdistämistä päähaaraan, ja CD julkaisee muutokset automaattisesti, 
mikä nopeuttaa kehitystä ja parantaa laatua.

[Palaa tehtävälistaan](https://viscidbog.github.io/pagesexample/)
