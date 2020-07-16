import React from 'react';
import MenuItem from '../MenuItem/MenuItem.component';
import './Directory.styles.scss';

class Directory extends React.Component {
    constructor() {
        super();

        this.state = {
            sections: [{
                title: 'HATS',
                imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
                id: 1,
                linkUrl: 'shop/hats'
              },
              {
                title: 'JACKETS',
                imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
                id: 2,
                linkUrl: 'shop/jackets'
              },
              {
                title: 'SNEAKERS',
                imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
                id: 3,
                linkUrl: 'shop/sneakers'
              },
              {
                title: 'WOMEN',
                imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
                size: 'large',
                id: 4,
                linkUrl: 'shop/women'
              },
              {
                title: 'MEN',
                imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
                size: 'large',
                id: 5,
                linkUrl: 'shop/men'
            }]
        }
    }

    render() {
        return (
            <div className="directory-menu">
                {this.state.sections.map(({title, imageUrl, id, size}) => (
                    <MenuItem
                        key={id}
                        title={title}
                        imageUrl={imageUrl} 
                        size={size}
                    />
                ))}
            </div>
        );
    }
}

export default Directory;