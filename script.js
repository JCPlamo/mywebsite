//Check which page the user is on by the URL
const currentPage = window.location.pathname.split('/').pop();

const page = currentPage === "" ? "index.html" : currentPage;

//Typewriter effecting for header on index.html
if (page === 'index.html') 
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
if (page === 'projects.html') 
{
    bannerSection = document.querySelector('.projects-banner');   //projects.html
} 
else if (page === 'resume.html') 
{
    bannerSection = document.querySelector('.resume-banner');     //resume.html
} 
else if (page === 'index.html') 
{
    bannerSection = document.querySelector('.home-banner');    //index.html
}

console.log("Current Page: " + page);
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

const socket = new WebSocket("wss://api.lanyard.rest/socket");

socket.addEventListener("open", () => {
    // Subscribe to userID
    socket.send(JSON.stringify({
        op: 2,
        d: {
        subscribe_to_id: userId
        }
    }));
    });

    socket.addEventListener("message", (event) => {
    const payload = JSON.parse(event.data);

    // Only care about presence updates
    if (payload.t === "INIT_STATE" || payload.t === "PRESENCE_UPDATE") {
        updateCard(payload.d);
    }
    });

    let timer;

    function updateCard(presence) {
    const activity = presence.activities.find(a => a.type === 0);

    if (!activity) {
        document.getElementById("gameName").textContent = "Not playing anything";
        document.getElementById("gameDetails").textContent = "";
        document.getElementById("gameState").textContent = "";
        document.getElementById("gameTime").textContent = "";
        return;
    }

    document.getElementById("gameName").textContent = activity.name;
    document.getElementById("gameDetails").textContent =
        activity.details ? activity.details.trim() : "";
    document.getElementById("gameState").textContent =
        activity.state ? activity.state.trim() : "";

    const imageElement = document.getElementById("largeImage");

    if (activity.assets?.large_image && activity.application_id) 
    {
        imageElement.src =
            `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
    }
    else if (activity.assets?.small_image && activity.application_id) 
    {
        imageElement.src =
            `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.small_image}.png`;
    }
    else
    {
        imageElement.src = "kiryutyping.gif"
    }

    // Reset timer before starting a new one
    clearInterval(timer);

    if (activity.timestamps?.start) {
        const start = activity.timestamps.start;

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