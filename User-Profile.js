

$(document).ready(() => {

    $('#profileTitle').tooltip({track:true});
    $('#newsTitle').tooltip({track:true});
    $('#logOutTitle').tooltip({track:true});
     
    //let myFacebookToken = $('#kv').val();
         let myFacebookToken =  $("#kv").keyup(function(){
               $('#sub').submit(function(e){
        
        getAllDetails();
    }); 
        });
  
}); // end document.ready function

let getAllDetails = () => {
alert('gfdn');
$('.box').hide();
    // API call to get user details

    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: 'https://graph.facebook.com/me?fields=id,name,birthday,picture.type(large),feed{message,story},about,first_name,email,hometown,education,work,friends,cover,gender&access_token=' + myFacebookToken,

        success: (response) => {
             
            console.log(response);
            $('#dataSection').css('display', 'block');

            $('#userName').append(response.name);
            $('#email').append(response.email);
            $('#birthday').append(response.birthday);
            $('#homeTown').append(response.hometown.name);
             
            $('.wrap').accordion({ active: "false" });
            $('.wrap').accordion({event: "mouseover"});

            $('#search').autocomplete({source: ["Name","Email","birthday","HomeTown","Story"]})

            $('#profile').html('<img src="' + response.picture.data.url + '" class="img-fluid profilePic"/>');

            $('#cover').css('background-image', 'url(' + response.cover.source + ')');



        }, error: (err) => {

            console.log(err.responseJSON.error.message);
            alert(err.responseJSON.error.message)

        }

    });// end ajax call 

}