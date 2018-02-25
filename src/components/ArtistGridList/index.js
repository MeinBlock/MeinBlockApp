import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    // flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 800,
    overflowY: 'auto',
  },
  numberCounter: {
    color: 'white',
    position: 'absolute',
    top: 12,
    fontWeight: 'bold',
    fontSize: 18,
  },
};

const tilesData = [
  {
    id: 1,
    img: 'http://gds.fm/sites/default/files/styles/adaptive_image/adaptive-image/public/field/image/a2618472284_10.jpg',
    title: 'Danitsa',
    author: 'jill111',
    featured: true,
  },
  {
    id: 2,
    img: 'http://www.inter-peura.com/wp-content/uploads/2017/10/Krisyb.png',
    title: 'Krisy',
    author: 'pashminu',
  },
  {
    id: 3,
    img: 'https://www1.wdr.de/radio/cosmo/programm/sendungen/soundcheck/hamza-100~_v-gseapremiumxl.jpg',
    title: 'Hamza',
    author: 'Danson67',
  },
  {
    id: 4,
    img: 'https://lyricsmagazin.ch/wp-content/uploads/2016/10/Nemo_Blockbuster-1200x630.png',
    title: 'Nemo',
    author: 'fancycrave1',
    featured: true,
  },
  {
    id: 5,
    img: 'https://lyricsmagazin.ch/wp-content/uploads/2017/08/DSC01964-1195x510.jpg',
    title: 'S.O.S',
    author: 'Hans',
  },
  {
    id: 6,
    img: 'https://f4.bcbits.com/img/a0423570267_16.jpg',
    title: 'Chaostruppe',
    author: 'fancycravel',
  }
];

const ArtistGridList = props => {

  return (
    <div style={styles.root}>
      <GridList
        cols={2}
        cellHeight={200}
        padding={1}
        style={styles.gridList}
      >
        {tilesData.map((tile, ind) => (
          <GridTile
            key={tile.img}
            title={tile.title}
            titleStyle={{ marginLeft: 20 }}
            actionIcon={
              <div>
                <IconButton onClick={() => props.onStarTap(tile.id)}>
                  <StarBorder color="white" />
                </IconButton>
                <span style={styles.numberCounter}>{props.starCounts[ind]}</span>
              </div>
            }
            actionPosition="left"
            titlePosition="top"
            titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
            cols={tile.featured ? 2 : 1}
            rows={tile.featured ? 2 : 1}
          >
            <img src={tile.img} />
          </GridTile>
        ))}
      </GridList>
    </div>
)};

export default ArtistGridList;
