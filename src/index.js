import {random, range} from 'lodash';
import { normalize,  convertPolarToCartesian} from './utils.js';

const btn = document.querySelector('.particleButton');

//so the cleanup will timeout never fires out before the animaition is over
const FADE_DURATION = 1000;
const NUM_OF_PARTICLES = 20;
//Jitter is the amount of variance allowed for each angle
const JITTER = 40;

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
    range(NUM_OF_PARTICLES).forEach((index)=>{
        //creating the DOM element (can't have a div inside a button)
        const particle = document.createElement('span');
        particle.classList.add('particle');

        //Positionning the particles using polar coordinates:
        //(CSS doesn't understand polar coordinates, so we need to transform it to cartisian before CSS rendering)
        //By dividing the 360 range into equal slices using linear interpolation and then adding a small variance to the angle
        //we can control the amount of variance to make it feel more randomly distributed, otherwhise the particles will
        //clump together about 30% of the time.
        const angle = normalize(index,0,NUM_OF_PARTICLES,0,360) + random(-JITTER,JITTER);
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
    }, FADE_DURATION + 200)

});




  
