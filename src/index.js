import {random, range} from 'lodash';
import { normalize,  convertPolarToCartesian} from './utils.js';

const btn = document.querySelector('.particleButton');

//so the cleanup will timeout never fires out before the animaition is over
const NUM_OF_PARTICLES = 20;
const MIN_DISTANCE = 8;
const MAX_DISTANCE = 124;
//Jitter is the amount of variance allowed for each angle
const JITTER = 40;
const MIN_FADE_DURATION = 500;
const MAX_FADE_DURATION = 1500;
const MAX_FADE_DELAY = 500;
//amount of time particles take to fully disperse
const MIN_POP_DURATION = 400;
const MAX_POP_DURATION = 800;
const MIN_SIZE = 9;
const MAX_SIZE = 15;
const MIN_SCALE = 0.3;
const MAX_SCALE = 2.5;
//particles will wait for the button circle grow to its full size before animate the particles
const POP_CIRCLE_DURATION = 150;

btn.style.setProperty('--pop-circle-duration', POP_CIRCLE_DURATION + 'ms');

//triggering particles generation only when the button is liked
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
        const distance = random(MIN_DISTANCE, MAX_DISTANCE);
        const [x,y] = convertPolarToCartesian(angle,distance);
        
        particle.style.setProperty('--x', x + 'px');
        particle.style.setProperty('--y', y + 'px');

        //particle that travel further will take longer to fade to transparent
        const FADE_DURATION = normalize(distance,MIN_DISTANCE,MAX_DISTANCE,MIN_FADE_DURATION,MAX_FADE_DURATION) + random(-200,200);
        particle.style.setProperty('--fade-duration', FADE_DURATION + 'ms');

        //particles should stay opaque for a while before starting to fade to transparent
        //the delay to start fading out will also be proportional to the distance
        const FADE_DELAY = normalize(distance,MIN_DISTANCE,MAX_DISTANCE,0,MAX_FADE_DELAY);
        particle.style.setProperty('--fade-delay', FADE_DELAY + 'ms');

        //particles that travel further will also take longer total animation time
        const POP_DURATION = normalize(distance,MIN_DISTANCE,MAX_DISTANCE,MIN_POP_DURATION,MAX_POP_DURATION) + random(-200,200);
        particle.style.setProperty('--pop-duration', POP_DURATION + 'ms');

        //size of particles should be random
        particle.style.setProperty('--size', random(MIN_SIZE, MAX_SIZE) + 'px');

        //scale particles randomly (true for decimal value)
        particle.style.setProperty('--scale', random(MIN_SCALE,MAX_SCALE,true));

        //twinkle effect
        particle.style.setProperty('--twinkle-duration', random(150,300) + 'ms');
        particle.style.setProperty('--twinkle-opacity', random(0.325,0.5,true));

        //keeping track of this particle so that it can be cleanned up latter
        particles.push(particle);
        
        //adding particles to the DOM after the circle fully grows
        window.setTimeout(()=>{
            particles.forEach((particle)=>{
                btn.appendChild(particle);
            })
        }, POP_CIRCLE_DURATION);


    });
    //cleanning up!
    window.setTimeout(()=>{
        particles.forEach((particle)=>{
            particle.remove();
        })
    // adding a little extra time to make sure the animation will be complete before it is cleanned    
    }, MAX_FADE_DURATION + MAX_FADE_DELAY  + POP_CIRCLE_DURATION + 400)

});




  
