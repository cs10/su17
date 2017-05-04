// Concatenation of all CS10 JS Files.

// Maps days since **saturday** to the appropriate cell numbers
// Its value is the cell numbers to deal with.
// The file dynamically calculates days for the semester and doesn't read
// dates from specific cells.
var since = [
    [2],       // 0 days -- Sun: readings
    [3, 4],    // 1 day  -- Mon: lec lab 1
    [4],       // 2 days -- Tues: lab 1
    [5],       // 3 days -- Wed: lab 1, lec2, lab 2
    [6],       // 4 days -- thurs: lab 2
    [6, 7],    // 5 days -- fri: lab 2, disc, hw
    [2],       // 6 days -- Sat: readings
];

var STYLE  = "8px solid Gold";
var MS_DAY = 1000*60*60*24;

// Function used to highlight the current day.
// TODO: Fix this stuff to be a moment obj.
function updateCalendar(startDate, date) {
    console.log('CALLED');
    // The SATURDAY before the first week of the calendar.
    var start = startDate || new Date(),
        today = date || new Date(),
        highlight = since[ today.getDay() ],
        weeks = Math.floor(((today - start) / MS_DAY) / 7); // Weeks SINCE start
    // if (highlight[0] === 2) {
    //     weeks += 1; // really shitty hack for weekends....
    // }
    var c, i, j, // holy shit that's terrible. FIXME.
        rows = document.querySelectorAll("tbody > tr.cal"),
        temp = rows[weeks],
        cells;
    // Date is out of range of calendar
    if (typeof temp === 'undefined') {
        console.log('DATE OUT OF RANGE');
        return;
    }
    cells = temp.cells;
    if (today.getDay() === 3) { // HIGHLIGHT LAB ON WEDS BASED ON TIME OF DAY
        var n = (today.getHours() < 12) ? 4 : 6;
        highlight.push(n);
    }
    // Hack for weeks like spring break, deadweek
    // Not a robust hack, but it should work OK.
    c = (cells.length == 5) ? 3 : highlight[0];
    cells[c].style.border = STYLE;
    if (c === 2 & weeks >= 2) { // HW, in the row before
        // CANT USE 8 BECAUSE ALL WEEKS ARENT THE SAME DARNIT.
        prev = rows[weeks].cells;
        rows[weeks].cells[prev.length - 1].style.border = STYLE;
    }
    if (highlight[1] && cells.length > highlight[1]) {
        cells[highlight[1]].style.border = STYLE;
    }
    // Grey out cells that have past
    for(i = 0; i < rows.length; i += 1) {
        cells = rows[i].cells;
        for(j = 2; j < cells.length; j += 1) {
            if (cells[j].style.border) { return; }
            cells[j].style.background = "#BBB";
            // Go 1 level deep to change the background on inner divs.
            // FIXME: Banish the jQuery? or make this recursive... or
            // not because I would ever need it? But it might be fun...
            if (typeof $ !== 'undefined') {
                if ($(cells[j]).has('div')) {
                    $(cells[j]).children().css('background', '#BBB');
                }
            }
        }
    }
}

function displaySpeech(img_name, img_src) {
    document[img_name].src = img_src;
}



var cs10 = cs10 || {};

// Sunday at the start of the semester
cs10.startDate = '2017-01-15';
cs10.endDate   = '2017-05-13';
cs10.bCoursesID = '1458271';
cs10.NUM_WEEKS_TO_RENDER = 17;

cs10.gradingScheme = {
    'A+': 485,
    'A' : 470,
    'A-': 450,
    'B+': 445,
    'B' : 420,
    'B-': 400,
    'C+': 385,
    'C' : 370,
    'C-': 350,
    'D' : 300,
    'F' : 299
};

function bcourses(id) {
    var base = 'https://bcourses.berkeley.edu/courses/';
    var reading = '/files/folder/Readings?preview='
    return base + cs10.bCoursesID + reading + id;
}

// ==================================================
// ==========     OBJECT CREATION          ==========
// ==================================================
// Return the week of the course in range [1, 17] else -1
function getWeekOfDate(date) {
    var now = new Date();
    var from = date;
    if (typeof from === 'string') {
        from = new Date(date);
    }
    var dist = from - now;
    if (dist < 0) {
        return -1;
    }
    var weeks = Math.floor(dist / (MS_DAY * 7));
    return weeks <= 17 ? weeks : -1;
}

cs10.newLabObject = function(title, url, rq, video) {
    var baseURL = 'http://beautyjoy.github.io/bjc-r/topic/topic.html?topic=';
    var urlEnd  = '&novideo&noreading&noassignment&course=cs10_sp17.html';
    var lab = { type: 'Lab' };
    lab.title = title;
    // Global Counter for lecture
    cs10.rqCounter = cs10.rqCounter || 0;
    cs10.labCounter = cs10.labCounter || 0;
    if (!title) {
        lab.title = 'No Lab';
    }
    if (url) {
        cs10.labCounter += 1;
        lab.title = cs10.labCounter + ': ' + lab.title;
        lab.url = baseURL + url + urlEnd;
    }
    if (rq) {
        cs10.rqCounter += 1;
        rq = cs10.rqCounter;
    }
    if (title.indexOf('Project Work') !== -1 || title.indexOf('Work Session') !== -1) {
        lab.classes = 'project';
    }
    if (title.indexOf('No Lab') !== -1 || title.indexOf('No Class') !== -1) {
        lab.classes = 'noClass';
    }
    lab.RQ = rq;
    lab.video = video;
    return lab;
};

