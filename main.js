function init() {
    const bgColorInput = document.getElementById('bgColorInput');
    const generateBtn  = document.getElementById('generateBtn');
    const cover        = document.getElementById('cover');
    const title        = document.getElementById('title');
    const subject      = document.getElementById('subject');

    const preference = loadPreference();

    title.innerHTML    = preference.title;
    subject.innerHTML  = preference.subject;
    bgColorInput.value = preference.color;
    cover.style.backgroundColor  = preference.color;

    bgColorInput.addEventListener('keyup', function() {
        cover.style.backgroundColor = bgColorInput.value;
    });

    generateBtn.addEventListener('click', function() {
        savePreference({
            title: title.innerHTML,
            subject: subject.innerHTML,
            color: bgColorInput.value
        });

        html2canvas(cover, {
            width: 960,
            height: 540,
            scale: 2
        })
        .then(function(canvas) {
            var a = document.createElement('a');
            a.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
            a.download = 'cover.jpg';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    })
}

function savePreference(preference) {
    localStorage.setItem('preference', JSON.stringify(preference));
}

function loadPreference() {
    const defaultPreference = {
        'title' : 'Title Video',
        'subject' : 'Subject Video',
        'color' : '#808080',
    };

    const preference = localStorage.getItem('preference');

    if(preference) {
        return JSON.parse(preference);
    }

    return defaultPreference;
}

init();