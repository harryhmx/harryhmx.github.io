$(document).ready(function(){
    $.get('data/param.json', function(data){
        var pl = '', pr = '', lc = '';
        for(x in data.pf_left)
        {
            pl += '<p><strong>' + data.pf_left[x].property + ':</strong> ' + data.pf_left[x].value + '</p>';
        }
        for(y in data.pf_right)
        {
            pr += '<p><strong>' + data.pf_right[y].property + ':</strong> ' + data.pf_right[y].value + '</p>';
        }
        for(z in data.list_cases)
        {
            lc += '<div class="case-info"><div class="row"><div class="col-sm-4"><img src="' + data.list_cases[z].url_image
                + '" width="200" height="150"/></div><div class="col-sm-8"><h3>' + data.list_cases[z].title
                + '</h3><p>' + data.list_cases[z].description + '</p></div></div></div>';
        }
        document.title = data.head_title;
        $('#user_image').attr('src', data.user_image);
        $('#user_name').text(data.user_given + ' ' + data.user_family);
        $('#user_nick').text('(' + data.user_nick + ')');
        $('#pf_left').html(pl);
        $('#pf_right').html(pr);
        $('#list_cases').html(lc);
    });
});
