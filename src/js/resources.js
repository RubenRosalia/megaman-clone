import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Megaman: new ImageSource('images/megaman.png'),
    Fish: new ImageSource('images/fish.png'),
    Enemy: new ImageSource('images/enemy.png'),
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }