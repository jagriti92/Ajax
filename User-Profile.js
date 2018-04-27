
 let myFacebookToken; // defiened a variable globally
 
$(document).ready(() => {
    $(".hideIt").hide();
    $.widget.bridge('uitooltip', $.ui.tooltip);
    $.widget.bridge('uibutton', $.ui.button);
    $('#profileTitle').tooltip({track:true});
    $('#newsTitle').tooltip({track:true});
    $('#logOutTitle').tooltip({track:true});

   
         
        // Hijack form submit
        $('#btn').click(function(event){
          // Set username variable
          myFacebookToken = $('input#kv').val(); 
         
          // Check if username value set
          if ((myFacebookToken) != "") {
                getProfileDetails();
        
                 console.log('fyju');
                 return false;
          }
      });

  
}); // end document.ready function

let getProfileDetails = () => {

    $('.box').hide();
    // API call to get user details
    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: 'https://graph.facebook.com/me?fields=id,name,birthday,picture.type(large),feed{message,story},about,first_name,email,hometown,education,work,friends,cover,gender&access_token=' + myFacebookToken,
        success: (response) => {
            console.log(response);
            
            $(".btn-success").click(function() {
            $("#dataSection").fadeOut(1000);
            $(".newsFeed").fadeIn(1500);
            });

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

    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: 'https://graph.facebook.com/me?fields=id,name,birthday,picture.type(large),feed{message,story},about,first_name,email,hometown,education,work,friends,cover,gender&access_token=' + myFacebookToken,
        success: (response) => {

        $.each(response.feed.data, function(i, info) {
              var j = i + 1;
              if (info.message) {
                  $("#posts").append(`
                  <h4>Post : ${j}</h4>
                  <h6 class="text-muted">Created Time :${info.created_time}</h6>
                  <p>Message : ${info.message} </p>
                  <p><a href="#" class="card-link">Post ID :${info.id}</a></p>
                  <br><hr>
                  `);

              } //end of if
              else {
                  $("#posts").append(`
                  <h4>Post : ${j}</h4>
                  <h6 class="text-muted">Created Time :${info.created_time}</h6>
                  <p>Message : ${info.story} </p>
                  <p><a href="#" class="card-link">Post ID :${info.id}</a></p>
                  <br>
                  <hr>

                  `);
              } //end of else

          }); //end of each
      }, //end of success

      error: (err) => {
            console.log(err.responseJSON.error.message);
            alert(err.responseJSON.error.message)
      }


  }); //end of ajax


} // end of getAllDetails function



















