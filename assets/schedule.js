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
                '{{ site.baseurl }}/resources/readings/btb/chapter1.pdf')
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
