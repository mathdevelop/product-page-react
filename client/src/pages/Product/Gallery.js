import React, { useRef } from 'react';
import Slider from 'react-slick';
import Swal from 'sweetalert2';

export default function Gallery(props) {
    const imagesRef = useRef([]);
    const imageRef = useRef(null);

    const settings = {
        infinite: false,
        slidesToShow: 4,
        vertical: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: true,
                    slidesToShow: 1,
                    vertical: false
                }
            }
        ]
    };

    const openVideo = () => {
        const id = props.video.split('?v=')[1];

        Swal.fire({
            title: 'Vídeo',
            html: `<iframe width="100%" height="300" src="https://www.youtube.com/embed/${ id }" frameborder="0"></iframe>`
        });
    };

    const changeImage = index => {
        imagesRef.current.forEach(image => image.classList.remove('active'));

        imagesRef.current[index].classList.add('active');

        imageRef.current.src = imagesRef.current[index].src;
    };

    return (
        <React.Fragment>
            <div id="gallery">
                <div id="video" onClick={openVideo}>
                    <p>Vídeo</p>
                    <img src={ process.env.REACT_APP_IMAGES + props.images[0] } alt="" />
                </div>
                <div id="thumbnails">
                    <Slider {...settings}>
                        {props.images.map((image, index) => (
                            <div key={ index } className="thumbnail"><img ref={element => imagesRef.current[index] = element} className={ index === 0 ? 'active' : '' } src={ process.env.REACT_APP_IMAGES + image } alt="" onClick={() => changeImage(index)} /></div>
                        ))}
                    </Slider>
                </div>
            </div>
            <div id="image">
                <img ref={imageRef} src={ process.env.REACT_APP_IMAGES + props.images[0] } alt="" />
            </div>
        </React.Fragment>
    );
}
