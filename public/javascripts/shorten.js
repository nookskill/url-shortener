$('#btn-shorten').on('click', function(){
  $.ajax({
    url: '/api/shorten',
    type: 'POST',
    dataType: 'JSON',
    data: {url: $('#url-field').val()},
    success: function(data){
        var resultHTML = '<a class="result" href="' + data.shortUrl + '">'
            + data.shortUrl + '</a>';
        $('#link').html(resultHTML);
        $('#link').hide().fadeIn('slow');
    }
  });

});

// function for custom URL
$('#btn-custom').on('click', function(){
  $.ajax({
    url: '/api/shorten-custom',
    type: 'POST',
    dataType: 'JSON',
    data: {url: $('#url-field-custom').val(),
           custom: $('#url-custom').val()
    },
    success: function(data){
        var resultHTML = '<a class="result" href="' + data.shortUrl + '">'
            + data.shortUrl + '</a>';
        $('#link-custom').html(resultHTML);
        $('#link-custom').hide().fadeIn('slow');
    }
  });

});