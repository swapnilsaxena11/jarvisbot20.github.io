function showRegisterForm(){
    $('.loginBox').fadeOut('fast',function(){
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast',function(){
            $('.register-footer').fadeIn('fast');
        });
        $('.modal-title').html('Register with');
    }); 
    $('.error').removeClass('alert alert-danger').html('');
       
}
function showLoginForm(){
    $('#loginModal .registerBox').fadeOut('fast',function(){
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast',function(){
            $('.login-footer').fadeIn('fast');    
        });
        
        $('.modal-title').html('Login with');
    });       
     $('.error').removeClass('alert alert-danger').html(''); 
}

function openLoginModal(){
    showLoginForm();
    setTimeout(function(){
        $('#loginModal').modal('show');    
    }, 230);
}

function openRegisterModal(){
    showRegisterForm();
    setTimeout(function(){
        $('#loginModal').modal('show');    
    }, 230);  
}

function loginAjax(){
  var email_id = $("#login_email").val();
  var password = $("#login_password").val();
  
  var obj={"email": email_id, "password": password}
  var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://codefundo2019.tk/login",
        "method": "POST",
        "processData": false,
        "headers": {
            "content-type": "application/json"
        },
        "data" : JSON.stringify(obj)
  }
    
  $.ajax(settings).done(function(data){
     if(data["statusCode"]==200){
        window.localStorage.setItem("auth_token", data["auth_token"]);
        window.location.replace("/integrations.html");
    }
    else{
        shakeModal();
    }
  });

}

function signupAjax(){
    
    var email_id = $("#signup_email").val();
    var username= $("#username").val();
    var password = $("#signup_password").val();
    var companyname = $("#company-name").val();
    var companyurl = $("#company-url").val();
    var password_r = $("#password_confirmation").val();
    
    if(password.localeCompare(password_r)!=0){
        shakeModal();
    }
    else{
        var obj={
            email : email_id,
            username : username,
            company_name : companyname,
            company_url : companyurl,
            password : password
        };
        var settings={
            "async": true,
            "crossDomain": true,
            "url": "https://codefundo2019.tk/signup",
            "method": "POST",
            "processData": false,
            "headers": {
            "content-type": "application/json"
            },
            "data" : JSON.stringify(obj)
        };
        $.ajax(settings).done(function(data){
            if(data["statusCode"]==200){
                $("#signup_email").val("");
                $("#signup_pasword").val("");
                $("#username").val("");
                $("#company-name").val("");
                $("company-url").val("");
                $("#password_confirmation").val("");
                alert("Signup Successful");
                windows.localStorage.setItem("auth_token", data["auth_token"]);
            }
            else{
                shakeModal();
            }
        });
    }
}

function shakeModal(){
    $('#loginModal .modal-dialog').addClass('shake');
             $('.error').addClass('alert alert-danger').html("Invalid email/password combination");
             $('input[type="password"]').val('');
             setTimeout( function(){ 
                $('#loginModal .modal-dialog').removeClass('shake'); 
    }, 1000 ); 
}

   
