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
  var email_id = document.getElementById("login_email").innerHTML;
  var password = document.getElementById("login_password").innerHTML;
  
  var obj={
      email : email_id,
      password : password
      
  }
  
  $.post("https://codefundo2019.tk/login",
  data : JSON.Stringify(obj),
  $.ajax(settings).done(function(data){
     if(data["statusCode"]==200){
        windows.localStorage.setItem("auth_token", data["auth_token"]);
        windows.location.replace("/home");
    }
    else{
        shakeModal();
    }
  }));

}

function signupAjax(){
    
    var email_id = document.getElementById("signup_email").innerHTML;
    var username= document.getElementById("username").innerHTML;
    var password = document.getElementById("signup_password").innerHTML;
    var companyname = document.getElementById("company-name").innerHTML;
    var companyurl = document.getElementById("company-url").innerHTML;
    var password_r = document.getElementById("password_confirmation").innerHTML;
    
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
        $.post("https://codefundo2019.tk/signup",
             data : JSON.Stringify(obj),
             $.ajax(settings).done(function(data){
            if(data["statusCode"]==200){
                windows.localStorage.setItem("auth_token", data["auth_token"]);
                document.getElementById("signup_email").innerHTML = "";
                document.getElementById("signup_password").innerHTML = "";
                document.getElementById("company-url").innerHTML = "";
                document.getElementById("company-name").innerHTML = "";
                document.getElementById("username").innerHTML = "";
                document.getElementById("password_confirmation").innerHTML = "";
                alert("Signup Successful");
            }
            else{
                shakeModal();
            }
        }));
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

   
