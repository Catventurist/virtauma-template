---
title: Revontulet
description: Valot jotka palvelevat vain yhtä tarkoitusta. Ne tekevät taivaasta katsomisen arvoisen.
navigation:
  title: Revontulet
  icon: i-lucide-sparkles
author: Kissa
avatar: /cat.png
tag: Tarina
tagColor: primary
kind: lore
level: surface
time: 3min
likes: 0
replies: 0
publishedAt: 2026-05-25
tags: [tarina, revontulet, aurora, kauneus, mytologia, kettu]
---

> **"Revontulet eivät lämmitä. Ne eivät valaise polkua. Ne ovat olemassa, koska taivas ansaitsee tulla katsotuksi."**

Vanhat suomalaiset sanoivat revontulien olevan kettu, joka juoksee taivaalla, häntä
harjaten lunta vuorenhuipuilta ja lähettäen sen ylös kipinöinä. **Revontulet.**, ketuntulet. 

Kukaan ei kysynyt, mitä tarkoitusta kettu palveli. Valot riittivät.

Animaatio on sama asia. Jokaisen liikkeen ei tarvitse ansaita paikkaansa toiminnon
kautta. Osa siitä on olemassa, koska hyvin saapuva asia on eri, kuin joka vain ilmestyy. 
Läsnäolo ei ole koriste. Se on erona oven välillä, se joka avautuu ja se, joka oli aina auki.

## Kaksi maailmaa

Revontulet liikkuu kahden työkalun läpi, eivätkä ne ole sama työkalu.

**Tailwind** käsittelee sen mikä tiedetään jo rakennusaikana. Väri muuttuu
osoittimella. Varjo syvenee fokuksessa. Siirtymä käynnistyy koska luokka
lisättiin tai poistettiin. Nopea, deklaratiivinen, tilaton. Valot jotka ovat aina
taivaalla odottamassa oikeita olosuhteita.

**motion-v** käsittelee sen mikä tiedetään vasta ajon aikana. Elementti joka
saapuu sivulle ensimmäistä kertaa. Lista järjestää itsensä uudelleen.

Komponentti poistuu ennen kuin seuraava saapuu. Se tarvitsee JavaScriptiä,
koska sen täytyy tietää mitä tapahtuu, ei vain mikä luokka on läsnä.

Raja niiden välillä on raja **tilan** ja **tapahtuman** välillä. Tailwind vastaa
tilaan. motion-v vastaa tapahtumiin. Käytä väärää ja kirjoitat joko JavaScriptiä,
jota et tarvinnut tai pyydät CSS:ää muistamaan jotain, mitä se ei voi.

::callout{icon="i-lucide-zap" color="primary"}
Jos luokkamuutos riittää, anna Tailwindin tehdä se. Jos jonkin täytyy tietää
saapuvansa, poistuessaan tai järjestäytyessään uudelleen, se on motion-v:n heiniä.
::

## Tailwind - Pysyvä valo

Tailwind-siirtymät kuuluvat muuttujiin, jotka muuttavat tilaa ilman liittämistä tai
irrottamista. Painikkeet vaihtavat väriä. Syötteet paljastavat reunan
fokuksessa. Navigaatioelementit kirkastuvat aktiivisina.

Pidä kestot lyhyinä. `duration-150` interaktiivisille elementeille, `duration-300`
suuremmille pinnoille. Mitä pidempi kesto sen enemmän käyttöliittymä alkaa tuntua
mietteliäältä. `ease-out` saapuville asioille, `ease-in` poistuville, `ease-in-out`
molemmille.

`transition-colors` ja `transition-opacity` kattavat useimmat tapaukset. Käytä
`transition-all` harvoin, se on raskas ja animoi usein asioita, joita et tarkoittanut.

## motion-v - Elävä valo

motion-v käsittelee asiat jotka hengittävät. Sivusiirtymät, elementit jotka
saapuvat näkymään ja komponentit, jotka poistuvat ennen kuin seuraava saapuu.

`animate`-ominaisuus kantaa kohdetilan. `initial`-ominaisuus kantaa, mistä elementti tulee.
`exit`-ominaisuus kantaa, minne se menee poistuessaan. 

Kääri poistuvat elementit `AnimatePresence`-komponenttiin, jotta motion-v tietää odottaa poistumista ennen irrottamista.

Pidä sisääntuloanimaatiot hienovaraisina. Elementti joka liu'uttaa `8px` ylöspäin
haalistuen nollasta on riittävä. Käyttäjän tulisi tuntea saapuminen katsomatta esitystä.

::callout{icon="i-lucide-sparkles" color="secondary"}
Revontulet eivät ilmoita itsestään. Valot ovat yksinkertaisesti siellä, kun katsot
ylös. Liike joka kiinnittää huomion itseensä on jo epäonnistunut.
::

## Ajattaressa ja Ainossa

Ajatarin tiekarttarenkaat käyttävät motion-v SVG-animaatiota. Samankeskiset
ympyrät jotka sykkivät hiljaa, korostuvat vuorovaikutuksessa, viestivät syvyyttä
ilman yhtään sanaa. Uloin rengas liikkuu hitaimmin. Sisin nopeimmin. Etäisyys
keskuksesta on etäisyyttä nyt-hetkestä.

Ainon muutoslokin merkinnät saapuvat himmennyksellä ja pienellä ylöspäin
ajautumisella. Jokainen versio nousee esiin alta selaillessa, niin kuin muisto
nousee. Ei dramaattinen. Vain läsnä tavalla jolla staattinen lista ei ole.

Nämä eivät ole sama animaatio. Ne palvelevat eri tarkoituksia ja käyttävät eri
työkaluja. Ne jakavat on pidättyväisyyden. Revontulet ei täytä koko taivasta. Se jättää tilaa tähdille.

**Liike on läsnäoloa. Ei esitystä.**