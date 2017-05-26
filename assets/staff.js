// Instructors

var stevenT = {
    name: 'Lecturer Steven Traversi',
    img: 'Sp17/StevenTraversi.jpg',
    imgSrc: '../Sp17/StevenTraversi.jpg',
    imgCrazy: '../small/StevenTraversiCrazy.jpg',
    web: 'http://steven.codes',
    bio: 'StevenBio',
    email: 'steven@cs10.org'
};

var yifatA = {
  name: 'Lecturer Yifat Amir',
  img: 'Sp17/YifatAmir.jpg',
  imgSrc: '../Sp17/YifatAmir.jpg',
  imgCrazy: '../small/YifatAmirCrazy.jpg',
  bio: 'YifatBio',
  web: 'https://www.linkedin.com/in/yifat-amir-45633584',
  email: 'yifat@cs10.org'
};

// TAs

var laraM = {
    name: 'Head TA Lara McConnaughey',
    img: 'LaraMcConnaughey.jpg',
    imgSrc: '../Sp17/LaraMcConnaughey.jpg',
    imgCrazy: '../small/LaraMcConnaugheyCrazy.jpg',
    web: 'http://laralinmcc.github.io/',
    bio: 'LaraBio',
    email: 'lara@cs10.org'
};

var jobelV = {
    name: 'TA Jobel Vecino',
    img: 'Fa13/JobelVecino.jpg',
    imgSrc: 'JobelVecino.jpg',
    bio: 'JobelBio',
    email: 'jobel@cs10.org'
};

var angelaW = {
    name: 'TA Angela Wong',
    imgSrc: '../Sp17/las/AngelaWong.jpg',
    img: 'AngelaWong.jpg',
};

// Readers

var bhumikaG = {
    name: 'LA Bhumika Goel',
    imgSrc: '../Sp17/las/BhumikaGoel.jpg',
    img: 'BhumikaGoel.jpg',
};

/*****************************************************************************/
/** LIST DEFINITIONS **/
/*****************************************************************************/

var inst = [ stevenT, yifatA ];
var tas = [laraM, jobelV, angelaW];
var readers = [bhumikaG];
var las = [];

// If you need to add a new SECTION add it to this object.
// Follow the same format.
var all = {
    readers: readers,
    tas: tas,
    inst: inst,
    las: las
};

/*****************************************************************************/
/* DATA POPULATION FUNCTIONS  */
/*****************************************************************************/

// Build a basic object for a person from the current semester.
function baseObj(name, baseDir) {
    var src = name.replace(/ /g , '');
    var baseDir = baseDir || 'Sp14/';
    return { name: name,
             img: baseDir + src + '.jpg',
             imgSrc: src + '.jpg' };
}

function buildPerson(data, width) {
    var imgPathBase, imgPath, cls, elm, crazyPath;
    // Given a JSON object build a div that contains all the person's info
    // width is used to control how many are on a row on the page.
    // Build data objects for very simple cases with nothing special.
    if (data.constructor === String) {
        data = baseObj(data);
    }
    // when developing load images from a submodule, else load from /resources
    var hostName = window.location.hostname;
    if (hostName === 'localhost' || hostName == '127.0.0.1') {
        imgPathBase = '{{ site.baseurl }}'
    } else {
        imgPathBase = '';
    }
    imgPath = imgPathBase + '/resources/images/small/' + data.imgSrc;
    // Date Hacks for fun!
    if (Date().substr(4, 6) == 'Apr 01') {
        imgPath = 'https://www.cs.berkeley.edu/~ddgarcia/i/DanGarciaUCBFaculty2004Eyebrow_320.jpg';
    }
    // Create a div with this person's data, setting a class for width
    // Col-md- is based on standard bootstrap classes, md-20 is my own addition.
    cls = 'col-xs-' + (width === 5 ? '20' : Math.floor(12/width));
    elm = '<div class="'+ cls + '">';
    if (data.img) {
        elm += '<a href="' + imgPathBase + '/resources/images/' + data.img + '">';
    }
    elm += '<img class="staff" align="center" ';
    elm += 'alt=" Staff Photo: ' + data.name + '" title="' + data.name + '" src="';
    elm += imgPath + '"';
    if (data.imgCrazy) {
        crazyPath = imgPath.replace('.jpg', 'Crazy.jpg');
        elm += ' onmouseenter="crazyImage(this, ' + " '" + crazyPath + "'" + ')"';
        elm += ' onmouseleave="normalImage(this,' + " '" + imgPath + "'" + ')"';
    }
    elm += '/>';
    if (data.img) {
        elm += '</a>';
    }
    elm += '<br><strong>';
    if (data.web) {
        elm += '<a href="' + data.web + '" target="_blank">' + data.name + '</a>';
    } else {
        elm += data.name;
    }
    elm += '</strong> ';
    if (data.bio) {
        elm += '(<a href="{{ site.baseurl }}/bios/' + data.bio + '">bio</a>)';
    }
    if (data.email) {
        elm += '<br><a href="mailto:' + data.email +
        '?subject=[CS10] SUBJECT"><code>' + data.email + '</code></a>';
    }
    if (data.office) {
        elm +=  '<br>' + data.office;
    }
    elm += '</div>';
    return elm;
}

function buildGroup(group, w) {
    // Create image elements for all photos in the group (HTML ID)
    // with a WIDTH of w photos per row.
    var ppl = all[group];
    var doc = document.getElementById(group);
    var content = '';
    for (var i = 0; i < ppl.length; i += w) {
        content += '<div class="row staffimgrow">';
        for (var j = i; j < (i + w) && j < ppl.length; j += 1) {
            if (i + w > ppl.length) {
                 w = ppl.length - i;
             }
            content += buildPerson(ppl[j], w);
        }
        content += '</div>';
        content += '<div class="clearfix"></div>';
    }
    doc.innerHTML += content;
}

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    };
  }
}

function crazyImage(image, crazyPath) {
    image.src = crazyPath;
}

function normalImage(image, normalPath) {
    image.src = normalPath;
}

/* more code to run on page load */
// Parameters: a section (HTML 'id') and num of images per row.
buildGroup('inst', 2);
buildGroup('tas', 2);
buildGroup('readers', 2);
buildGroup('las', 5);
