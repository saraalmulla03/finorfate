const container = document.querySelector('.horizontal-scroll');


window.addEventListener('mousewheel', function(e) {
    if (isTurning) return;
    
    const slide1 = document.getElementById('slide1');
    const slide2 = document.getElementById('slide2');
    
    if (container.scrollLeft === 0 && e.deltaY > 0) {
        isTurning = true;
        slide1.classList.add('turn');
        setTimeout(() => {
            slide1.style.display = 'none';
            slide2.style.zIndex = '1';
            isTurning = false;
        }, 1000);
    }
    
    // Convert vertical scroll to horizontal scroll
    container.scrollLeft += e.deltaY;
    e.preventDefault();
}, { passive: false });


///////////////////////////////////////////////////////////////////


const bubbleSlides = [document.getElementById('slide1'), document.getElementById('slide2'), document.getElementById('slide3')];
const bubbleImages = [
    'images/bubble1.png',
    'images/bubble2.png',
    'images/bubble3.png',
    'images/bubble4.png',
    'images/bubble5.png'
];
const bubbleCount = {
    "slide1": 0,
    "slide2": 5,
    "slide3": 5
};
const MAX_BUBBLES_PER_SLIDE = 15;  // You can change this to the number of bubbles you want as a maximum.

function createBubble(slide) {
    if (bubbleCount[slide.id] >= MAX_BUBBLES_PER_SLIDE) {
        return;  // Do not create any more bubbles for this slide
    }

    const bubble = document.createElement('img');
    bubble.src = bubbleImages[Math.floor(Math.random() * bubbleImages.length)];
    bubble.classList.add('bubble');
    
    const randomLeft = Math.random() * 100;
    const randomSize = Math.random() * (150 - 50) + 50;
    const randomDuration = Math.random() * (8 - 4) + 4;

    bubble.style.left = `${randomLeft}vw`;
    bubble.style.width = `${randomSize}px`;
    bubble.style.height = `${randomSize}px`;
    bubble.style.animationDuration = `${randomDuration}s`;

    slide.appendChild(bubble);
    bubbleCount[slide.id]++;  // Increment the count for this slide

    bubble.addEventListener('animationend', () => {
        bubble.remove();
        bubbleCount[slide.id]--;  // Decrement the count when a bubble is removed
    });
}

setInterval(() => {
    bubbleSlides.forEach(slide => {
        createBubble(slide);
    });
}, 300);


/////////////////////////////////////////////////////////////////////



const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');

const leftSlides = [document.getElementById('slide6'), document.getElementById('slide7'), document.getElementById('slide8')];
const rightSlides = [document.getElementById('slide9'), document.getElementById('slide10'), document.getElementById('slide11')];

leftButton.addEventListener('click', () => {
    leftSlides.forEach(slide => {
        slide.style.display = 'inline-block';
    });
    rightSlides.forEach(slide => {
        slide.style.display = 'none';
    });
    leftButton.style.color =  rgba(0, 0, 0, 0.1);;
    rightButton.style.color = ''; // reset to default or whatever color it was before
});

rightButton.addEventListener('click', () => {
    rightSlides.forEach(slide => {
        slide.style.display = 'inline-block';
    });
    leftSlides.forEach(slide => {
        slide.style.display = 'none';
    });
    rightButton.style.backgroundColor =  rgba(0, 0, 0, 0.1);;
    leftButton.style.backgroundColor = ''; // reset to default or whatever color it was before

});



function checkSlideVisibility() {
    document.querySelectorAll('.slide').forEach((slide, index) => {
        const audio = slide.querySelector('audio');

        const slideLeft = slide.offsetLeft;
        const slideRight = slideLeft + slide.offsetWidth;
        const viewLeft = container.scrollLeft;
        const viewRight = viewLeft + container.offsetWidth;

        if (slideLeft < viewRight && slideRight > viewLeft) {
            audio.play();
        } else {
            audio.pause();
        }
        // if(slide.id=='slide8')
        // {
        //     const audiox = slide.getElementById('audio12');
        //     if (slideLeft < viewRight && slideRight > viewLeft) {
        //         audiox.play();
        //     } else {
        //         audiox.pause();
        //     }
        // }
    });
}

// Call the checkSlideVisibility function whenever the container is scrolled
container.addEventListener('scroll', checkSlideVisibility);

setInterval(checkSlideVisibility, 200);

///////////////////


let isMuted = false;

function toggleMute() {
    const audioElements = document.querySelectorAll("audio");
    const muteBtn = document.getElementById("muteBtn");

    isMuted = !isMuted;

    audioElements.forEach(audio => {
        audio.muted = isMuted;
    });
    if (isMuted) {
        muteBtn.src = "images/soundoff.png";
    } else {
        muteBtn.src = "images/soundon.png";
    }
}

const slide1 = document.getElementById('slide1');
const slide2 = document.getElementById('slide2');
const slide3 = document.getElementById('slide3');
const slide4 = document.getElementById('slide4');
const fish2 = document.getElementById('fish2');
const fish3 = document.getElementById('fish3');


container.addEventListener('scroll', function() {
    // Define the threshold. Set it to 0.3 for 30%.
    const threshold1 =0.3

    // Fish movement for slide2
    const startMoveAtSlide2 = slide2.offsetWidth * threshold1;
    if (container.scrollLeft > startMoveAtSlide2 && container.scrollLeft < slide2.offsetWidth + slide2.offsetWidth) {
        const effectiveScroll = container.scrollLeft - startMoveAtSlide2;
        const percentageScrolled = effectiveScroll / (slide2.offsetWidth - slide2.offsetWidth * threshold1);
        fish2.style.left = -100+percentageScrolled * 62 + "%";  // Adjusting from -100% to 60%
        fish3.style.left = -100+percentageScrolled * 62 + "%";  // Adjusting from -100% to 60%
    }


    //net animation
    const startAnimateNetAt = slide1.offsetWidth + slide2.offsetWidth * 0.7; // 60% for example
    if (container.scrollLeft > startAnimateNetAt) {
        if(container.scrollLeft - startAnimateNetAt>10)
            fish2.style.opacity=0;
        else
            fish2.style.opacity=1;
        const net2 = document.getElementById('net2');
        net2.style.transform = "translateY(20vh) translateX(-30vw) rotate(-20deg)"; // translate the net downwards by 50vh and rotate to 0 degree
    }

    // Balloons animation for slide4
    const startAnimateBalloonsAt = slide1.offsetWidth + slide2.offsetWidth + slide3.offsetWidth*0.4;
    if (container.scrollLeft > startAnimateBalloonsAt) {
        const balloons4 = document.getElementById('balloons4');
        balloons4.style.transform = "translateY(-200vh) translateX(150vw)"; // move it upwards by 50vh and rightwards by 50vw
    }

});
