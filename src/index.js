import {random, range} from 'lodash';
import { normalize,  convertPolarToCartesian} from './utils.js';

const btn = document.querySelector('.particleButton');

//so the cleanup will timeout never fires out before the animaition is over
const FADE_DURATION = 1000;

//triggering the generation only when the button is liked
//removing the like doesn't trigger the generation
btn.addEventListener('click', ()=>{
    //checking if is a like or dislike
    btn.classList.toggle('liked')
    const isLiked = btn.classList.contains('liked');
    if (!isLiked){ return; }

    //array to collect particles for clean up
    const particles = []

    //generating 5 particles
    range(5).forEach(()=>{
        //creating the DOM element (can't have a div inside a button)
        const particle = document.createElement('span');
        particle.classList.add('particle');

        //positionning the particles with polar coordinates
        //(CSS doesn't understand polar coordinates, so we need to transform it to cartisian before CSS rendering)
        const angle = random(0,360);
        const distance = random(40,80);
        const [x,y] = convertPolarToCartesian(angle,distance);

        //setting attributes as css variables
        particle.style.setProperty('--fade-duration', FADE_DURATION + 'ms');
        particle.style.setProperty('--x', x + 'px');
        particle.style.setProperty('--y', y + 'px');
        //could be set as inline style, ex: particle.style.animationDuration = FADE_DURATION + 'ms';

        //adding particle to the DOM
        btn.appendChild(particle);

        //keeping track of this particle so that it can be cleanned up latter
        particles.push(particle);

    });
    //cleanning up!
    window.setTimeout(()=>{
        particles.forEach((particle)=>{
            particle.remove();
        })
    // adding a little extra time to make sure the animation will be complete before it is cleanned    
    }, 10000000000 + 200)

});




  
