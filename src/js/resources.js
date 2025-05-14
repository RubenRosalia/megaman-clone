import { ImageSource, Loader, Sound, FontSource } from 'excalibur'

const Resources = {
    Fish:  new ImageSource('/images/fish.png'),
    Shark: new ImageSource('/images/shark.png'),
    BG:    new ImageSource('/images/background.jpg'),
    Eat:   new Sound('/sounds/eat.mp3'),
    PixelFont: new FontSource('/fonts/wednesday.ttf', 'PressStart')
}

const ResourceLoader = new Loader();
for (const res of Object.values(Resources)) {
    ResourceLoader.addResource(res);
}

export { Resources, ResourceLoader }