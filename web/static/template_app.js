var bsc = "http://localhost:8000/upload"


console.log("hello template_bsc");

var files;

$('input[type=file]').change(function(){
    files = this.files;
});

$('.btn-template-bsc').on('click', function (event) {
    console.log("bsc button pressed");
    event.stopPropagation(); // Остановка происходящего
    event.preventDefault();  // Полная остановка происходящего
    var data = new FormData();
    $.each( files, function( key, value ){
        data.append( key, value );
    });
        $.ajax({
            type: 'POST',
            url: bsc,
            data: data,
            contentType: false,
            cache: false,
            processData: false,
            success: function(data) {
                console.log(data);
            },
        });
});
