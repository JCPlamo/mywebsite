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


const userId = "219610866503385088";

async function updateDiscord() 
{
    const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
    const data = await res.json();
    const presence = data.data;

    const activity = presence.activities.find(a => a.type === 0);

    if (!activity) return;

    document.getElementById("gameName").textContent = activity.name;
    document.getElementById("gameDetails").textContent =
        activity.details ? activity.details.trim() : "";

    document.getElementById("gameState").textContent =
        activity.state ? activity.state.trim() : "";

    // Large Image
    if (activity.assets && activity.assets.large_image) 
    {
        const imageUrl = `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
        document.getElementById("largeImage").src = imageUrl;
    }

    // Time elapsed
    let timer;

    if (activity.timestamps && activity.timestamps.start) 
    {
        const start = activity.timestamps.start;

        clearInterval(timer);

        timer = setInterval(() => {
            const elapsed = Date.now() - start;
            const hours = Math.floor(elapsed / 3600000);
            const minutes = Math.floor((elapsed % 3600000) / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);

            document.getElementById("gameTime").textContent =
            `🎮 ${hours}:${minutes.toString().padStart(2, "0")}:${seconds
                .toString()
                .padStart(2, "0")}`;
        }, 1000);
    }
}

updateDiscord();