cs10.newReadingsObject = function(title, url, classes) {
    var reading = {
        type: 'Reading',
        title: title,
        url: url
    };
    if (!classes) {
        classes = 'required'; // Default option
    }
    reading.classes = 'reading ' + classes;
    return reading;
};

cs10.newLectureObject = function(title, path, presenter, video) {
    var lect = { type: 'Lecture' };
    lect.title = title;
    if (!title) {
        lect.title = 'No Lecture';
        return lect;
    }
    if (title.indexOf('No Lecture') !== -1 || title.indexOf('No Class') !== -1) {
        lect.classes = 'noClass';
    }
    lect.url = path;
    lect.guest = presenter;
    lect.video = video;
    return lect;
};

cs10.newDiscussionObject = function(title, files) {
    var disc = { type: 'Discussion' };
    disc.title = title;
    if (!title) {
        disc.title = 'No Discussion';
    }
    if (title.indexOf('No Discussion') !== -1 || title.indexOf('No Class') !== -1) {
        disc.classes = 'noClass';
    }
    // Global Counter for discussions
    cs10.discussionCounter = cs10.discussionCounter || 0;
    cs10.discussionCounter += 1;
    if (files) {
        var count = cs10.discussionCounter;
        disc.url = 'discussion/' + (count < 10 ? '0' : '') + count + '/';
    }
    return disc;
};

cs10.newHomeworkObject = function(title, due, submission, spec) {
    var obj = {
        type: 'Homework',
        urls: []
    };
    // TODO: Consider refactoring this....
    if (!title) {
        obj.title = 'No Homework!<br />But you might want to check next week\'s';
        return obj;
    }
    obj.title = title;
    if (due) {
        obj.classes = 'due';
        obj.due = due;
    }
    if (spec) {
        obj.urls.push({
            title: "Spec",
            url: spec
        });
    }
    if (submission) {
        // Allow multiple submissions per assignment
        // but keep shorthand for a common single URL
        if (submission.constructor !== Array) {
            submission = [ {
                title: "Submit",
                url: submission
            } ];
        }
        submission.forEach(function(subm) {
            obj.urls.push({
                title: subm.title || "LINK -- FIXME",
                url: 'https://bcourses.berkeley.edu/courses/' + cs10.bCoursesID +
              '/' + subm.url
            });
        });
    }
    return obj;
};

// ==================================================
// ==========     RENDERING CODE           ==========
// ==================================================
// REQUIRES MOMENTJS

cs10.getWeekStartDate = function(week) {
    var start = moment(cs10.startDate);
    return start.add((week - 1) * 7 + 1, 'd');
}

cs10.renderTableCalendar = function() {
    var result = $('<tbody>');
    var table = $('.calendar.table');
    if (table.length === 0) { return; }
    for(var i = 1; i <= cs10.NUM_WEEKS_TO_RENDER; i += 1) {
        result.append(cs10.renderTableRow(i, cs10['week' + i]));
    }
    table.append(result);
};

cs10.weeklyFormat = [
    'readings', // Readings
    'lect1',    // Mon Lecture
    'lab1',     // 1st Lab
    'lect2',    // Wed Lecture
    'lab2',     // 2nd Lab
    'disc',     // Discussion
    'hw'        // Assignments
];

cs10.renderTableRow = function(week, data) {
    var row = $('<tr>').addClass('cal');
    // TODO: Special Case For data.special
    // TODO: Handle Exams (data.exams)
    row.append($('<td>').html(week))                        // Week Number
          .append($('<td>').html(cs10.getDateString(week))) // Dates
    cs10.weeklyFormat.forEach(function (key) {
        row.append(cs10.renderCell(key, data[key]));
    });
    return row;
};

/*
    Given a cellType, and some data, find renderFunction for that type
    and call it with data.
    Note that this handles calling the function based on a somewhat arbitrary
    naming scheme.
*/
cs10.renderCell = function(cellType, data) {
    var renders,
        functionName = ('renderTable' + cellType).toLowerCase(),
        functionNoNum = functionName.slice(0, -1);
    // Slice of the last character which may be a number like lab1 or lect2
    // This allows multiple of the same type of item in a week.
    // TODO: Use indexOf or key.match(/functionName|functionNoNum/i) ?
    var render = Object.getOwnPropertyNames(cs10).filter(function(x) {
        var key = x.toLowerCase();
        console.log(cellType, x);
        console.log(functionName, key.indexOf(functionName),
                    functionNoNum, key.indexOf(functionNoNum));
        return  key.indexOf(functionName) === 0 || key.indexOf(functionNoNum) === 0;
    });
    console.log(render);
    if (render.length > 0) {
        return cs10[render[0]](data);
    }
    console.log('TRIED TO RENDER %s BUT COULDNT', cellType);
    return data;
}

cs10.getDateString = function(week) {
    var start = cs10.getWeekStartDate(week);
    var end   = moment(start).add(4, 'd');
    return (start.month() + 1) + '-' + start.date() + ' to ' +
            (end.month() + 1) + '-' + end.date();
};

cs10.renderTableReading = function(readings) {
    var result = $('<td>');
    if (!readings) {
        result.append('No Reading');
    } else if (typeof readings === 'string') {
        result.append(readings);
    } else {
        for (var i = 0; i < readings.length; i += 1) {
            var rd = readings[i];
            var a = $('<a>').html(rd.title).attr(
                {'class': rd.classes, 'href': rd.url, 'target': '_blank'} );
            result.append(a);
            result.append('<br>');
        }
    }
    return result;
};

