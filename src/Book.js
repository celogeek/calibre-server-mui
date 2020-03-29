import React, { Component } from 'react';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import { withStyles } from '@material-ui/core';
import 'react-lazy-load-image-component/src/effects/blur.css';

const useStyles = {
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    read: {
        filter: 'sepia(0.8) brightness(0.8)',
    }
};

class Book extends Component {
  render() {
    const {classes, meta, thumb} = this.props
    const {title, series, series_index, author_sort} = meta
    const subtitle = (
        <span>
        <span>by: {author_sort}</span>
        {series && (
            <span>
                <br/>
                in: {series} {series_index}
            </span>
        )}
        </span>
    )
    const actionIcon = (
        <IconButton aria-label={`info about ${title}`} className={classes.icon}>
            <InfoIcon />
        </IconButton>
    )

    return (
        <LazyLoadComponent>
            <LazyLoadImage src={thumb} alt={title} effect="blur" className={meta['#read'] ? classes.read : ''} />
            <GridListTileBar title={title} subtitle={subtitle} actionIcon={actionIcon} />
        </LazyLoadComponent>
    )
  }
}

export default withStyles(useStyles)(Book)