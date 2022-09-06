import React from 'react';
// import PropTypes from 'prop-types';
import AlbumList from './components/AlbumList';

AlbumFeature.propTypes = {

};

function AlbumFeature(props) {
    const albumList = [
        {
            id: 1,
            name: 'Nhạc Hoa Thịnh Hành',
            thumbnailUrl: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/9/2/2/0/92205f255d26fc8ab1812ea84963eca2.jpg'
        },
        {
            id: 2,
            name: 'Rap Việt nghe là ghiền',
            thumbnailUrl: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/f/6/4/4/f644018b255264848a1d28a5f34a89bd.jpg'
        },
        {
            id: 3,
            name: 'Trào Lưu nhạc hot',
            thumbnailUrl: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/9/6/7/6/967680854163202253c0e08300261397.jpg'
        },
    ];
    return (
        <div>
            <h2>Có thể bạn thích đấy</h2>
            <AlbumList albumList={albumList} />
        </div>
    );
}

export default AlbumFeature;