cs10.renderTableLecture = function(lect) {
    var result = $('<td>');
    if (!lect) {
        result.append('No Lecture');
        result.attr({'class': 'noClass'});
    } else if (typeof lect === 'string') {
        result.append(lect);
    } else {
        if (lect.guest) {
            result.append($('<strong>').html('Guest Lecturer: ' + lect.guest));
            result.append($('<br>'));
        }
        var title = lect.title;
        if (lect.url) {
            title = $('<a>').attr({href: lect.url}).html(lect.title);
        }
        result.append(title);
        result.append('<br>');
        if (lect.video) {
            result.append(
                $('<a>').attr({href: lect.video}).html('(Video)')
            )
        }
        result.attr({ 'class' : lect.classes });
    }
    return result;
};

cs10.renderTableLab = function(lab) {
    var result = $('<td>');
    if (!lab) {
        result.append('No Lab');
        result.attr({'class': 'noClass'});
    } else if (typeof lab === 'string') {
        result.append(lab);
    } else {
        var tag = lab.url ? '<a>' : '<span>';
        var title = $(tag).html(lab.title).attr({
            'href': lab.url, 'target': '_blank'});
        result.append(title);
        result.append('<br>');
        if (lab.RQ) {
            result.append($('<br>'));
            result.append($('<strong>').html('Reading Quiz ' + lab.RQ +' (in lab)'));
        }
        result.attr({ 'class' : lab.classes });
        if (lab.video) {
            result.append($('<br>'));
            result.append($('<a>').html('(Video Review)').attr({
                'href' : lab.video, 'target' : '_blank' }));
        }
    }
    return result;
};

cs10.renderTableDiscussion = function(disc) {
    var result = $('<td>');
    if (!disc) {
        result.append('No Discussion');
        result.attr({'class': 'noClass'});
    } else if (typeof disc === 'string') {
        result.append(disc);
    } else {
        result.append(disc.title);
        result.append('<br>');
        result.attr({ 'class' : disc.classes });
        if (disc.url) {
            var url = $('<a>').html('Resources').attr({'href' : disc.url});
            result.append($('<br>'));
            result.append($('<strong>').html('(' + url[0].outerHTML + ')'));
        }
    }
    return result;
};

cs10.renderTableHW = function(hw) {
    var result = $('<td>');
    if (!hw) {
        hw = [cs10.newHomeworkObject('No Homework')];
    } else if (typeof hw === 'string') {
        hw = [cs10.newHomeworkObject(hw)];
    } else if (!(hw instanceof Array)) { // HW is a list.
        hw = [ hw ];
    }
    for (var i = 0; i < hw.length; i += 1) {
        var assn = hw[i];
            result.append(assn.title);
            result.append('<br>');
            result.attr({ 'class' : assn.classes });
        var j = 0, links = assn.urls.length, item;
        for (; j < links; j += 1) {
            item = assn.urls[j];
            result.append($('<a>').html(item.title).attr({
                href: item.url,
                target: '_blank'
            }));
            if (j + 1 < links) {
                result.append(' | ');
            }
        }
        if (assn.url) {
            result.append($('<a>').html('Submit').attr({
                'href' : assn.url, }));
        }
        if (assn.due) {
            result.append('<br>');
            result.append($('<i>').html('due ' + assn.due + ' at 11:59pm'));
        }
        if (i + 1 < hw.length) {
            result.append('<hr>');
        }
    }
    return result;
};


/* Shortcuts for creating schedule objects
 * Parameters:
 * Reading: (title, link, 'type [required is default]')
 * Lecture: (title, '[slides folder]', '[video URL]', '[Guest Name]')
 * lab1:     (title, 'topic file path', [boolean -- Reading Quiz?], 'video link')
 * disc:    (title, [boolean -- Resources available?])
 * HW:      (title, due, submission, spec)
 * NOTE: These links are currently relative to the home page.
 */
var lab      = cs10.newLabObject,
    work     = lab, // shortcut for work sessions.
    reading  = cs10.newReadingsObject,
    lect     = cs10.newLectureObject,
    disc     = cs10.newDiscussionObject,
    hw       = cs10.newHomeworkObject,
    startDate = new Date('01/14/2017'); // The SATURDAY before the first week of the calendar.

function docs(id) {
    return 'assign.html?//docs.google.com/document/d/' + id + '/pub';
}

function lectureURL(googId) {
   return 'https://docs.google.com/a/berkeley.edu/presentation/d/' +
           googId +  '/edit?usp=sharing';
}

// CONSTANTS:
var hw1Spec         = docs('1ybuatsrUMCI-tHHRPwxUpGoZoGxk_SEiGEArocQtIlI')
    hw2Spec         = docs('1X4Oq4aZSsNBl-f5xEwWAkNxUo7-ktAWFKRyEr9fHDUQ')
    hw3Spec         = docs('1fWla-mB4obzo_OPffCbWjZ1GXYNv7TVtrowxbtCk-PU')
    mtProjSpec      = docs('1l6YE0KC-fJbe9ZG2zMnvYGUijJgZq0X_ovhpgjt-l6c')
    exploreSpec     = docs('1PBNq7SMU4KUHRMFvJIy1HBZP-3r6ThjvFwrOJ800RhU')
    finalProjSpec   = docs('1dJdqxrLtC6q5kSXazyhxoOUM0ERc1kkGiPAGH60ajtw')
    hw0             = hw('HW0', '1/21', 'quizzes/2266425')
    hw1             = hw('HW1: Word Guessing', '2/1', 'assignments/7768716', hw1Spec)
    hw2             = hw('HW2: Encryptify', '2/17', 'assignments/7768717', hw2Spec)
    hw3             = hw('HW3: 2048','3/3', 'assignments/7768718', hw3Spec)
    mProposal       = hw('Midterm Project Proposals', '3/5', 'assignments/7768721', mtProjSpec)
    mProject        = hw('Midterm Project', '3/15', 'assignments/7768719', mtProjSpec)
    explorePost     = hw('"Explore" Writing Assignment', '4/7', '/discussion_topics/5125383', exploreSpec)
    explorePostDoc  = hw('"Explore" Writing Assignment Document Submission', '4/7', '/assignments/7768712')
    exploreComments = hw('"Explore" Comments', '4/12', '/discussion_topics/5125383')
    fProposal       = hw('Final Project Proposal', '4/11', 'assignments/7768715', finalProjSpec) 
    fMilestone      = hw('Final Project Milestone', '4/21', 'assignments/7768714')
    fProject        = hw('Final Project', '4/28', 'assignments/7768713', finalProjSpec)

