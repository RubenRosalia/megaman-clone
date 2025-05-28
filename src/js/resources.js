import { ImageSource, Loader, Sound, FontSource } from 'excalibur';

const Resources = {
    Fish: new ImageSource('/images/fish.png'),
    Shark: new ImageSource('/images/shark.png'),
    BG: new ImageSource('/images/background.jpg'),
    Mine: new ImageSource('/images/mine.png'),
    Eat: new Sound('/sounds/eat.mp3'),
    Explosion: new Sound('/sounds/explosion.mp3'),
    PixelFont: new FontSource('/fonts/wednesday.ttf', 'PressStart'),
    Bubble: new ImageSource('/images/bubble.png')
};

const ResourceLoader = new Loader();

// Add all resources to the loader
for (const res of Object.values(Resources)) {
    ResourceLoader.addResource(res);
}

export { Resources, ResourceLoader };