import React from 'react';
import PropTypes from 'prop-types';

import {
  Flex,
  Heading,
  Text,
  Image,
  Link,
  Divider,
} from '@chakra-ui/react';

const sizeConfig = {
  sm: {
    width: '250px',
    height: '100px',
    fontSize: '16px',
    imgSize: '98px',
    summaryLines: 0,
  },
  md: {
    width: '400px',
    height: '200px',
    fontSize: '18px',
    imgSize: '198px',
    summaryLines: 3,
  },
  lg: {
    width: '600px',
    height: '416px',
    fontSize: '22px',
    imgSize: '414px',
    summaryLines: 10,
  },
};

function Card({
  size,
  title,
  image,
  genres,
  officialSite,
  summary,
}) {
  const {
    width,
    height,
    fontSize,
    imgSize,
    summaryLines,
  } = sizeConfig[size];

  return (
    <Flex
      flex="1"
      margin="2"
      minW={width}
      minH={height}
      maxH={height}
      border="1px"
      borderColor="gray.300"
      borderRadius="4px"
    >
      <Image
        src={image}
        objectFit="cover"
        boxSize={imgSize}
        fallbackSrc={`https://via.placeholder.com/${height}`}
      />
      <Flex
        direction="column"
        fontSize={fontSize}
        justify="center"
        align="center"
        paddingLeft="2"
        width="100%"
      >
        <Heading fontSize={fontSize} marginBottom="2">{title}</Heading>
        <Text noOfLines={1} fontSize="14px" marginBottom="2">{genres.join(' · ')}</Text>
        {summary && <Text noOfLines={summaryLines} fontSize="14px" margin="4">{summary}</Text>}
        <Divider marginTop="2" width="100%" backgroundColor="gray.200" />
        <Link href={officialSite} target="_blank" fontSize="12px">More info</Link>
      </Flex>
    </Flex>
  );
}

Card.propTypes = {
  size: PropTypes.string,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  officialSite: PropTypes.string,
  summary: PropTypes.string,
};

Card.defaultProps = {
  size: 'sm',
  summary: null,
  officialSite: '',
};

export default Card;