// ==================================================
// ==========     SCHEDULE ITEMS           ==========
// ==================================================

// JAN 16 - 20
cs10.week1 = {
    readings: 'No Readings',
    lect1: lect('No Lecture Monday - Enjoy MLK day!'),
    lab1: lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_pair/1-introduction.topic"),
    lect2: lect('Welcome and Abstraction',
        'https://drive.google.com/drive/u/1/folders/0B4KuCtIkhB7QNS1FTmhPWjY4b1E'
    ),
    lab2: lab('Build Your Own Blocks', 'berkeley_bjc/intro_pair/2-loops-variables.topic'),
    disc: disc('Welcome to CS10!'),
    hw: hw0
};

// JAN 23 - 27
cs10.week2 = {
    readings: [
        reading('Prof. Harvey\'s Intro to Abstraction',
                docs('1PZJ_LYYWRYu12cTbBKF9IyY4BqEG-BibgisBoQn9BpY')),
        reading('Learning to Code!', 'http://www.youtube.com/watch?v=dU1xS07N-FA'),
        reading('Is Abstraction the Key to Computing?',
                bcourses('59744797'),
                'optional'),
        reading('Scratch: Programming for All',
                bcourses('59744796'),
                'optional')
    ],
    lect1: lect('Building Blocks',
            'https://drive.google.com/drive/u/1/folders/0B4KuCtIkhB7QS21oamFTYmN5aWM'
    ),
    lab1: lab('Conditionals and Reporters', 'berkeley_bjc/intro_pair/3-conditionals.topic', true),
    lect2: lect('Numbers and Abstraction',
            'https://drive.google.com/drive/u/1/folders/0B4KuCtIkhB7QeGNQakQxN3FmMnc'
    ),
    lab2: lab('Functions', 'berkeley_bjc/intro_pair/4-abstraction-testing.topic'),
    disc: disc('Anatomy of a Computer and the Power of Binary', true),
    hw: hw1
};

// JAN 30 - FEB 3
cs10.week3 = {
    readings: [
        //reading('The Story of Alan Turing &amp; His Machine',
                //'https://youtu.be/CQhrMmbiaM0'),
        reading('BtB Chapter 1',
                '/sp17/resources/readings/btb/chapter1.pdf')
    ],
    lect1: lect('Lists and Scoping',
            'https://drive.google.com/drive/u/1/folders/0B4KuCtIkhB7QTTE3TjVfY0xIMG8'
    ),
    lab1: lab('Lists I', 'berkeley_bjc/lists/lists-I.topic', true),
    lect2: lect('Algorithms',
            'https://drive.google.com/drive/folders/0B4KuCtIkhB7QNXJoT0RKSEc3N2M'
    ),
    lab2: lab('Algorithms', 'berkeley_bjc/areas/algorithms.topic'),
    disc: disc('All about lists'),//, true),
    hw: hw1
};
// cs10.week3.lect3.classes = 'exam';
// cs10.week3.work.title += '<hr><strong>Finch Robots Lab (Sect 111)</strong>';

// FEB 6 - 10
cs10.week4 = {
    readings: [
        reading('What is an Algorithm (book excerpts)?',
                bcourses('60735934')),
       reading('How Algorithms Shape Our World',
                'http://www.ted.com/talks/kevin_slavin_how_algorithms_shape_our_world.html'),
        reading('Algorithms Are Great and All...',
                'http://www.wired.com/2014/11/algorithms-great-can-also-ruin-lives/'),
        reading('Comments on "Algorithms Are Great and All..."',
                'https://news.ycombinator.com/item?id=8630311'),
        reading('The 10 Algorithms That Dominate Our World',
                'http://io9.com/the-10-algorithms-that-dominate-our-world-1580110464',
                'optional'),
        reading('The real 10 algorithms that dominate our world',
                'https://medium.com/@_marcos_otero/the-real-10-algorithms-that-dominate-our-world-e95fa9f16c04',
                'optional')
    ],
    lect1: lect('Algorithmic Complexity',
            'https://drive.google.com/drive/folders/0B4KuCtIkhB7QZU1VbTlMLWVhNVE'
    ),
    lab1: lab('Algorithmic Complexity', 'berkeley_bjc/areas/algorithm-complexity.topic', true),
    lect2: lect('Mutability',
            'https://drive.google.com/drive/folders/0B4KuCtIkhB7QM3JMOHlSY3E4YVE'
    ),
    lab2: lab('HW2 Work Session'),
    disc: disc('Quest Review'),
    hw: hw2
};

