import {MarvinImage} from "marvinj/marvinj/src/image/MarvinImage";

export function interpolate(image1: MarvinImage, image2: MarvinImage, nbImage: number, array: Array<MarvinImage>) {
    nbImage++
    for(let i = 1; i < nbImage; i++)
        computeImage(image1, image2, nbImage, i, array)
}

function computeImage(image1: MarvinImage, image2: MarvinImage, nbImage: number, factor: number, array: Array<MarvinImage>) {
    const img = image1.clone()
    for(let y = 0; y < image1.getHeight(); y++) {
        for(let x = 0; x < image1.getWidth(); x++) {
            const red = computePixel(image1.getIntComponent0(x, y), image2.getIntComponent0(x, y), nbImage, factor);
            const green = computePixel(image1.getIntComponent1(x, y), image2.getIntComponent1(x, y), nbImage, factor);
            const blue = computePixel(image1.getIntComponent2(x, y), image2.getIntComponent2(x, y), nbImage, factor);
            const alpha = computePixel(image1.getAlphaComponent(x, y), image2.getAlphaComponent(x, y), nbImage, factor);
            img.setIntColor(x, y, alpha, red, green, blue);
        }
    }
    array.push(img)
}

function computePixel(px1: number, px2: number, nbFrame: number, factor: number) {
    return (px2 - px1) / nbFrame * factor + px1
}