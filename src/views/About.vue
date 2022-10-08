<template>
    <div id="about">
        <div class="about-us-wrap">
            <div class="container">
                <h1 class="headline">O nama</h1>
            </div>

            <section class="display-img">
                <img src="https://i.ibb.co/YyX8GdC/IMG-5693.jpg" />
            </section>

            <div class="container">
                <section class="section history">
                    <div class="section-title">
                        <div class="line"></div>
                        <div class="text">Uz Vas od 2015.</div>
                    </div>

                    <div class="section-content">
                        <div class="text">
                            Pravilna i suvremena zaštitna oprema na radu
                            preduvjet je svakog uspješnog poslovanja te mora
                            odgovarati mnogim visokim zahtjevima.
                            <br />
                            <br />
                            Bez adekvatne zaštite i svih mjera predostrožnosti
                            koje propisuje zakon, drastično raste rizik od
                            nezgoda, bolesti i ozljeda u radnom procesu. Osim
                            toga neadekvatna radna odjeća može stvoriti loš prvi
                            dojam o vašem poduzeću i zaposlenicima. Ono što nas
                            u JUKO d.o.o. čini profesionalcima na tom polju su
                            dva bitna faktora- visok stupanj zaštite te
                            raznolika ponuda u skladu s najnovijim zakonima i
                            normama. To je naša specijalnost od 2015. godine,
                            kada smo krenuli sa poslovanjem. Postoje razni
                            neprijatelji u radnom procesu kao što su hladnoća,
                            kiša, vjetar, toplina, vatra te razne termičke
                            opasnosti, čestice, tekuće kemikalije, buka,
                            plinovi, pare itd. Upotrebom zaštitne odjeće i obuće
                            štiti se cijelo tijelo radnika.
                            <br />
                            Naš asortiman broji preko 6.000 različitih artikala.
                            Osim osnovne zaštite tijela, u ponudi imamo i
                            zaštitu ruku, zaštita dišnih puteva, zaštita glave,
                            vida i sluha. Svako je zanimanje specifično te
                            zahtjeva specifičnu zaštitnu opremu. Osim stalno
                            dostupnih artikala u našoj ponudi, od 2017. godine
                            imamo i vlastiti šivaonski pogon gdje radimo odjevne
                            predmete s najkvalitetnijim materijalima po želji.

                            <br /><br />
                            Testirani, izdržljivi materijali i prikladan dizajn
                            su naša vodilja u šivaonskom pogonu čime osiguravamo
                            sigurnost i uredan izgled zaposlenika. Time
                            zadovoljavamo i najzahtjevnije kupce te se trudimo
                            udovoljiti svim Vašim sigurnosnim potrebama te
                            nudimo najbolji omjer cijene, zaštite, dostupnosti i
                            kvalitete. Prateći najnovije trendove, u ponudu smo
                            stavili i finalnu doradu proizvoda koja uključuje
                            reklamni print ili vez digitalizacije.
                        </div>
                        <div class="icon">
                            <img src="https://i.ibb.co/QN5c3z3/IMG-5651.jpg" />
                        </div>
                    </div>
                </section>

                <section class="section work" v-motion-slide-visible-once-left>
                    <div class="section-title title-right">
                        <div class="line"></div>
                        <div class="text">HoReCa</div>
                    </div>

                    <div class="section-content">
                        <div class="icon">
                            <img
                                src="https://i.ibb.co/G7zXJv7/IMG-5687.jpg"
                                alt=""
                            />
                        </div>
                        <div class="text">
                            Naša kolekcija za ugodtiteljstvo nudi širok
                            asortiman radne odjeće za profesionalce iz raznih
                            područja. Odjeća za kuhare, konobare, recepcionare i
                            ostalo uslužno osoblje je napravljena od laganih
                            materijala koji se ne gužvaju dok ste u pokretu
                            cijeli dan te osigurava moderan i profesionalan
                            izgled. Sva naša odjeća za kafiće, restorane i
                            hotele ima dug radni vijek te su svi perivi u
                            mašinama.

                            <br /><br />
                            U ugostiteljskoj ponudi ponudi imamo radne bluze,
                            T-shirt majice, polo majice, hlače, gastro kape,
                            pregače, jakne, kute, košulje i odijela.
                        </div>
                    </div>
                </section>

                <section
                    class="section brands"
                    v-motion-slide-visible-once-right
                >
                    <div class="section-title">
                        <div class="line"></div>
                        <div class="text">Šivani program</div>
                    </div>

                    <div class="section-content">
                        <div class="text">
                            Od 2017. godine proizvodimo radna odijela raznih
                            modela i različitih izrada.
                            <br /><br />
                            Naša radna odijela sašivena su najčešće od tkanine
                            firme Klopman , koju koriste i ostali poznati
                            proizvođači zaštitne radne odjeće dok u ponudi imamo
                            i druge materijale ovisno o željama ( sastav
                            tkanine, gramaža…). Mnoge detalje kao što su boja
                            tkanine, materijal, poziciju džepova, pojačanja,
                            kopčanja, poziciju i veličinu logotipa biramo
                            zajedno u dogovoru s kupcem. Naša proizvodnja u
                            ponudi ima radne hlače, radne kute, prsluke, radna
                            odijela, zaštitne maske itd. Radnu odjeću
                            proizvodimo sukladno zakonskim normama i
                            regulativama. Zbog individualnog pristupa i načina
                            rada, šivani program se većinom radi po narudžbi.
                            Uvjerite se u kvalitetu naše usluge.
                            <br /><br />
                            Pošaljite nam svoj upit OVDJE i provjerite kvalitetu
                            naše usluge.
                        </div>
                        <div class="icon">
                            <img
                                src="https://i.ibb.co/GsLTzkb/IMG-5692.jpg"
                                alt=""
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// import { Star } from 'mdue';

export default {
    name: 'O nama',
};
</script>

<style lang="scss">
.about-us-wrap {
    @apply my-10;

    .display-img {
        @apply w-full h-auto max-h-72 flex items-center justify-center overflow-hidden;

        img {
            @apply w-full;
        }
    }

    .section {
        @apply my-16;

        .section-title {
            @apply mx-4;

            .line {
                @apply h-1.5 w-8 bg-red-500 bg-opacity-75;
            }

            .text {
                @apply my-4 uppercase font-bold text-2xl tracking-widest;
            }

            &.title-right {
                .text {
                    @apply text-right;
                }

                .line {
                    @apply ml-auto;
                }
            }
        }

        .section-content {
            @apply grid gap-8 grid-cols-1 md:grid-cols-2;

            .icon {
                @apply w-full h-auto max-h-full;

                img {
                    @apply w-full h-auto;
                }
            }

            .text {
                @apply tracking-wide;
            }
        }
    }

    .review {
        @apply bg-gray-500 bg-opacity-30 w-max mx-auto px-20 py-8 
            flex flex-col items-center gap-2 rounded-2xl;

        .review-title {
            @apply tracking-wider font-thin;
        }

        .stars {
            @apply flex gap-x-1 text-yellow-500;
        }

        .quote {
            @apply my-2 italic tracking-tight font-bold;
        }
    }
}
</style>