// FEB 13 - 17
cs10.week5 = {
    readings: 'No Readings for this Week - Study for the Quest!',
    lect1: lect('Quest<br>Mon 2/13<br>In Class<br>Evans 10'),
    lab1: lab('HW2 Work Session', null),
    lect2: lect('Programming Paradigms',
            'https://drive.google.com/drive/folders/0B7pxUEY76zATb1ZMRDFXN25oLVU?usp=sharing'),
    lab2: lab('Finch Lab', 'berkeley_bjc/robots/robots.topic'),
    disc: disc('Quest Debrief and HW3 Introduction'),
    hw: hw2
};

cs10.week5.lect1.classes = 'exam';

// FEB 20 - 24
cs10.week6 = {
    readings: [
        reading('Test Driven Development',
                                'https://www.codeenigma.com/community/blog/introduction-test-driven-development'),
        reading('BtB Chapter 2, pg. 19-29, 36-42',
                'http://www.bitsbook.com/wp-content/uploads/2008/12/chapter2.pdf'),
        //reading('BtB Chapter 5',
        //'http://www.bitsbook.com/wp-content/uploads/2008/12/chapter5.pdf'),
        //reading('Alan Kay: Doing with Images Makes Symbols - 4:04 to 9:20',
            //'https://archive.org/details/AlanKeyD1987')
    ],
    lect1: lect('No Lecture Monday - Enjoy your holiday!'),
    lab1: lab('Testing, HW3', 'berkeley_bjc/2048-testing/2048.topic', true),
    lect2: lect('Recursion I', 'https://drive.google.com/drive/u/1/folders/0B4KuCtIkhB7QTklZQkNYS0NtTlk'),
    lab2: lab('Trees and Fractals Using Recursion', 'berkeley_bjc/recur/recursion-trees-fractals.topic'),
    disc: disc('Recursion'),
    hw: hw3
};

// FEB 27 - MAR 3
cs10.week7 = {
    readings: [
        reading('Present Shock -- When Everything Happened Now', 'https://www.youtube.com/watch?v=_z2oFCR-0pc&feature=youtu.be'),
        reading('BtB Chapter 6','http://www.bitsbook.com/wp-content/uploads/2008/12/chapter6.pdf'),
    ],
    lect1: lect('Recursion II', 'https://drive.google.com/drive/u/1/folders/0B4KuCtIkhB7QWHY3Q0owczNaR3c'),
    lect2: lect('Social Implications of Computing I', 'https://drive.google.com/drive/u/1/folders/0B4KuCtIkhB7QVWxuQzlMcHJKVlk'),
    lab1: lab('Recursive Reporters', 'berkeley_bjc/recur/recursive-reporters-part1.topic', true),
    lab2: lab('Tic-Tac-Toe, Boards', 'berkeley_bjc/lists/tic-tac-toe.topic'),
    disc: disc('Recursion and Social Implications'),
    hw: [hw3, mProposal]
};

// MAR 6 - 10
cs10.week8 = {
    readings: [
        reading('Rest of BtB chapter 2',
                'http://www.bitsbook.com/wp-content/uploads/2008/12/chapter2.pdf'),
    ],
    lect1: lect('Procedures as Data - Higher Order Procedures',
            'https://drive.google.com/drive/u/1/folders/0B4KuCtIkhB7QMGJwdUxXd05GODA'),
    lab1: lab('Midterm Project Work Session', null, true),
    //lect2: lect('Social Implications of Computing II'),
    lect2: lect('Privacy', 'https://drive.google.com/drive/u/1/folders/0B4KuCtIkhB7QX2xjOV8xTnd3cmc', "Gerald Friedland"),
    lab2: lab('Functions as Data and HOFs', 'berkeley_bjc/hofs/hofs-practice.topic'),
    disc: disc('Social Implications and HOFs'),
    hw: mProject
};

// MAR 13 - 17
cs10.week9 = {
    readings: [
        reading('Humans Need Not Apply - Video',
                'https://www.youtube.com/watch?v=7Pq-S557XQU'),
        reading('The End of Moore\'s Law',
                'http://www.nytimes.com/2015/09/27/technology/smaller-faster-cheaper-over-the-future-of-computer-chips.html?_r=0'),
        reading('As We May Think',
                'http://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/', 'optional')
    ],
    disc: disc('Midterm Prep'),
    lab1: lab('Midterm Project Work Session', null, true),
    lab2: lab('Concurrency', 'berkeley_bjc/areas/concurrency.topic'),
    /* AI */
    lect1: lect('Artificial Intelligence', 'https://drive.google.com/drive/u/1/folders/0B4KuCtIkhB7QNFVHVUdfbXYzcWM', "Pat Virtue"),
    //lect1: lect('Social Implications of Computing III'),
    lect2: lect('Concurrency', 'https://drive.google.com/drive/folders/0B4KuCtIkhB7QUlpxdXR4MXV2cWM'),
    hw: mProject
};


// MAR 20 - 24
cs10.week10 = {
    readings: 'No Readings for this Week - Study for the Midterm!',
    disc: disc('Midterm Debrief'),
    lect1: lect('<br><br><div class="exam inner">Midterm Exam Part I</a><br><br>Monday 3/20<br>Evans 10</div>'
    ),
    lect2: lect('<br><br><div class="exam inner">Midterm Exam Part II</a><br><br>Wednesday 3/22<br>Evans 10</div>'
    ),
    lab1: lab('Online <span class="snap">snap</span> Midterm'),
    lab2: lab('Recursion with HOFs', 'berkeley_bjc/hofs/hofs-with-recursion.topic'),
    hw: 'Start Thinking about Explore Post'
};

 cs10.week10.lect1.classes = 'exam';
 cs10.week10.lect2.classes = 'exam';

// MAR 27 - 31
cs10.week11 = {
    special: 'Spring Break -- No Class',
    readings: 'No Reading.',
    hw: hw('Have fun!')
};

// cs10.week11 = {
//     readings: [
//         reading('TED: What is the Internet?',
//                 'https://www.ted.com/talks/andrew_blum_what_is_the_internet_really?language=en'),
//         reading(
//             'BtB pg. 295-304, 309',
//             'https://drive.google.com/file/d/0B3vESj3HTRTkbVo1dTV5SUp4T0U/view?usp=sharing'),
//         reading(
//             'What is the Internet?',
//             'https://www.youtube.com/watch?v=UlJku_CSyNg',
//             'optional'),
//         reading(
//             'BtB pg. 305-316',
//             'https://drive.google.com/file/d/0B3vESj3HTRTkbVo1dTV5SUp4T0U/view?usp=sharing',
//             'optional'
//         )
//     ],
//     disc: disc('Midterm Review', true),
//     lect1: lect('Procedures as Data - Higher Order Procedures', 'https://drive.google.com/drive/folders/0B7pxUEY76zATZ1JSUFZpYlQ5eFE?usp=sharing'
//             //lectureURL('12n7JQXQCJHBt7SjKjGGkVNP5iyhAngOLMVeMpg40D8I')
//             //lectureURL('1TwO63UECd9I4ufKDYUj9LDFT6RrDOtFQlbbcC9oBebE')
//     ),
//     lect2: lect('Python I', 'https://drive.google.com/drive/folders/0B7pxUEY76zATckZVaUlZblY4aW8?usp=sharing'
//             //lectureURL('1kZ2LwxKUTJLyo5GlLUdX72S9xT_9YqblN5WLD8y8Gg0')
//             //lectureURL('1Ouz8QdPT-L0x3lg77S2yBGbsqjmuKJLAG3SjxtD7zLQ')
//     ),
//     //lab1: lab('The Internet', 'berkeley_bjc/areas/internet.topic', true),
//     lab1: lab('Functions as Data and HOFs', 'berkeley_bjc/hofs/hofs-practice.topic', true),
//     lab2: lab('Besides Blocks: Welcome to Python', 'berkeley_bjc/python/besides-blocks-welcome.topic'),
//     hw: 'No homework - Study for the Midterm Exam!'
// };

// APR 3 - 7
cs10.week12 = {
    readings: [
        reading(
            'Why Python is a Great First Language',
            'http://blog.trinket.io/why-python/'),
        reading(
            'The GNU Manifesto Turns Thirty',
            'http://www.newyorker.com/business/currency/the-gnu-manifesto-turns-thirty',
            'optional'),
        reading(
            'Python vs. COBOL (parody)',
            'https://medium.com/@oceankidbilly/python-vs-r-vs-cobol-which-is-best-for-data-science-7b2979c6a000',
            'optional')
    ],
    disc: disc('Python'),
    lect1: lect('Python I', 'https://drive.google.com/drive/folders/0B4KuCtIkhB7QbmFTWlhEa25IZHc?usp=sharing'),
    lect2: lect('Python II', 'https://drive.google.com/drive/folders/0B4KuCtIkhB7QRnFnY0VKNmMyY3M?usp=sharing'),
    lab1: lab('Besides Blocks: Welcome to Python', 'berkeley_bjc/python/besides-blocks-welcome.topic'),
    lab2: lab('Besides Blocks: Data Structures in Python', 'berkeley_bjc/python/besides-blocks-data-struct.topic', true),
    hw: [explorePost, explorePostDoc]
};

// APR 10 - 14
cs10.week13 = {
    readings: [
        reading('Addicted to Apps', 'http://www.nytimes.com/2013/08/25/sunday-review/addicted-to-apps.html?_r=0'),
        reading('CS8 lecture 1', 'https://www.youtube.com/watch?v=69hHbVza7XI&t=27m49s', 'optional')
    ],
    lect1: lect('Saving the World with Computing', "https://drive.google.com/drive/u/1/folders/0B4KuCtIkhB7QcUVuaDF1MHhoZFE", "Kathy Yelick"),
    lect2: lect('Human Computer Interface', 'https://drive.google.com/drive/u/1/folders/0B4KuCtIkhB7QRUxnRGdfdFV0UUk', "Bjoern Hartmann"),
    lab1: lab('Besides Blocks: Text Processing in Python', 'berkeley_bjc/python/besides-blocks-text-processing.topic'),
    lab2: lab('Project Work Session', null, true), //, 'berkeley_bjc/python/besides-blocks-data.topic'),
    disc: disc('TBD'),
    hw: [exploreComments, fProposal]
};


// APR 17 - 21
cs10.week14 = {
    readings: [
        reading('A World Without Work', 'http://www.theatlantic.com/magazine/archive/2015/07/world-without-work/395294/'),
        reading('Gladwell vs. Shirky: A Year Later, Scoring the Debate Over Social-Media Revolutions', 'http://www.wired.com/2011/12/gladwell-vs-shirky/'),
        reading('P vs. NP and the Computational Complexity Zoo - Video', ' https://youtu.be/YX40hbAHx3s', 'optional')
    ],
    lab1: lab('Final Project Work Session', null, true),
    lab2: lab('The Internet', 'berkeley_bjc/areas/internet.topic'),
    lect1: lect('Limits of Computing', 'https://drive.google.com/drive/u/1/folders/0B4KuCtIkhB7Qa0Q3eEpaaVA2c3c'),
    lect2: lect('The Internet', "https://drive.google.com/drive/u/1/folders/0B4KuCtIkhB7QYlU0N1pweUQ1akk", "Steven Traversi, and Yifat Amir"),
    disc: disc('The Internet'),
    hw: fMilestone
};

