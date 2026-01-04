/*
   JLC-Telecom
   by Nealiah
   https://nealiah.fr :)
 */

$(function() {
    /**
     * Smooth scrolling to page anchor on click
     **/
    $("a[href*='#'][class='nav-link nav-link-icon me-2']:not([href='#'])").click(function () {
        if (
            location.hostname == this.hostname
            && this.pathname.replace(/^\//, "") == location.pathname.replace(/^\//, "")
        ) {
            var anchor = $(this.hash);
            anchor = anchor.length ? anchor : $("[name=" + this.hash.slice(1) + "]");
            if (anchor.length) {
                $("html, body").animate({scrollTop: anchor.offset().top}, 1000);
            }
        }
    });
})

function addAlert(parent, message, type){
    $(parent).append( $(parent).append(
        '<div class="alert alert-dismissible font-weight-bold text-white animate__animated animate__fadeIn alert-'+type+'">' +
        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"><i class="fas fa-times"></i></button>' + message  +
        '</div>' )
    );
}

function removeAlerts(parent){
    document.getElementById(parent).innerHTML = "";
}

function btnLoad(btn) {
    $(btn).attr("data-original-text", $(btn).html());
    $(btn).prop("disabled", true);
    $(btn).html('<i class="spinner-border spinner-border-sm"></i> Chargement...');
}

function btnAfterLoad(btn) {
    $(btn).prop("disabled", false);
    $(btn).html($(btn).attr("data-original-text"));
}

$(document).ready(function() {
    $("#contactForm").submit(function (event) {
        removeAlerts('contactFormAlertWrapper');
        event.preventDefault();
        var submitBtn = $("button[type=submit]",this);
        btnLoad(submitBtn);
        var formData = {
            identity: $("#nameInput").val(),
            email: $("#mailInput").val(),
            content: $("#messageInput").val(),
            captcha: grecaptcha.getResponse(),
        };
        $.ajax({
            type: "POST",
            url: "/contactAjax",
            data: formData,
            dataType: "json",
            encode: true,
        }).done(function (data) {
            if(!data.success){
                btnAfterLoad(submitBtn);
                addAlert('#contactFormAlertWrapper', data.error, data.level);
            }else{
                btnAfterLoad(submitBtn);
                addAlert('#contactFormAlertWrapper', "Votre message a été envoyé!", 'success');
                $("#contactForm").trigger("reset");
            }
        })
            .fail(function(){
                btnAfterLoad(submitBtn);
                addAlert('#contactFormAlertWrapper', "Une erreur est survenue lors de l'envoi du formulaire", 'danger');
            });

    });
    $("#newsletterForm").submit(function (event) {
        removeAlerts('newsAlertWrapper');
        event.preventDefault();
        var submitBtn = $("button[type=submit]",this);
        btnLoad(submitBtn);
        var formData = {
            email: $("#newsletterInput").val(),
            _csrf: $("#csrfInput").val(),
        };
        $.ajax({
            type: "POST",
            url: "/newsletterAjax",
            data: formData,
            dataType: "json",
            encode: true,
        }).done(function (data) {
            if(!data.success){
                btnAfterLoad(submitBtn);
                addAlert('#newsAlertWrapper', data.error, data.level);
            }else{
                btnAfterLoad(submitBtn);
                addAlert('#newsAlertWrapper', "Vous êtes désormais abonné à la newsletter!", 'success');
                $("#newsletterForm").trigger("reset");
            }
        })
            .fail(function(){
                btnAfterLoad(submitBtn);
                addAlert('#newsAlertWrapper', "Une erreur est survenue lors de l'envoi du formulaire", 'danger');
            });

    });
});


var newsCard = document.getElementsByClassName('news-card');
for (var i = 0; i < newsCard.length; i++) {
    newsCard[i].classList.add('opacity-0');
}

try {
    document.getElementById('aboutus').classList.add('opacity-0');
}catch(e){}

const aboutUsObserver = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
        // If the element is visible
        if (entry.isIntersecting) {
            setTimeout(function(){
                entry.target.classList.add('animate__fadeIn');
            }, 100);
        }
    });
});

document.querySelectorAll('#aboutus').forEach((i) => {
    if (i) {
        aboutUsObserver.observe(i);
    }
});

const newsCardObserver = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
        // If the element is visible
        if (entry.isIntersecting) {
            setTimeout(function(){
                entry.target.classList.add('animate__fadeInUp');
            }, 100);
        }
    });
});
document.querySelectorAll('.news-card').forEach((i) => {
    if (i) {
        newsCardObserver.observe(i);
    }
});

// News cards hover effect
$('.news-card').hover(
    function(){
        $this = $(this).children(".card-img")
        $this.data('transform', $this.css('transform')).css('transform', 'scale(1.25)');
    },
    function(){
        $this = $(this).children(".card-img")
        $this.css('transform', $this.data('transform'));
    }
);


/*
var offers = document.getElementsByClassName('offer');
for (var i = 0; i < offers.length; i++) {
    offers[i].classList.add('opacity-0');
}

const offersObserver = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
        console.log(entry);
        // If the element is visible
        if (entry.isIntersecting) {
            if(entry.target.classList.contains('reverted')){
                setTimeout(function() {
                    entry.target.classList.add('animate__fadeInRight');
                }, 100)
            }else{
                setTimeout(function() {
                    entry.target.classList.add('animate__fadeInLeft');
                }, 100)
            }
        }
    });
});
document.querySelectorAll('.offer').forEach((i) => {
    if (i) {
        offersObserver.observe(i);
    }
});
*/
