export function loadImage(offer1, offer2, offer3, offer4, slider1, slider2, slider3, slider4, footerImg) {
    const imagesObject = [];
    imagesObject[0] = footerImg;
    imagesObject[1] = offer1;
    imagesObject[2] = offer2;
    imagesObject[3] = offer3;
    imagesObject[4] = offer4;
    imagesObject[5] = slider1;
    imagesObject[6] = slider2;
    imagesObject[7] = slider3;
    imagesObject[8] = slider4;
    Object.keys(imagesObject).map((key, index) => {
      const img = new Image();
      img.src = imagesObject[key];
      localStorage.setItem('pic'+key, img.src);
    });
}