// APR 24 - 28
cs10.week15 = {
    readings: [
        reading('A Quantum Leap in Computing?', 'http://www.newyorker.com/tech/elements/a-quantum-leap-in-computing', 'optional')
    ],
    disc: disc('Farewell! Recap and Feedback'),
    lab1: lab('Project Work Session', null),
    lect1: lect('Alumni Panel'),
    lect2: lect('Conclusion'),
    lab2: lab('In-Lab Final Exam'),
    hw: fProject
};

// DEAD WEEK
// MAY 1 - 5
cs10.week16 = {
    special: 'RRR Week -- No Class',
    readings: 'No Reading.',
    hw: 'Study for the Final'
};

// MAY 8 - 12
cs10.week17 = {
    readings: 'No Reading.',
    lab1: lab('<br><br><div class="exam inner">Final Exam<br><br>Tuesday 5/9<br> 8:00am - 11:00am <br>10 Evans</div>'),
    hw: 'Enjoy your Summer Break!'
};
cs10.week17.lab1.classes = 'exam';


// Load the Calendar
$(document).ready(function() {
    cs10.renderTableCalendar();
    updateCalendar(startDate);
});


// Instructors

var DanGarcia = {
    name: 'Teaching Professor Dan Garcia',
    img: 'DanGarciaUCBFaculty2004.jpg',
    imgSrc: 'DanGarcia.jpg',
    imgCrazy: true,
    web: 'http://www.cs.berkeley.edu/~ddgarcia/',
    bio: 'DanBio',
    email: 'dan@cs10.org',
    office: '777 Soda, (510) 517-4041'
};

// TAs

 var addisonH = {
    name: 'TA Addison Howe',
    img: 'Fa16/AddisonHowe.JPG',
    email: 'addison@cs10.org',
    imgSrc: '../Sp17/AddisonHowe.jpg',
    };

var carlosF = {
    name: 'TA Carlos Flores',
    img: 'Fa16/CarlosFlores.jpg',
    bio: 'CarlosBio',
    imgSrc: '../Fa16/CarlosFlores.jpg',
    imgCrazy: '../small/CarlosFloresCrazy.jpg',
    email: 'carlos@cs10.org',
    web: 'http://carlos.codes'
};

var christianL = {
    name: 'TA Christian Lista-Nicoloso',
    img: 'Christian Lista-Nicoloso.JPG',
    bio: 'ChristianBio',
    imgSrc: '../Fa16/Christian Lista-Nicoloso.JPG',
    email: 'christian@cs10.org'
};

var lizzyS = {
    name: 'TA Lizzy Steger',
    img: 'Fa16/LizzySteger.JPG',
    imgSrc: '../Fa16/LizzySteger.JPG',
    bio: 'LizzyBio',
    email: 'lizzy@cs10.org'
};

var erikD = {
    name: 'TA Erik Dahlquist',
    img: 'Sp15/ErikDahlquist.jpg',
    imgSrc: 'ErikDahlquist.jpg',
    bio: 'ErikBio',
    email: 'erik@cs10.org'
};


var jobelV = {
    name: 'TA Jobel Vecino',
    img: 'Fa13/JobelVecino.jpg',
    imgSrc: 'JobelVecino.jpg',
    bio: 'JobelBio',
    email: 'jobel@cs10.org'
};

var laraM = {
    name: 'Head TA Lara McConnaughey',
    img: 'LaraMcConnaughey.jpg',
    imgSrc: '../Sp17/LaraMcConnaughey.jpg',
    imgCrazy: '../small/LaraMcConnaugheyCrazy.jpg',
    web: 'http://laralinmcc.github.io/',
    bio: 'LaraBio',
    email: 'lara@cs10.org'
};

var mansiS = {
    name: 'TA Mansi Shah',
    img: 'MansiShah.jpg',
    imgSrc: '../Sp17/MansiShah.jpg',
    email: 'mansi@cs10.org',
    bio: 'MansiBio'
};

var patriciaX = {
    name: 'TA Patricia Xiao',
    img: '../Sp17/PatriciaXiao.jpg',
    imgSrc: '../Sp17/PatriciaXiao.jpg',
    email: 'patricia@cs10.org',
    bio: 'PatriciaBio',
};

var stevenT = {
    name: 'Head TA Steven Traversi',
    img: 'Sp17/StevenTraversi.jpg',
    imgSrc: '../Sp17/StevenTraversi.jpg',
    imgCrazy: '../small/StevenTraversiCrazy.jpg',
    web: 'http://steven.codes',
    bio: 'StevenBio',
    email: 'steven@cs10.org'
};

var yifatA = {
  name: 'TA Yifat Amir',
  img: 'Sp17/YifatAmir.jpg',
  imgSrc: '../Sp17/YifatAmir.jpg',
  imgCrazy: '../small/YifatAmirCrazy.jpg',
  bio: 'YifatBio',
  web: 'https://www.linkedin.com/in/yifat-amir-45633584',
  email: 'yifat@cs10.org'
};

// Readers

var angelaW = {
    name: 'Reader Angela Wong',
    imgSrc: '../Sp17/las/AngelaWong.jpg',
    img: 'AngelaWong.jpg',
};

