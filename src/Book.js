import React from 'react';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { makeStyles } from '@material-ui/core';
import 'react-lazy-load-image-component/src/effects/blur.css';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    readStatus: ({meta}) => (meta['#read']) ? {filter: 'sepia(0.8) brightness(0.8)'} : {},
    subtitle: {
        listStyleType: 'none',
        paddingInlineStart: 0,
    }
}));

function Book(props) {
    const {meta, thumb} = props
    const classes = useStyles(props)
    const {title, series, series_index, author_sort} = meta
    const subtitle = <ul className={classes.subtitle}>
        <li>by: {author_sort}</li>
        {series && <li>in: {series} {series_index}</li>}
    </ul>

    const actionIcon = (
        <IconButton aria-label={`info about ${title}`} className={classes.icon}>
            <InfoIcon />
        </IconButton>
    )

    return [
        <LazyLoadImage src={thumb} alt={title} effect="blur" className={classes.readStatus} key='lazyimage'/>,
        <GridListTileBar title={title} subtitle={subtitle} actionIcon={actionIcon} key='titlebar'/>
    ]
}

Book.propTypes = {
    meta: PropTypes.shape({
        title: PropTypes.string,
        series: PropTypes.string,
        series_indexX: PropTypes.number,
        author_sort: PropTypes.string,
        '#read': PropTypes.bool,
    }).isRequired,
    thumb: PropTypes.string,
}

export default Book