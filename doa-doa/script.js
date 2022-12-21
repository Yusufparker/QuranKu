

$(document).ready(function(){
    showAllDoa()
    let screenWidth = $(window).width();
    if (screenWidth <= 513){
        $('.col-back').removeClass('col-5').addClass('col-4')

    }
})



const showAllDoa = d =>{
    let doa = ``
    $.ajax({
        url: 'doa.json',
        success: response => {
            response.forEach(d => {
                doa += listDoa(d)
            });
            $('.content-doa').html(doa)
        }
    })
}



const listDoa = d =>{
    return `<div class="row  pt-2 pb-3 bg-white pe-2 ps-2 shadow-sm d-flex justify-content-center mb-5">
                <div class="col-10">
                    <p class="judul-doa">${d.id}. ${d.doa}</p>
                    <p class="fs-1 font-arab doa-arab fw-bold">${d.ayat}</p>
                    <p class="latin fw-light fst-italic">${d.latin}</p>
                    <p class="arti">${d.artinya}</p>
                </div>
            </div>`
}