var matthewS = {
    name: 'Reader Matthew Schwartz',
    img: 'Fa16/MatthewSchwartz.JPG',
    imgSrc: '../Fa16/MatthewSchwartz.JPG',
};

var noahJ = {
    name: 'Reader Noah Jacobs',
    imgSrc: '../Sp17/NoahJacobs.jpg',
    img: 'Fa16/NoahJacobs.jpg',
};

var hectorA = {
    name: 'Reader Hector Aguilar',
    imgSrc: '../Fa16/HectorAguilar.jpg',
    img: 'Fa16/HectorAguilar.jpg',
    imgCrazy: '../small/HectorAguilarCrazy.jpg',
};


// Lab Assistants

 var amyL = {
    name: 'LA Amy Lee',
    imgSrc: '../Sp17/las/AmyLee.jpg',
    img: '../Sp17/las/AmyLee.jpg',

 };

var andresG = {
    name: 'LA Andres Gonzalez',
    imgSrc: '../Sp17/las/AndresGonzalez.jpg',
    img: 'AndresGonzalez.jpg',
};

var aprillaJ = {
    name: 'LA Aprillia Judokusumo',
    imgSrc: '../Sp17/las/AprilliaJudokusumo.jpg',
    img: 'AprilliaJudokusumo.jpg',
};

var arvindN = {
    name: 'LA Arvind Nandakumar',
    imgSrc: '../Sp17/las/ArvindNandakumar.jpg',
    img: 'ArvindNandakumar.jpg',
};

var bardiaB = {
    name: 'LA Bardia Barahman',
    imgSrc: '../Sp17/las/BardiaBarahman.jpg',
    img: 'BardiaBarahman.jpg',
};

 var batoolN = {
    name: 'LA Batool Naqvi',
    imgSrc: '../Sp17/las/BatoolNaqvi.jpg',
    img: 'BatoolNaqvi.jpg',

 };

var bhumikaG = {
    name: 'LA Bhumika Goel',
    imgSrc: '../Sp17/las/BhumikaGoel.jpg',
    img: 'BhumikaGoel.jpg',
};

var calvinP = {
    name: 'LA Calvin Price',
    imgSrc: '../Sp17/las/CalvinPrice.jpg',
    img: 'CalvinPrice.jpg',
};

var gabrielV = {
    name: 'LA Gabriel Venditti',
    imgSrc: '../Sp17/las/GabrielVenditti.jpg',
    img: 'GabrielVenditti.jpg',
};

var hannahV = {
    name: 'LA Hannah Verdonk',
    imgSrc: '../Sp17/las/HannahVerdonk.jpg',
    img: 'HannahVerdonk.jpg',
};

 var jingjingJ = {
    name: 'LA JingJing Jia',
    imgSrc: '../Sp17/las/JingJingJia.jpg',
    img: 'JingJingJia.jpg',

 };

var jocelynS = {
    name: 'LA Jocelyn Sun',
    imgSrc: '../Sp17/las/JocelynSun.jpg',
    img: 'JocelynSun.jpg',
};

 var leonorA = {
    name: 'LA Leonor Alcaraz',
    imgSrc: '../Sp17/las/LeonorGuzman.jpg',
    img: 'LeonorGuzman.jpg',

 };

var lyricY = {
    name: 'LA Lyric Yu',
    imgSrc: '../Sp17/las/LyricYu.jpg',
    img: 'LyricYu.jpg',
};

var maxY = {
    name: 'LA Max Yao',
    imgSrc: '../Sp17/las/MaxYao.jpg',
    img: 'MaxYao.jpg',
};

var michelleC = {
    name: 'LA Michelle Chan',
    imgSrc: '../Sp17/las/MichelleChan.jpg',
    img: 'MichelleChan.jpg',
};

var rafaelF = {
    name: 'LA Rafael Félix',
    imgSrc: '../Sp17/las/RafaelFelix.jpg',
    img: 'RafaelFelix.jpg',
};

var samuelS = {
    name: 'Head LA Samuel Starks',
    img: 'Fa16/SamStarks.jpg',
    imgSrc: '../Fa16/SamStarks.jpg',
};

 var vardaS = {
    name: 'LA Varda Shrivastava',
    imgSrc: '../Sp17/las/VardaShrivastava.jpg',
    img: 'VardaShrivastava.jpg',

 };

 var veraG = {
    name: 'LA Vera Gold',
    imgSrc: '../Sp17/las/VeraGold.jpg',
    img: 'VeraGold.jpg',

 };
/*****************************************************************************/
/** LIST DEFINITIONS **/
/*****************************************************************************/

var inst = [ DanGarcia ];
var tas = [laraM, stevenT, addisonH, carlosF, erikD, jobelV, lizzyS, mansiS, patriciaX, yifatA];
// var readers = [ addisonH, hectorA, matthewS,  noahJ, samuelS ];
var readers = [angelaW, hectorA, matthewS, noahJ];
var las = [samuelS, amyL, andresG, aprillaJ, arvindN, bardiaB, batoolN, bhumikaG, calvinP, gabrielV, hannahV, jingjingJ, jocelynS, leonorA, lyricY, maxY, michelleC, rafaelF, vardaS, veraG];

// If you need to add a new SECTION add it to this object.
// Follow the same formt.
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
        imgPathBase = '/sp17'
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
    cls = 'col-md-' + (width === 5 ? '20' : Math.floor(12/width));
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
        elm += '(<a href="/sp17/bios/' + data.bio + '">bio</a>)';
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
buildGroup('inst', 5);
buildGroup('tas', 5);
buildGroup('readers', 5);
buildGroup('las', 5);
