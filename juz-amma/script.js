$(document).ready(function(){
    showListSurat()
    let screenWidth = $(window).width();
    if (screenWidth <= 513){
        $('.col-back').removeClass('col-5').addClass('col-4')

    }
})





function showListSurat(){
    let cover_surat = '';
    $.ajax({
        url : 'https://equran.id/api/surat',
        success: data =>{
            data.forEach(s => {
                if (s.nomor >= 78){
                    cover_surat+= daftarSurat(s);
                }
                //console.log(s);
            });
            $('.container-surat').html(cover_surat)
            $('.nama-surat').on('click', function(){
                let surat = $(this).data('surat').toLowerCase()
                //console.log(surat);
                showSuratBesertaIsi(surat)
                
            })
        }
    })
}

function showSuratBesertaIsi(nama_surat){
    $.ajax({
        url: 'https://equran.id/api/surat',
        success: function(data) {
        let i = data.findIndex((surat) => surat.nama_latin.toLowerCase() === nama_surat)
        //console.log(data[i]);
        let surat = i+1;
        $.ajax({
            url: 'https://equran.id/api/surat/'+surat,
            success: function (data_surat){
                let isi_ayat = `<div class="container body-quran">
                <div class="row mb-5 shadow-sm">
                <div class="col p-3 text-center">
                        <h5>${data_surat.nama_latin} • ${data_surat.nama}</h5>
                        <h6>${data_surat.tempat_turun} • ${data_surat.jumlah_ayat} Ayat </h6>
                    </div>
                    </div>`;
                //console.log(data_surat);
                data_surat.ayat.forEach(s => {
                    isi_ayat+=showAyat(s);
                    //console.log(s);
                });

                $('.container-surat').html(isi_ayat)
                $('.btn-tafsir-ayat').on('click',function(){
                    let ayat = $(this).data('ayat')-1;
                    let isi_surat = $(this).data('isi')
                    $.ajax({
                        url:'https://equran.id/api/tafsir/'+surat,
                        success: function(data_tafsir){
                            //console.log(data_tafsir.tafsir[ayat].tafsir);
                            $('.modal-content').html(showModal(data_tafsir, ayat, isi_surat))
                        }
                    })

                })
                //console.log(data_surat.ayat[0].ar);
            },error: e => console.log(e.status)
        })
        },
        error: function(error) {
            console.error(error);
        }
        });
}

const  daftarSurat = s=> {
    return `<div class="col-md-3 nama-surat mb-5 ms-1 me-1  pe-2 ps-4 pt-3 pb-3 shadow-sm" data-surat = "${s.nama_latin}">
            <div class="row d-flex justify-content-between">
                <div class="col-1 bg-secondary text-center pe-4 text-white"> ${s.nomor} </div>
                <div class="col-6 fw-bold text-end font-arab">${s.nama}</div>
            </div>
            <div class="row text-end">
                <p>${s.nama_latin}</p>
                <em>${s.arti} (${s.jumlah_ayat} ayat)</em>
            </div>
        </div>`
}

const showAyat = s =>{
    return `<div class="row d-flex justify-content-between ps-5 pe-5 pt-3 pb-3 shadow-sm ">
                <div class="col-1">
                    <div class="dropdown">
                        <button class="btn btn-success btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                ${s.surah} : ${s.nomor}
                        </button>
                        <ul class="dropdown-menu menu-ayat">
                            <li><a class="dropdown-item" href="#">Copy <i class="bi bi-clipboard"></i></a></li>
                            <li><a class="dropdown-item btn-tafsir-ayat" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-ayat="${s.nomor}" data-isi="${s.ar}">Tafsir <i class="bi bi-journals"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-9">
                    <div class="row text-end"><p class="fs-2 font-arab">${s.ar}</p></div>
                    <div class="row text-start"><p class="fw-light"><i>${s.tr}</i></p></div>
                    <div class="row text-start"><p class="">${s.idn}</p></div>               
                </div>
            </div>`
}


function showModal(s, ayat, isi_surat){
    return `<div class="modal-header">
    <h1 class="modal-title fs-5 fw-light" id="staticBackdropLabel">Tafsir Q.S ${s.nomor}:${ayat+1}</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body p-5">
    <div class="row text-end">
        <p class="fs-2 font-arab">${isi_surat}</p>
    </div>
    <div class="row mt-3">
        <p class="fw-bold">Tafsir</p>
        <p>${s.tafsir[ayat].tafsir}</p>  
    </div>
</div>
<div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
</div>`
}
