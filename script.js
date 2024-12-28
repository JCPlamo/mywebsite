//Check which page the user is on by the URL
const currentPage = window.location.pathname.split('/').pop();

//Typewriter effecting for header on index.html
if (currentPage === 'index.html') 
{
    var i = 0;
    var speed = 100;    //The higher, the slower

    function typeWriter(txt) 
    {
        if (i < txt.length) 
        {
        // Display text and cursor at the end
        document.getElementById("header").innerHTML = txt.substring(0, i + 1) + '<span class="cursor"></span>';
        i++;
        setTimeout(function() 
        {
            typeWriter(txt);  // Continue typing
        }, speed);
        } 
        else 
        {
        // Once typing is complete, keep the cursor visible
        document.getElementById("header").innerHTML = txt + '<span class="cursor"></span>';
        }
    }

    typeWriter('Justin Plamo');
}


//Color transition for the header background

//Select the header and a section to trigger the background color change
const header = document.querySelector('.header');
let bannerSection = null;

//Based on the current page, select the appropriate section after the banner
if (currentPage === 'projects.html') 
{
    bannerSection = document.querySelector('.projects-banner');   //projects.html
} 
else if (currentPage === 'resume.html') 
{
    bannerSection = document.querySelector('.resume-banner');     //resume.html
} 
else if (currentPage === 'index.html') 
{
    bannerSection = document.querySelector('.home-banner');    //index.html
}

console.log("Current Page: " + currentPage);
console.log("Trigger Section:", bannerSection);

if (bannerSection) 
{
    const bufferOffset = 70;

    //Check scroll position and update background opacity of the header
    function checkScroll() 
    {
        if (header && bannerSection) 
        {
            //Get the scroll position of the page
            const scrollPosition = window.scrollY;
            
            //Get the position of the trigger section
            const bannerPosition = bannerSection.offsetTop;
            const bannerHeight = bannerSection.offsetHeight;
            
            //If the scroll position is within the range of the aboutme section, with buffer offset
            if (scrollPosition >= (bannerPosition + bannerHeight - bufferOffset))
            {
                header.style.backgroundColor = 'rgba(64, 0, 255, 0.7)';     //More opaque background
            } 
            else 
            {
                header.style.backgroundColor = 'rgba(255, 255, 255, .05)'; //Original semi-transparent background
            }
        }
    }

    window.addEventListener('scroll', checkScroll);
}